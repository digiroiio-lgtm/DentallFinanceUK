import Link from "next/link";
import StructuredData from "@/components/StructuredData";
import LeadCtaSection from "@/components/LeadCtaSection";
import { getPageUrl } from "@/lib/siteData";

export const dynamic = "force-static";

const homeFaqs = [
  {
    question: "Can I pay monthly for dental treatment?",
    answer: "Yes, monthly plans are available across many UK clinics and treatment types.",
  },
  {
    question: "Is 0% dental finance available?",
    answer: "Many providers offer 0% plans for selected terms, subject to eligibility.",
  },
  {
    question: "Can I get dental finance with bad credit?",
    answer: "Some lenders accept bad-credit applications, but pricing and approvals vary.",
  },
];

const homepageSchema = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Dental Finance UK",
    url: getPageUrl("/"),
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Dental Finance UK",
    url: getPageUrl("/"),
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: getPageUrl("/") }],
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: homeFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  },
];

const monthlyExamples = [
  ["Veneers", "£3,500", "from £146/month"],
  ["Dental Implants", "£4,800", "from £200/month"],
  ["Invisalign", "£3,000", "from £125/month"],
  ["Turkey Dental Treatment", "£4,000", "from £167/month"],
];

const providerCards = [
  { title: "Provider Hub", href: "/finance-providers", copy: "Compare provider features, APR positioning, and suitability by treatment." },
  { title: "Best Provider UK", href: "/best-dental-finance-provider-uk", copy: "Review top UK provider options and best-for scenarios." },
  { title: "Kandoo vs V12", href: "/kandoo-vs-v12", copy: "Side-by-side breakdown of eligibility and repayment positioning." },
];

const treatmentCards = [
  { title: "Dental Implants Finance", href: "/dental-implants-finance" },
  { title: "Veneers Finance", href: "/veneers-finance" },
  { title: "Turkey Teeth Finance", href: "/turkey-teeth-finance" },
  { title: "Dental Payment Plans", href: "/dental-payment-plans" },
];

export default function Home() {
  return (
    <main className="site-container py-8">
      {homepageSchema.map((schema, index) => (
        <StructuredData key={`home-schema-${index}`} data={schema} />
      ))}

      <section className="surface-card bg-gradient-to-br from-[#0f2858] to-[#1d4ea3] p-7 text-white md:p-10">
        <h1 className="text-3xl font-extrabold leading-tight md:text-5xl">Dental Finance UK: Compare Monthly Payment Plans</h1>
        <p className="mt-4 max-w-3xl text-base text-[#dbe7ff] md:text-lg">
          Compare dental finance options, monthly payment examples, 0% APR plans, provider guides and treatment finance options for UK patients.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/finance-calculator" className="btn bg-white text-[#0f2858] hover:bg-[#edf4ff]">
            Check Monthly Payments
          </Link>
          <Link href="/finance-providers" className="btn border border-[#aac3f6] bg-transparent text-white hover:bg-[#163a7f]">
            Compare Providers
          </Link>
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          {[
            "Independent comparison resource",
            "FCA-aware educational content",
            "Finance reviewed",
            "Dental treatment guides reviewed",
          ].map((item) => (
            <span key={item} className="badge border-[#5a78b0] bg-[#163a7f] text-[#dce8ff]">
              {item}
            </span>
          ))}
        </div>
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="surface-card p-6">
          <h2 className="section-title text-2xl">Popular Monthly Payment Examples</h2>
          <div className="table-wrap mt-4">
            <table className="table-ui">
              <thead>
                <tr>
                  <th>Treatment</th>
                  <th>Example Cost</th>
                  <th>Example Monthly Payment</th>
                </tr>
              </thead>
              <tbody>
                {monthlyExamples.map(([treatment, cost, monthly]) => (
                  <tr key={treatment}>
                    <th>{treatment}</th>
                    <td>{cost}</td>
                    <td>{monthly}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="surface-card p-6">
          <h2 className="section-title text-2xl">Compare Dental Finance Providers</h2>
          <div className="mt-4 space-y-3">
            {providerCards.map((provider) => (
              <Link key={provider.href} href={provider.href} className="subtle-card block p-4 transition hover:border-[#b2c5ed] hover:bg-[#f2f7ff]">
                <p className="font-semibold text-[#0f2858]">{provider.title}</p>
                <p className="mt-1 text-sm text-[#556689]">{provider.copy}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="surface-card p-6">
          <h2 className="section-title text-2xl">Treatment Finance Cards</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {treatmentCards.map((item) => (
              <Link key={item.href} href={item.href} className="subtle-card p-4 font-semibold text-[#0f2858] transition hover:border-[#b2c5ed] hover:bg-[#f2f7ff]">
                {item.title}
              </Link>
            ))}
          </div>
        </div>

        <div className="surface-card bg-gradient-to-br from-[#e8f1ff] to-[#f8fbff] p-6">
          <h2 className="section-title text-2xl">Finance Calculator CTA</h2>
          <p className="mt-3 text-[#4e6288]">
            Use our calculator tools to estimate monthly repayments and compare 0% APR vs representative APR scenarios.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link href="/finance-calculator" className="btn btn-primary">
              Open Finance Calculator
            </Link>
            <Link href="/monthly-payment-calculator" className="btn btn-secondary">
              Monthly Payment Tool
            </Link>
          </div>
        </div>
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="surface-card border-[#f0e0c1] bg-gradient-to-br from-[#fff8ea] to-[#fffdf8] p-6">
          <h2 className="section-title text-2xl">Turkey Dental Finance</h2>
          <p className="mt-3 text-[#5e6b88]">
            Explore UK vs Turkey comparisons, monthly payment examples, and treatment-by-treatment cost guidance.
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {[
              ["Veneers Turkey", "/veneers-uk-vs-turkey"],
              ["Implants Turkey", "/implants-uk-vs-turkey"],
              ["All-on-4 Turkey", "/all-on-4-uk-vs-turkey"],
              ["Hollywood Smile Turkey", "/hollywood-smile-uk-vs-turkey"],
            ].map(([label, href]) => (
              <Link key={href} href={href} className="subtle-card p-4 font-semibold text-[#0f2858]">
                {label}
              </Link>
            ))}
          </div>
          <Link href="/turkey-teeth-finance" className="btn btn-primary mt-4">
            Compare Turkey Treatment Finance
          </Link>
        </div>

        <div className="surface-card p-6">
          <h2 className="section-title text-2xl">Bad Credit and 0% Finance</h2>
          <ul className="mt-4 space-y-3 text-sm text-[#556689]">
            <li className="subtle-card p-3">0% APR plans may reduce total repayable amount when shorter terms are available.</li>
            <li className="subtle-card p-3">Bad-credit finance options exist but likely include higher APR and tighter affordability checks.</li>
            <li className="subtle-card p-3">Compare total cost, monthly commitment, and provider disclosures before applying.</li>
          </ul>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link href="/0-percent-dental-finance" className="btn btn-secondary">
              0% Finance Guide
            </Link>
            <Link href="/bad-credit-dental-finance" className="btn btn-secondary">
              Bad Credit Guide
            </Link>
          </div>
        </div>
      </section>

      <LeadCtaSection />

      <section className="surface-card mt-8 p-6">
        <h2 className="section-title text-2xl">FAQs</h2>
        <div className="mt-4 space-y-3">
          {homeFaqs.map((faq) => (
            <details key={faq.question} className="subtle-card p-4">
              <summary className="cursor-pointer font-semibold text-[#0f2858]">{faq.question}</summary>
              <p className="mt-2 text-sm text-[#556689]">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>
    </main>
  );
}
