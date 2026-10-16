// Consent-gated analytics helper. It does nothing until BOTH of these are true:
//  1. a GA4 / GTM snippet has defined window.gtag or window.dataLayer, and
//  2. the visitor has granted analytics consent (localStorage "dfuk_analytics_consent" = "granted").
// No consent banner ships yet, so by default no event leaves the browser.
//
// Only coarse, non-personal parameters are allowed. Loan amounts, budgets, APRs,
// names, emails, phone numbers and any credit information must never be sent.

export const ANALYTICS_EVENTS = {
  financeCtaClick: "finance_cta_click",
  calculatorStart: "calculator_start",
  calculatorComplete: "calculator_complete",
  financePartnerOutbound: "finance_partner_outbound",
  affiliateCtaClick: "affiliate_cta_click",
  affiliatePartnerOutbound: "affiliate_partner_outbound",
  affiliateComparisonView: "affiliate_comparison_view",
  partnerEnquirySubmit: "partner_enquiry_submit",
  aiReferralAffiliateClick: "ai_referral_affiliate_click",
};

const AI_REFERRERS = ["chatgpt.com", "chat.openai.com", "perplexity.ai", "copilot.microsoft.com", "gemini.google.com"];

// Coarse traffic source from the referrer host only (never the full URL).
export function classifyTrafficSource(referrer) {
  if (!referrer) return "direct";
  let host;
  try {
    host = new URL(referrer).hostname.replace(/^www\./, "");
  } catch {
    return "unknown";
  }
  if (AI_REFERRERS.some((domain) => host === domain || host.endsWith(`.${domain}`))) return "ai";
  if (/(^|\.)(google|bing|duckduckgo|yahoo|ecosia)\./.test(host)) return "search";
  return "referral";
}

const ALLOWED_PARAMS = new Set([
  "placement",
  "destination",
  "page_path",
  "calculator_id",
  "term_months",
  "partner_id",
  "product_category",
  "traffic_source",
]);
const CONSENT_KEY = "dfuk_analytics_consent";

export function sanitiseEventParams(params = {}) {
  const clean = {};
  for (const [key, value] of Object.entries(params)) {
    if (!ALLOWED_PARAMS.has(key)) continue;
    if (typeof value === "string") clean[key] = value.slice(0, 100);
    else if (typeof value === "number" && Number.isFinite(value)) clean[key] = value;
  }
  return clean;
}

export function hasAnalyticsConsent() {
  try {
    return typeof window !== "undefined" && window.localStorage.getItem(CONSENT_KEY) === "granted";
  } catch {
    return false;
  }
}

export function trackEvent(name, params = {}) {
  if (typeof window === "undefined" || !hasAnalyticsConsent()) return false;
  const payload = { page_path: window.location.pathname, ...sanitiseEventParams(params) };

  if (typeof window.gtag === "function") {
    window.gtag("event", name, payload);
    return true;
  }
  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push({ event: name, ...payload });
    return true;
  }
  return false;
}
