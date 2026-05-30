import Link from "next/link";

export default function TrustBadges({ badges = [] }) {
  return (
    <section className="surface-card mt-5 p-5">
      <div className="grid gap-4 lg:grid-cols-[2fr_1fr] lg:items-center">
        <div className="flex flex-wrap gap-2">
          {badges.map((badge) => (
            <span key={badge} className="badge">
              {badge}
            </span>
          ))}
        </div>
        <div className="review-stars-wrap">
          <p className="review-stars" role="img" aria-label="5 out of 5 stars">
            ★★★★★
          </p>
          <p className="text-sm text-[#4c6188]">5.0/5 content quality rating</p>
        </div>
      </div>
      <div className="finance-disclosure-banner mt-4">
        <p className="text-sm text-[#344a72]">
          Financial disclosure: We are an independent comparison resource, not a lender. Offers and eligibility are determined by authorised providers.
        </p>
        <Link href="/financial-disclosure" className="text-sm font-semibold text-[#0f2858] hover:underline">
          Read full disclosure
        </Link>
      </div>
    </section>
  );
}
