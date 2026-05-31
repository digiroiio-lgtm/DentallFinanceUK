import Link from "next/link";

export default function CTASection({ title, description, primaryCta, secondaryCta, className = "" }) {
  return (
    <section className={`surface-card cta-section mt-6 p-6 ${className}`}>
      <h2 className="section-title text-2xl text-[#0f172a]">{title}</h2>
      <p className="mt-2 text-[#334155]">{description}</p>
      <div className="mt-4 flex flex-wrap gap-3">
        <Link href={primaryCta.href} className="btn btn-primary">
          {primaryCta.label}
        </Link>
        {secondaryCta ? (
          <Link href={secondaryCta.href} className="btn btn-secondary">
            {secondaryCta.label}
          </Link>
        ) : null}
      </div>
    </section>
  );
}
