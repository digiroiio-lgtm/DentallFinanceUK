import Image from "next/image";
import Link from "next/link";

function HeroCtaLink({ cta, className }) {
  if (!cta) return null;
  if (cta.external) {
    return (
      <a
        href={cta.href}
        className={className}
        target={cta.newTab ? "_blank" : undefined}
        rel={cta.newTab ? "noopener noreferrer" : undefined}
      >
        {cta.label}
      </a>
    );
  }

  return (
    <Link href={cta.href} className={className}>
      {cta.label}
    </Link>
  );
}

export default function HeroSection({ title, description, primaryCta, secondaryCta, highlights = [], image, imageAlt }) {
  return (
    <section className="surface-card hero-card hero-gradient p-7 text-[#0f172a] md:p-10 md:text-white">
      <div className={`${image ? "grid items-center gap-8 md:grid-cols-[1fr_auto]" : ""}`}>
        <div>
          <h1 className="text-3xl font-extrabold leading-tight md:text-5xl">{title}</h1>
          <p className="mt-4 max-w-2xl text-base text-[#334155] md:text-lg md:text-[#dbe7ff]">{description}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <HeroCtaLink cta={primaryCta} className="btn btn-hero-cta" />
            <HeroCtaLink cta={secondaryCta} className="btn btn-hero-outline" />
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {highlights.map((item) => (
              <span
                key={item}
                className="badge border-[#cbd5e1] bg-[#ffffff] text-[#0f172a] md:border-[#bca8f4] md:bg-[#452d97] md:text-[#f3edff]"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
        {image ? (
          <div className="relative hidden overflow-hidden rounded-2xl md:block" style={{ width: 420, height: 280 }}>
            <Image
              src={image}
              alt={imageAlt ?? "Dental finance consultation"}
              fill
              sizes="420px"
              className="object-cover"
              priority
            />
          </div>
        ) : null}
      </div>
    </section>
  );
}
