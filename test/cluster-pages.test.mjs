import test from "node:test";
import assert from "node:assert/strict";
import { pageMap, pageSlugs, calculatorHubLinks } from "../src/lib/siteData.js";
import { calculateMonthlyPayment } from "../src/lib/financeCalc.js";

const migratedSlugs = [
  "bad-credit-dental-finance",
  "dental-finance-eligibility",
  "dental-finance-declined",
  "dental-finance-low-credit-score",
  "full-mouth-implants-finance-calculator",
  "dental-implants-monthly-payments",
  "veneers-monthly-payments",
  "dental-crowns-monthly-payments",
  "dental-implants-finance-example-scenarios",
  "veneers-finance-example-scenarios",
  "crowns-finance-example-scenarios",
  "cost-and-calculator-methodology",
];

test("all migrated cluster pages exist with the fields PageTemplate renders", () => {
  for (const slug of migratedSlugs) {
    const page = pageMap[slug];
    assert.ok(page, `Missing page ${slug}`);
    assert.ok(pageSlugs.includes(slug));
    assert.equal(page.slug, slug);
    for (const field of ["title", "description", "answerBlock", "keyTakeaways", "summaryRows", "sections", "faqs", "lastUpdated"]) {
      assert.ok(page[field] && page[field].length !== 0, `${slug} missing ${field}`);
    }
  }
});

test("internal links on migrated pages resolve to real pages", () => {
  for (const slug of migratedSlugs) {
    for (const link of pageMap[slug].internalLinks ?? []) {
      const target = link.href.replace(/^\//, "");
      assert.ok(pageMap[target], `${slug} links to missing page ${link.href}`);
    }
  }
});

test("bad-credit page keeps merged FAQs without duplicate questions", () => {
  const questions = pageMap["bad-credit-dental-finance"].faqs.map((faq) => faq.question);
  assert.equal(new Set(questions).size, questions.length);
  assert.ok(questions.includes("Can I get dental finance with bad credit?"));
});

test("calculateMonthlyPayment handles deposit, 0% and APR", () => {
  const zero = calculateMonthlyPayment({ totalCost: 2800, depositAmount: 500, termMonths: 24, apr: 0 });
  assert.equal(zero.loanAmount, 2300);
  assert.ok(Math.abs(zero.monthlyPayment - 2300 / 24) < 1e-9);
  assert.equal(zero.totalInterest, 0);

  const withApr = calculateMonthlyPayment({ totalCost: 3000, termMonths: 24, apr: 9.9 });
  assert.ok(withApr.monthlyPayment > 3000 / 24);
  assert.ok(withApr.totalInterest > 0);
});

test("payment schedule table reflects computed 0% figures", () => {
  const page = pageMap["dental-implants-monthly-payments"];
  assert.equal(page.costTable.rows[0][0], "Single implant");
  assert.equal(page.costTable.rows[0][3], "£191.67");
});

test("calculator hub lists the full mouth calculator", () => {
  assert.ok(calculatorHubLinks.some((link) => link.href === "/full-mouth-implants-finance-calculator"));
});
