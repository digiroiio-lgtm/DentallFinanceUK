import test from "node:test";
import assert from "node:assert/strict";
import sitemap from "../src/app/sitemap.js";
import robots from "../src/app/robots.js";

test("robots includes required allow/disallow and sitemap", () => {
  const data = robots();
  assert.equal(data.rules.userAgent, "*");
  assert.equal(data.rules.allow, "/");
  assert.deepEqual(data.rules.disallow, ["/admin/", "/api/", "/private/"]);
  assert.equal(data.sitemap, "https://dentalfinanceuk.co.uk/sitemap.xml");
});

test("sitemap includes homepage, key routes, and policy pages", () => {
  const data = sitemap();
  const urls = data.map((item) => item.url);

  assert.ok(urls.includes("https://dentalfinanceuk.co.uk"));
  assert.ok(urls.includes("https://dentalfinanceuk.co.uk/dental-finance-uk"));
  assert.ok(urls.includes("https://dentalfinanceuk.co.uk/finance-calculator"));
  assert.ok(urls.includes("https://dentalfinanceuk.co.uk/blog"));
  assert.ok(urls.includes("https://dentalfinanceuk.co.uk/editorial-policy"));
  assert.ok(urls.includes("https://dentalfinanceuk.co.uk/medical-review-policy"));
});

test("sitemap includes all calculator hub pages", () => {
  const data = sitemap();
  const urls = data.map((item) => item.url);

  const calculatorSlugs = [
    "0-percent-finance-calculator",
    "dental-loan-calculator",
    "monthly-payment-calculator",
    "veneer-cost-calculator",
    "implant-cost-calculator",
    "all-on-4-finance-calculator",
    "all-on-6-finance-calculator",
  ];

  for (const slug of calculatorSlugs) {
    assert.ok(urls.includes(`https://dentalfinanceuk.co.uk/${slug}`), `Missing sitemap entry for /${slug}`);
  }
});

test("sitemap includes the full Turkey finance cluster", () => {
  const data = sitemap();
  const urls = data.map((item) => item.url);

  const turkeyClusterSlugs = [
    "turkey-teeth-finance",
    "dental-treatment-turkey-finance",
    "veneers-finance-turkey",
    "dental-implants-finance-turkey",
    "all-on-4-finance-turkey",
    "all-on-6-finance-turkey",
    "hollywood-smile-finance-turkey",
    "full-mouth-reconstruction-finance-turkey",
    "smile-makeover-finance-turkey",
    "veneers-turkey-cost-monthly-payments",
    "dental-implants-turkey-cost-monthly-payments",
    "all-on-4-turkey-cost-monthly-payments",
    "all-on-6-turkey-cost-monthly-payments",
    "hollywood-smile-turkey-cost-monthly-payments",
  ];

  for (const slug of turkeyClusterSlugs) {
    assert.ok(urls.includes(`https://dentalfinanceuk.co.uk/${slug}`), `Missing sitemap entry for /${slug}`);
  }
});

test("sitemap includes comparison pages", () => {
  const data = sitemap();
  const urls = data.map((item) => item.url);

  const comparisonSlugs = [
    "dental-finance-vs-credit-card",
    "dental-finance-vs-loan",
    "dental-finance-vs-buy-now-pay-later",
    "uk-vs-turkey-dental-costs",
    "veneers-uk-vs-turkey",
    "implants-uk-vs-turkey",
    "all-on-4-uk-vs-turkey",
    "hollywood-smile-uk-vs-turkey",
  ];

  for (const slug of comparisonSlugs) {
    assert.ok(urls.includes(`https://dentalfinanceuk.co.uk/${slug}`), `Missing sitemap entry for /${slug}`);
  }
});
