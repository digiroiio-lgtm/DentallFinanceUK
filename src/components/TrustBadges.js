import Link from "next/link";

export default function TrustBadges({ badges = [] }) {
  return (
    <section className="surface-card mt-5 p-5">
      <div className="grid gap-4">
        <div className="flex flex-wrap gap-2">
          {badges.map((badge) => (
            <span key={badge} className="badge">
              {badge}
            </span>
          ))}
        </div>
      </div>
      <div className="finance-disclosure-banner mt-4">
        <p className="text-sm text-[#524689]">
          Financial disclosure: We are an independent comparison resource, not a lender. Offers and eligibility are determined by authorised providers.
        </p>
        <Link href="/financial-disclosure" className="text-sm font-semibold text-[#5f3cd5] hover:underline">
          Read full disclosure
        </Link>
      </div>
    </section>
  );
}
