"use client";

import { ANALYTICS_CONFIGURED, OPEN_SETTINGS_EVENT } from "@/lib/consent";

// Lets visitors reopen the consent choice at any time (withdrawal must be as easy as giving consent).
export default function CookieSettingsButton() {
  if (!ANALYTICS_CONFIGURED) return null;
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(OPEN_SETTINGS_EVENT))}
      className="text-[#d2c7ff] underline hover:text-white"
    >
      Cookie settings
    </button>
  );
}
