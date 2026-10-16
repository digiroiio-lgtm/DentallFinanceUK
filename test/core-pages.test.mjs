import test from "node:test";
import assert from "node:assert/strict";
import { pageMap } from "../src/lib/siteData.js";
import { corePageEntries } from "../src/lib/corePages.js";

const GENERIC = /^UK-focused guidance on /;

test("core pages no longer use the generic base template", () => {
  for (const [slug] of corePageEntries) {
    const page = pageMap[slug];
    assert.ok(page, `missing ${slug}`);
    assert.ok(!GENERIC.test(page.description), `${slug} still has the generic description`);
    const minimum = page.type === "policy" ? 1 : 3;
    assert.ok(page.sections.length >= minimum, `${slug} needs substantive sections`);
    assert.ok(page.faqs.length >= (page.type === "policy" ? 1 : 3), `${slug} needs FAQs`);
  }
});

test("core pages have distinct answer blocks and descriptions", () => {
  const answers = new Set();
  const descriptions = new Set();
  for (const page of Object.values(pageMap)) {
    assert.ok(!descriptions.has(page.description), `duplicate description on ${page.slug}`);
    descriptions.add(page.description);
  }
  for (const [slug] of corePageEntries) {
    const answer = pageMap[slug].answerBlock;
    assert.ok(!answers.has(answer), `duplicate answer on ${slug}`);
    answers.add(answer);
  }
});

test("internal links on core pages resolve and sections' hrefs exist", () => {
  for (const [slug] of corePageEntries) {
    const page = pageMap[slug];
    const hrefs = [
      ...(page.internalLinks ?? []).map((link) => link.href),
      ...page.sections.flatMap((section) => (section.items ?? []).filter((item) => item.href).map((item) => item.href)),
    ];
    for (const href of hrefs) {
      assert.ok(pageMap[href.replace(/^\//, "")], `${slug} links to missing ${href}`);
    }
  }
});

test("no unsubstantiated approval, regulatory or expert claims on core pages", () => {
  const banned = [/guaranteed approval/i, /no credit check/i, /FCA[- ]authorised and regulated/i, /we are regulated/i, /clinically reviewed by/i, /reviewed by dr/i];
  for (const [slug] of corePageEntries) {
    const text = JSON.stringify(pageMap[slug]);
    for (const pattern of banned) assert.ok(!pattern.test(text), `${slug} matches ${pattern}`);
  }
});

test("policy pages state the operator is not an FCA-authorised lender or broker", () => {
  for (const slug of ["about-us", "financial-disclosure"]) {
    assert.match(pageMap[slug].answerBlock, /not authorised by the FCA/i);
  }
});

test("illustrative repayment figures are computed correctly", () => {
  assert.equal(pageMap["dental-monthly-payments"].costTable.rows[2][2], "£125.00");
  assert.equal(pageMap["dental-implants-finance"].costTable.rows[0][3], "£95.83");
});
