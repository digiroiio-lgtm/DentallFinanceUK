import test from "node:test";
import assert from "node:assert/strict";
import { pageMap, pageSlugs } from "../src/lib/siteData.js";
import { getChildren, getParentSlug, getRelatedLinks } from "../src/lib/breadcrumbs.js";
import { buildAudit } from "../scripts/seo-audit.mjs";

const SPOKES = [
  "dental-finance-low-credit-score",
  "dental-finance-with-ccj",
  "no-credit-check-dental-finance",
  "dental-finance-declined",
  "dental-finance-after-missed-payments-or-defaults",
  "dental-finance-eligibility",
];

test("new credit pages exist with distinct intent and valid structure", () => {
  for (const slug of ["bad-credit-dental-finance", "dental-finance-low-credit-score", "dental-finance-with-ccj", "no-credit-check-dental-finance"]) {
    const page = pageMap[slug];
    assert.ok(page, `missing ${slug}`);
    assert.ok(page.answerBlock.length > 120);
    assert.ok(page.faqs.length >= 3 || slug === "dental-finance-low-credit-score");
    assert.ok(page.references.length >= 3);
    assert.ok(page.sections.length >= 3);
  }
});

test("pillar links to every credit spoke and each spoke links back to the pillar", () => {
  const pillarLinks = getRelatedLinks(pageMap["bad-credit-dental-finance"]).map((link) => link.href);
  const pillarSectionLinks = pageMap["bad-credit-dental-finance"].sections.flatMap((s) => (s.items ?? []).filter((i) => i.href).map((i) => i.href));
  for (const spoke of SPOKES) {
    assert.ok(pillarLinks.includes(`/${spoke}`) || pillarSectionLinks.includes(`/${spoke}`), `pillar does not link to ${spoke}`);
    const back = getRelatedLinks(pageMap[spoke]).map((link) => link.href);
    assert.ok(back.includes("/bad-credit-dental-finance"), `${spoke} does not link back to the pillar`);
  }
});

test("credit pages never promise approval or say no checks are made", () => {
  for (const slug of ["bad-credit-dental-finance", "dental-finance-low-credit-score", "dental-finance-with-ccj", "no-credit-check-dental-finance"]) {
    const text = JSON.stringify(pageMap[slug]);
    assert.ok(!/we guarantee|you will be approved|apply now|instant approval/i.test(text), `${slug} contains an approval promise`);
  }
  assert.match(pageMap["no-credit-check-dental-finance"].answerBlock, /with caution|rare/i);
});

test("breadcrumb parents place credit and city pages in the right hub", () => {
  assert.equal(getParentSlug(pageMap["dental-finance-with-ccj"]), "bad-credit-dental-finance");
  assert.equal(getParentSlug(pageMap["no-credit-check-dental-finance"]), "bad-credit-dental-finance");
  assert.equal(getParentSlug(pageMap["dental-implants-finance-london"]), "dental-implants-finance");
  assert.equal(getParentSlug(pageMap["veneers-finance-leeds"]), "veneers-finance");
  assert.equal(getParentSlug(pageMap["dental-finance-glasgow"]), "dental-finance-uk");
});

test("related links resolve, are unique, never self-link and keep hand-written lists intact", () => {
  for (const slug of pageSlugs) {
    const page = pageMap[slug];
    const links = getRelatedLinks(page);
    const hrefs = links.map((link) => link.href);
    assert.equal(new Set(hrefs).size, hrefs.length, `${slug} has duplicate related links`);
    assert.ok(!hrefs.includes(`/${slug}`), `${slug} links to itself`);
    for (const href of hrefs) assert.ok(href === "/" || pageMap[href.replace(/^\//, "")], `${slug} links to missing ${href}`);
    for (const own of page.internalLinks ?? []) {
      if (own.href !== `/${slug}`) assert.ok(hrefs.includes(own.href), `${slug} lost hand-written link ${own.href}`);
    }
  }
});

test("no page is left without a contextual or sitewide inbound link", () => {
  const orphans = buildAudit().filter((row) => row.flags.includes("no-contextual-inbound")).map((row) => row.slug);
  assert.deepEqual(orphans, []);
});

test("every city page is linked from its service hub", () => {
  const hubFor = { "dental-implants-finance-": "dental-implants-finance", "veneers-finance-": "veneers-finance", "dental-finance-": "dental-finance-uk" };
  for (const slug of pageSlugs.filter((s) => pageMap[s].type === "city")) {
    const prefix = Object.keys(hubFor).find((p) => slug.startsWith(p));
    const hub = pageMap[hubFor[prefix]];
    const hrefs = hub.sections.flatMap((s) => (s.items ?? []).filter((i) => i.href).map((i) => i.href));
    assert.ok(hrefs.includes(`/${slug}`), `${hubFor[prefix]} does not link to ${slug}`);
  }
});

test("hubs report their children", () => {
  assert.ok(getChildren("bad-credit-dental-finance").length >= 6);
});
