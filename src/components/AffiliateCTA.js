"use client";

import { getActivePartner } from "@/lib/partners";
import { ANALYTICS_EVENTS, classifyTrafficSource, trackEvent } from "@/lib/analytics";

// Renders nothing unless the partner passes every gate in partners.js
// (ACTIVE, legal and commercial approval, real destination, category not blocked).
export default function AffiliateCTA({ partnerId, label, placement = "inline" }) {
  const partner = getActivePartner(partnerId);
  if (!partner) return null;

  function handleClick() {
    const trafficSource = classifyTrafficSource(typeof document === "undefined" ? "" : document.referrer);
    const params = { partner_id: partner.id, product_category: partner.category, placement, traffic_source: trafficSource };
    trackEvent(ANALYTICS_EVENTS.affiliateCtaClick, params);
    trackEvent(ANALYTICS_EVENTS.affiliatePartnerOutbound, params);
    if (trafficSource === "ai") trackEvent(ANALYTICS_EVENTS.aiReferralAffiliateClick, params);
  }

  return (
    <div className="mt-3">
      <p className="text-xs font-semibold uppercase tracking-wide text-[#65579a]">Advertisement · affiliate link</p>
      <a
        href={partner.approvedDestination}
        target="_blank"
        rel="sponsored noopener noreferrer"
        onClick={handleClick}
        className="btn btn-primary mt-1"
      >
        {label ?? `Visit ${partner.name}`}
      </a>
      <p className="mt-1 text-xs text-[#556689]">
        You will leave Dental Finance UK for {partner.name}, an independent company. Availability and eligibility are set by
        the provider.
      </p>
    </div>
  );
}
