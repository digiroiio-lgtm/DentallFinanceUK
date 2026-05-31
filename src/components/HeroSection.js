import Image from "next/image";
import Link from "next/link";

export default function HeroSection({ title, description, primaryCta, secondaryCta, highlights = [], image, imageAlt }) {
  return (
    <section className="surface-card hero-card hero-gradient p-7 text-white md:p-10">
      <div className={`${image ? "grid items-center gap-8 md:grid-cols-[1fr_auto]" : ""}`}>
        <div>
          <h1 className="text-3xl font-extrabold leading-tight md:text-5xl">{title}</h1>
          <p className="mt-4 max-w-2xl text-base text-[#dbe7ff] md:text-lg">{description}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href={primaryCta.href} className="btn btn-hero-cta">
              {primaryCta.label}
            </Link>
            {secondaryCta ? (
              <Link href={secondaryCta.href} className="btn btn-hero-outline">
                {secondaryCta.label}
              </Link>
            ) : null}
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {highlights.map((item) => (
              <span key={item} className="badge border-[#bca8f4] bg-[#452d97] text-[#f3edff]">
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
