import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { pageMap, pageSlugs } from "../src/lib/siteData.js";
import { OPERATOR, OPERATOR_VERIFICATION, organizationSchema, whatsappHref } from "../src/lib/operator.js";
import { LEGAL_SLUGS } from "../src/lib/legalPages.js";

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");
const componentSources = readdirSync(new URL("../src/components/", import.meta.url)).map((file) => read(`src/components/${file}`));
const appSources = [read("src/app/page.js"), read("src/app/layout.js")];
const allSources = [...componentSources, ...appSources].join("\n");

test("all legal and trust pages exist and are linked from the footer", () => {
  const footer = read("src/components/SiteFooter.js");
  for (const slug of [...LEGAL_SLUGS, "medical-review-policy"]) {
    assert.ok(pageMap[slug], `missing /${slug}`);
    assert.ok(footer.includes(`"/${slug}"`), `footer does not link /${slug}`);
  }
});

test("operator details are identical wherever they appear", () => {
  for (const slug of ["about-us", "legal-notice", "contact", "privacy-policy"]) {
    const text = JSON.stringify(pageMap[slug]);
    assert.ok(text.includes(OPERATOR.legalName), `${slug} lacks the legal name`);
    assert.ok(text.includes(OPERATOR.email), `${slug} lacks the email`);
  }
  for (const slug of ["about-us", "legal-notice", "contact"]) {
    assert.ok(JSON.stringify(pageMap[slug]).includes(OPERATOR.mersis) || slug === "contact", `${slug} lacks MERSİS`);
  }
  const schema = organizationSchema((path) => `https://dentalfinanceuk.co.uk${path}`);
  assert.equal(schema.legalName, OPERATOR.legalName);
  assert.equal(schema["@type"], "Organization");
  assert.ok(read("src/components/SiteFooter.js").includes("OPERATOR.legalName"));
});

test("unverified identifiers are never rendered", () => {
  assert.equal(OPERATOR_VERIFICATION.icoRegistration, "unverified");
  const serialised = JSON.stringify(pageMap) + allSources;
  for (const value of ["ZC121768", "0623162428", "Üsküdar Vergi Dairesi"]) {
    assert.ok(!serialised.includes(value), `${value} must not be published until verified`);
  }
});

test("no page or component claims FCA authorisation, regulation or approval", () => {
  const serialised = JSON.stringify(pageMap) + allSources;
  for (const pattern of [/FCA[- ]authorised and regulated/i, /authorised and regulated by the Financial Conduct Authority/i, /FCA approved/i, /we are (an )?FCA[- ]regulated/i]) {
    const matches = serialised.match(new RegExp(pattern.source, "gi")) ?? [];
    assert.equal(matches.length, 0, `${pattern} found`);
  }
});

test("whole-of-market is only mentioned to deny it", () => {
  const serialised = JSON.stringify(pageMap) + allSources;
  const mentions = serialised.match(/.{0,30}whole[- ]of[- ]market.{0,15}/gi) ?? [];
  for (const mention of mentions) assert.match(mention, /not a whole|not the whole|Not whole|Is this a whole/i, mention);
});

test("WhatsApp links never carry finance figures", () => {
  assert.ok(!/wa\.me\/905353998999/.test(allSources), "hard-coded WhatsApp link bypasses operator.whatsappHref");
  const href = decodeURIComponent(whatsappHref());
  for (const word of ["APR", "Monthly Payment", "Term:", "£"]) assert.ok(!href.includes(word), `default WhatsApp text contains ${word}`);
  for (const file of ["CalculatorWidget.js", "HomepageLoanCalculator.js"]) {
    const source = read(`src/components/${file}`);
    assert.ok(!/APR: \$\{|Estimated Monthly Payment|Budget: \$\{formatCurrency/.test(source), `${file} still builds a finance WhatsApp message`);
  }
});

test("no promotional approval language in CTAs", () => {
  for (const pattern of [/get approved/i, /apply now/i, /apply with us/i, /instant approval/i, /pre-approved/i, /we arrange your loan/i, /treatment advisor/i, /compare available lenders/i]) {
    assert.ok(!pattern.test(allSources), `${pattern} found in components`);
  }
});

test("no FinancialService schema and no unverified sameAs links", () => {
  const serialised = allSources + JSON.stringify(pageMap);
  assert.ok(!serialised.includes("FinancialService"));
  assert.ok(!serialised.includes("sameAs"));
});

test("provider pages carry the comparison disclosure and no ranking titles", () => {
  const template = read("src/components/PageTemplate.js");
  assert.ok(template.includes("ComparisonDisclosure"));
  for (const slug of pageSlugs) {
    assert.ok(!/ranked:|^best dental finance provider/i.test(pageMap[slug].title), `${slug} title still claims a ranking`);
  }
});
