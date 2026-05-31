import Link from "next/link";
import StructuredData from "@/components/StructuredData";
import HeroSection from "@/components/HeroSection";
import TrustBadges from "@/components/TrustBadges";
import CTASection from "@/components/CTASection";
import ReviewerBox from "@/components/ReviewerBox";
import TreatmentCard from "@/components/TreatmentCard";
import FAQAccordion from "@/components/FAQAccordion";
import LeadCtaSection from "@/components/LeadCtaSection";
import HomepageLoanCalculator from "@/components/HomepageLoanCalculator";
import TreatmentSelectorSection from "@/components/TreatmentSelectorSection";
import WhatsAppCtaBlock from "@/components/WhatsAppCtaBlock";
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

const providerRows = [
  {
    provider: "Kandoo",
    href: "/kandoo-finance",
    softCheck: "Yes",
    apr: "Variable",
    bestFor: "General",
  },
  {
    provider: "V12",
    href: "/v12-retail-finance",
    softCheck: "Yes",
    apr: "Variable",
    bestFor: "Clinics",
  },
  {
    provider: "Tabeo",
    href: "/tabeo-finance",
    softCheck: "Yes",
    apr: "Variable",
    bestFor: "Cosmetic",
  },
];

const treatmentCards = [
  { title: "Veneers Finance", href: "/veneers-finance", exampleCost: "£3,500", fromMonthly: "£146" },
  { title: "Dental Implants Finance", href: "/dental-implants-finance", exampleCost: "£4,800", fromMonthly: "£200" },
  { title: "Turkey Teeth Finance", href: "/turkey-teeth-finance", exampleCost: "£4,000", fromMonthly: "£167" },
  { title: "All-on-4 Finance", href: "/all-on-4-finance-turkey", exampleCost: "£7,000", fromMonthly: "£292" },
  { title: "All-on-6 Finance", href: "/all-on-6-finance-turkey", exampleCost: "£9,500", fromMonthly: "£396" },
];

const financeSteps = [
  {
    title: "Choose treatment",
    description: "Select the treatment you are planning so you can focus on realistic finance ranges.",
  },
  {
    title: "Compare monthly payments",
    description: "Use calculator previews to see indicative monthly costs before you apply.",
  },
  {
    title: "Apply with a provider",
    description: "Continue with a provider application when you are ready, subject to eligibility and approval.",
  },
];

export default function Home() {
  return (
    <main className="site-container py-8">
      {homepageSchema.map((schema, index) => (
        <StructuredData key={`home-schema-${index}`} data={schema} />
      ))}

      <HeroSection
        title="Dental Finance UK: Compare Monthly Payment Plans"
        description="Compare dental finance options, monthly payment examples, 0% APR plans, provider guides and treatment finance options for UK patients."
        primaryCta={{ href: "/finance-calculator", label: "Calculate My Monthly Cost" }}
        secondaryCta={{ href: "https://wa.me/905353998999", label: "Speak With Treatment Team", external: true, newTab: true }}
        highlights={[
          "Independent comparison resource",
          "FCA-aware educational content",
          "Finance reviewed",
          "Dental treatment guides reviewed",
        ]}
        image="/69fc79ae77a97849cc2e8703_7c42f7b1-d707-494d-a5e4-034c58e9032b-Q4IlvNfBnYqSHgr06sCvIvePcMb1ZK.webp"
        imageAlt="Dental professional reviewing finance options with a patient on a tablet"
      />

      <WhatsAppCtaBlock className="mt-6" />

      <HomepageLoanCalculator />

      <WhatsAppCtaBlock className="mt-6" />

      <TreatmentSelectorSection />

      <section className="surface-card mt-8 p-6">
        <h2 className="section-title text-2xl">Popular treatment finance options</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {treatmentCards.map((item) => (
            <TreatmentCard key={item.href} {...item} />
          ))}
        </div>
      </section>

      <section className="surface-card mt-8 p-6">
        <h2 className="section-title text-2xl">Compare providers</h2>
        <p className="mt-3 text-[#67589e]">Review provider positioning and continue to the most relevant comparison page.</p>
        <div className="table-wrap mt-4">
          <table className="table-ui">
            <thead>
              <tr>
                <th>Provider</th>
                <th>Soft Check</th>
                <th>APR</th>
                <th>Best For</th>
                <th>CTA</th>
              </tr>
            </thead>
            <tbody>
              {providerRows.map((provider) => (
                <tr key={provider.provider}>
                  <td className="font-semibold text-[#2f1f75]">{provider.provider}</td>
                  <td>{provider.softCheck}</td>
                  <td>{provider.apr}</td>
                  <td>{provider.bestFor}</td>
                  <td>
                    <Link href={provider.href} className="btn btn-secondary !px-3 !py-2 text-xs">
                      View Options
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="steps-showcase mt-8 p-6 md:p-8">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <span className="steps-kicker">PATIENT JOURNEY</span>
            <h2 className="step-intro-title mt-5 text-3xl md:text-5xl">How Dental Finance Works</h2>
            <p className="mt-4 text-base text-[#d6d9f5] md:text-lg">
              Follow this simple process to move from treatment research to finance application with confidence.
            </p>
          </div>
          <ol className="steps-timeline">
            {financeSteps.map((step, index) => (
              <li key={step.title} className="step-item">
                <span className="step-number">{index + 1}</span>
                <div className="step-card">
                  <h3 className="step-card-title">{step.title}</h3>
                  <p className="step-card-copy">{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <TrustBadges
        badges={[
          "Trusted by UK patients",
          "Independent editorial process",
          "Finance compliance aware",
          "Reviewed treatment guidance",
        ]}
      />

      <section className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="surface-card p-6">
          <h2 className="section-title text-2xl">Why trust Dental Finance UK</h2>
          <ul className="mt-4 space-y-3 text-sm text-[#695aa0]">
            <li className="subtle-card interactive-card p-3">Independent educational and comparison content, not lender advertising copy.</li>
            <li className="subtle-card interactive-card p-3">Consistent review standards for finance and treatment pages.</li>
            <li className="subtle-card interactive-card p-3">Clear financial disclosure and UK-focused guidance for informed decisions.</li>
          </ul>
        </div>
        <div className="grid gap-4">
          <ReviewerBox
            label="Editorial Team"
            name="Dental Finance UK Editorial"
            credentials="Consumer finance and dental treatment researchers"
            bio="Our editorial team compares provider terms, explains affordability checks, and publishes neutral educational guides."
            updatedAt="30 May 2026"
          />
          <ReviewerBox
            label="Medical Reviewer"
            name="Clinical Dental Reviewer"
            credentials="GDC-registered clinical advisor"
            bio="Treatment descriptions and suitability notes are medically reviewed for accuracy and patient safety context."
            updatedAt="30 May 2026"
          />
          <ReviewerBox
            label="Financial Reviewer"
            name="Finance Compliance Reviewer"
            credentials="UK consumer finance compliance specialist"
            bio="Finance claims, APR framing, and disclosures are reviewed to keep content clear and compliant."
            updatedAt="30 May 2026"
          />
        </div>
      </section>

      <CTASection
        title="Find a treatment plan that fits your budget"
        description="Compare common treatments and repayment scenarios before applying."
        primaryCta={{ href: "/dental-treatment-finance", label: "Explore Treatment Finance" }}
      />

      <section className="surface-card mt-8 p-6">
        <h2 className="section-title text-2xl">Calculator tools</h2>
        <p className="mt-3 text-[#67589e]">Use calculator tools to compare 0% APR and representative APR scenarios.</p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link href="/finance-calculator" className="btn btn-primary calculator-cta-btn">
            Open Finance Calculator
          </Link>
          <Link href="/monthly-payment-calculator" className="btn btn-secondary">
            Monthly Payment Tool
          </Link>
        </div>
      </section>

      <WhatsAppCtaBlock className="mt-8" />

      <LeadCtaSection />

      <FAQAccordion items={homeFaqs} />

      <Link href="/finance-calculator" className="mobile-floating-cta md:hidden">
        Calculate My Monthly Cost
      </Link>
    </main>
  );
}
