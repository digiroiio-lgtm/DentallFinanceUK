import test from "node:test";
import assert from "node:assert/strict";
import { sanitiseEventParams, trackEvent, hasAnalyticsConsent } from "../src/lib/analytics.js";

test("sanitiseEventParams keeps only coarse allowed parameters", () => {
  const clean = sanitiseEventParams({
    placement: "calculator",
    amount: 12000,
    apr: 9.9,
    email: "a@b.com",
    budget: "£3,000",
    term_months: 24,
  });
  assert.deepEqual(clean, { placement: "calculator", term_months: 24 });
});

test("trackEvent is a no-op without a browser or consent", () => {
  assert.equal(hasAnalyticsConsent(), false);
  assert.equal(trackEvent("finance_cta_click", { placement: "x" }), false);
});

test("trackEvent sends sanitised events once consent is granted", () => {
  const sent = [];
  globalThis.window = {
    location: { pathname: "/finance-calculator" },
    localStorage: { getItem: () => "granted" },
    gtag: (...args) => sent.push(args),
  };
  try {
    assert.equal(trackEvent("calculator_start", { calculator_id: "veneers", amount: 5000 }), true);
    assert.deepEqual(sent, [["event", "calculator_start", { page_path: "/finance-calculator", calculator_id: "veneers" }]]);
  } finally {
    delete globalThis.window;
  }
});
