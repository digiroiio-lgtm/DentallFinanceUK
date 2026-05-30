import Link from "next/link";

export default function HeroSection({ title, description, primaryCta, secondaryCta, highlights = [] }) {
  return (
    <section className="surface-card hero-card bg-gradient-to-br from-[#0f2858] to-[#1d4ea3] p-7 text-white md:p-10">
      <h1 className="text-3xl font-extrabold leading-tight md:text-5xl">{title}</h1>
      <p className="mt-4 max-w-3xl text-base text-[#dbe7ff] md:text-lg">{description}</p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Link href={primaryCta.href} className="btn bg-white text-[#0f2858] hover:bg-[#edf4ff]">
          {primaryCta.label}
        </Link>
        <Link href={secondaryCta.href} className="btn border border-[#aac3f6] bg-transparent text-white hover:bg-[#163a7f]">
          {secondaryCta.label}
        </Link>
      </div>
      <div className="mt-6 flex flex-wrap gap-2">
        {highlights.map((item) => (
          <span key={item} className="badge border-[#5a78b0] bg-[#163a7f] text-[#dce8ff]">
            {item}
          </span>
        ))}
      </div>
    </section>
  );
}
