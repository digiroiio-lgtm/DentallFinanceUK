import { PARTNER_CATEGORIES } from "@/lib/partners";
import AffiliateCTA from "@/components/AffiliateCTA";

// Neutral provider card. Shows status honestly and only renders a CTA for an active partner.
export default function PartnerCard({ partner, checks = [], limitations = [] }) {
  return (
    <article className="subtle-card p-4">
      <p className="text-xs uppercase tracking-wide text-[#65579a]">{PARTNER_CATEGORIES[partner.category] ?? partner.category}</p>
      <h3 className="mt-1 text-lg font-bold text-[#2f1f75]">{partner.name}</h3>
      <p className="mt-1 text-xs text-[#556689]">{partner.status === "ACTIVE" ? "Affiliate partner" : "Not a current partner"}</p>
      {checks.length ? (
        <ul className="mt-3 list-disc pl-5 text-sm text-[#374e75]">
          {checks.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : null}
      {limitations.length ? <p className="mt-2 text-xs text-[#556689]">Limitations: {limitations.join("; ")}</p> : null}
      <AffiliateCTA partnerId={partner.id} placement="partner_card" />
    </article>
  );
}
