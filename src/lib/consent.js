// Cookie and analytics consent (PECR / UK GDPR).
// Analytics only runs when a valid GA4 measurement ID is configured at build time
// (NEXT_PUBLIC_GA_ID) AND the visitor has chosen "Accept analytics".
// The stored choice itself is strictly necessary to remember the decision.

export const CONSENT_KEY = "dfuk_analytics_consent";
export const CONSENT_CHANGE_EVENT = "dfuk-consent-change";
export const OPEN_SETTINGS_EVENT = "dfuk-open-cookie-settings";

const RAW_GA_ID = typeof process !== "undefined" ? process.env.NEXT_PUBLIC_GA_ID ?? "" : "";
// Only a well-formed GA4 ID is accepted, so nothing else can be injected into the script URL.
export function isValidGaId(id) {
  return typeof id === "string" && /^G-[A-Z0-9]{4,20}$/.test(id);
}
export const GA_MEASUREMENT_ID = isValidGaId(RAW_GA_ID) ? RAW_GA_ID : "";
export const ANALYTICS_CONFIGURED = GA_MEASUREMENT_ID !== "";

export function getConsent() {
  try {
    const value = window.localStorage.getItem(CONSENT_KEY);
    return value === "granted" || value === "denied" ? value : null;
  } catch {
    return null;
  }
}

export function setConsent(value) {
  if (value !== "granted" && value !== "denied") return;
  try {
    window.localStorage.setItem(CONSENT_KEY, value);
  } catch {
    // Storage blocked: the choice applies to this page view only.
  }
  window.dispatchEvent(new CustomEvent(CONSENT_CHANGE_EVENT, { detail: value }));
}

// Remove Google Analytics cookies set on this site after consent is withdrawn.
export function clearAnalyticsCookies() {
  const host = window.location.hostname;
  const domains = ["", host, `.${host}`, `.${host.split(".").slice(-2).join(".")}`];
  for (const cookie of document.cookie.split(";")) {
    const name = cookie.split("=")[0].trim();
    if (name === "_ga" || name.startsWith("_ga_") || name === "_gid") {
      for (const domain of domains) {
        document.cookie = `${name}=; Max-Age=0; path=/${domain ? `; domain=${domain}` : ""}`;
      }
    }
  }
}
