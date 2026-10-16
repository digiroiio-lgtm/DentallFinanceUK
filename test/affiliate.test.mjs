import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { PARTNER_STATUSES, getActivePartner, getActivePartners, isCommercialCategoryBlocked, partners } from "../src/lib/partners.js";
import { classifyTrafficSource, sanitiseEventParams, ANALYTICS_EVENTS } from "../src/lib/analytics.js";
import { pageMap } from "../src/lib/siteData.js";

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");

test("registry entries are complete and use known statuses", () => {
  const ids = new Set();
  for (const partner of partners) {
    assert.ok(!ids.has(partner.id), `duplicate ${partner.id}`);
    ids.add(partner.id);
    assert.ok(PARTNER_STATUSES.includes(partner.status), `${partner.id} has unknown status`);
    for (const field of ["name", "category", "ukEligibility", "legalReview", "commercialApproval", "reason", "lastChecked"]) {
      assert.ok(partner[field] !== undefined && partner[field] !== "", `${partner.id} missing ${field}`);
    }
  }
});

test("no partner is active, approved or carries a destination", () => {
  for (const partner of partners) {
    assert.notEqual(partner.status, "ACTIVE", partner.id);
    assert.notEqual(partner.status, "APPROVED", partner.id);
    assert.equal(partner.approvedDestination, null, `${partner.id} must not have an invented destination`);
    assert.equal(getActivePartner(partner.id), null);
  }
  assert.deepEqual(getActivePartners(), []);
});

test("finance and insurance are hard-blocked even if marked active", () => {
  assert.ok(isCommercialCategoryBlocked("finance"));
  assert.ok(isCommercialCategoryBlocked("insurance"));
  for (const partner of partners.filter((p) => ["finance", "insurance"].includes(p.category))) assert.equal(partner.status, "BLOCKED");
  const fake = { ...partners[0], status: "ACTIVE", legalReview: "approved", commercialApproval: "approved", approvedDestination: "https://example.com" };
  partners.push({ ...fake, id: "test-insurance", category: "insurance" });
  try {
    assert.equal(getActivePartner("test-insurance"), null);
  } finally {
    partners.pop();
  }
});

test("AffiliateCTA is gated, labelled and marked sponsored", () => {
  const source = read("src/components/AffiliateCTA.js");
  assert.match(source, /const partner = getActivePartner\(partnerId\);\s*if \(!partner\) return null;/);
  assert.match(source, /rel="sponsored noopener noreferrer"/);
  assert.match(source, /Advertisement · affiliate link/);
  assert.match(source, /href=\{partner\.approvedDestination\}/);
});

test("affiliate analytics keep to coarse parameters and classify AI referrers", () => {
  for (const name of ["affiliate_cta_click", "affiliate_partner_outbound", "affiliate_comparison_view", "partner_enquiry_submit", "ai_referral_affiliate_click"]) {
    assert.ok(Object.values(ANALYTICS_EVENTS).includes(name), name);
  }
  assert.deepEqual(sanitiseEventParams({ partner_id: "x", product_category: "aligners", traffic_source: "ai", credit_score: 500, email: "a@b.c" }), {
    partner_id: "x",
    product_category: "aligners",
    traffic_source: "ai",
  });
  assert.equal(classifyTrafficSource("https://chatgpt.com/c/123"), "ai");
  assert.equal(classifyTrafficSource("https://www.perplexity.ai/search"), "ai");
  assert.equal(classifyTrafficSource("https://www.google.co.uk/"), "search");
  assert.equal(classifyTrafficSource(""), "direct");
});

test("partners page names no third-party brands and states there are no active partners", () => {
  const text = JSON.stringify(pageMap.partners);
  for (const partner of partners) assert.ok(!text.includes(partner.name.split(" (")[0]), `/partners mentions ${partner.name}`);
  assert.match(pageMap.partners.answerBlock, /do not have any active affiliate partnerships/);
});

test("affiliate disclosure is truthful about today", () => {
  const page = pageMap["affiliate-disclosure"];
  assert.match(page.answerBlock, /no affiliate links are active/i);
  assert.ok(!/commissions? never (affect|influence)/i.test(JSON.stringify(page)));
});

test("new guides exist, carry no commercial CTAs and link to real pages", () => {
  for (const slug of ["dental-insurance-vs-dental-plans", "clear-aligners-finance"]) {
    const page = pageMap[slug];
    assert.ok(page, slug);
    const hrefs = [...(page.internalLinks ?? []).map((l) => l.href), ...page.sections.flatMap((s) => (s.items ?? []).filter((i) => i.href).map((i) => i.href))];
    for (const href of hrefs) assert.ok(pageMap[href.replace(/^\//, "")], `${slug} -> ${href}`);
    assert.ok(!/sponsored|affiliate link|buy now/i.test(JSON.stringify(page)), `${slug} contains commercial wording`);
  }
});
