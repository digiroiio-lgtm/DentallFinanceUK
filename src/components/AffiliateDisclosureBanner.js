import Link from "next/link";

// Inline commercial disclosure. Use next to any placement that could earn us money.
export default function AffiliateDisclosureBanner({ active = false }) {
  return (
    <aside className="mt-6 rounded-2xl border border-[#e3c98f] bg-[#fff8ea] p-4 text-sm text-[#5b4314]" aria-label="Commercial disclosure">
      <strong>{active ? "Advertising disclosure:" : "Commercial relationships:"}</strong>{" "}
      {active
        ? "this section contains affiliate links. If you click one and go on to buy, we may earn a commission at no extra cost to you. The provider decides availability and eligibility."
        : "we do not currently use affiliate links. If we add any, they will be labelled where they appear."}{" "}
      <Link href="/affiliate-disclosure" className="font-semibold underline">
        Affiliate disclosure
      </Link>
    </aside>
  );
}
