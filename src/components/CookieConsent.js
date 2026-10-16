"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ANALYTICS_CONFIGURED,
  CONSENT_CHANGE_EVENT,
  GA_MEASUREMENT_ID,
  OPEN_SETTINGS_EVENT,
  clearAnalyticsCookies,
  getConsent,
  setConsent,
} from "@/lib/consent";

let gaLoaded = false;

// Loads Google Analytics only after "Accept analytics". Never called before consent.
function loadGoogleAnalytics() {
  if (gaLoaded || !ANALYTICS_CONFIGURED) return;
  gaLoaded = true;
  window[`ga-disable-${GA_MEASUREMENT_ID}`] = false;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };
  window.gtag("js", new Date());
  window.gtag("config", GA_MEASUREMENT_ID);
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);
}

function disableGoogleAnalytics() {
  if (!ANALYTICS_CONFIGURED) return;
  window[`ga-disable-${GA_MEASUREMENT_ID}`] = true;
  clearAnalyticsCookies();
}

// Banner shown only when there is something to consent to (a configured GA4 ID).
// Accept and reject are equally prominent; nothing non-essential runs before a choice.
export default function CookieConsent() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!ANALYTICS_CONFIGURED) return undefined;
    const current = getConsent();
    if (current === "granted") loadGoogleAnalytics();
    // Reading stored consent after mount avoids a server/client mismatch.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (current === null) setOpen(true);

    const reopen = () => setOpen(true);
    window.addEventListener(OPEN_SETTINGS_EVENT, reopen);
    return () => window.removeEventListener(OPEN_SETTINGS_EVENT, reopen);
  }, []);

  if (!ANALYTICS_CONFIGURED || !open) return null;

  function choose(value) {
    setConsent(value);
    if (value === "granted") loadGoogleAnalytics();
    else disableGoogleAnalytics();
    setOpen(false);
    window.dispatchEvent(new CustomEvent(CONSENT_CHANGE_EVENT, { detail: value }));
  }

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-text"
      className="cookie-consent fixed inset-x-0 bottom-0 z-50 border-t border-[#c9baf1] bg-white p-4 shadow-[0_-8px_24px_rgba(47,31,117,0.12)]"
    >
      <div className="site-container flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="max-w-2xl">
          <p id="cookie-consent-title" className="font-semibold text-[#2f1f75]">
            Cookies on Dental Finance UK
          </p>
          <p id="cookie-consent-text" className="mt-1 text-sm text-[#374e75]">
            We would like to use Google Analytics cookies to understand how the site is used. They are only set if you
            accept. We do not use advertising cookies, and calculator figures are never sent. You can change your choice
            at any time from &ldquo;Cookie settings&rdquo; in the footer.{" "}
            <Link href="/cookie-policy" className="font-medium text-[#6d4fe0] underline">
              Cookie policy
            </Link>
          </p>
        </div>
        <div className="flex shrink-0 gap-2">
          <button type="button" className="btn btn-secondary" onClick={() => choose("denied")}>
            Reject analytics
          </button>
          <button type="button" className="btn btn-secondary" onClick={() => choose("granted")}>
            Accept analytics
          </button>
        </div>
      </div>
    </div>
  );
}
