import Link from "next/link";
import Image from "next/image";
import StructuredData from "@/components/StructuredData";
import HeroSection from "@/components/HeroSection";
import TrustBadges from "@/components/TrustBadges";
import CTASection from "@/components/CTASection";
import ReviewerBox from "@/components/ReviewerBox";
import ProviderCard from "@/components/ProviderCard";
import TreatmentCard from "@/components/TreatmentCard";
import FAQAccordion from "@/components/FAQAccordion";
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

const providerCards = [
  {
    title: "Provider Hub",
    href: "/finance-providers",
    copy: "Compare provider features, approvals, and plan flexibility.",
    apr: "0% to representative APR",
    bestFor: "wide comparison",
  },
  {
    title: "Best Provider UK",
    href: "/best-dental-finance-provider-uk",
    copy: "Review top UK provider options and best-for scenarios.",
    apr: "provider dependent",
    bestFor: "decision support",
  },
  {
    title: "Kandoo vs V12",
    href: "/kandoo-vs-v12",
    copy: "Side-by-side eligibility and repayment positioning.",
    apr: "varies by lender",
    bestFor: "head-to-head compare",
  },
];

const treatmentCards = [
  { title: "Veneers Finance", href: "/veneers-finance", exampleCost: "£3,500", fromMonthly: "£146" },
  { title: "Dental Implants Finance", href: "/dental-implants-finance", exampleCost: "£4,800", fromMonthly: "£200" },
  { title: "Invisalign Finance", href: "/dental-treatment-finance", exampleCost: "£3,000", fromMonthly: "£125" },
  { title: "Turkey Teeth Finance", href: "/turkey-teeth-finance", exampleCost: "£4,000", fromMonthly: "£167" },
];

const financeSteps = [
  {
    title: "Customer applies",
    description:
      "Share your customer application link with tracking enabled so submitted finance requests can be monitored clearly.",
  },
  {
    title: "Customer receives offers",
    description:
      "After submission, eligible customers can review available lender offers and choose the option that fits their budget.",
  },
  {
    title: "Customer completes finance",
    description:
      "Once approved and accepted, the treatment finance agreement is finalised and repayments start under the selected terms.",
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
        primaryCta={{ href: "/finance-calculator", label: "Check Monthly Payments" }}
        secondaryCta={{ href: "/finance-providers", label: "Compare Providers" }}
        highlights={[
          "Independent comparison resource",
          "FCA-aware educational content",
          "Finance reviewed",
          "Dental treatment guides reviewed",
        ]}
        image="/69fc79ae77a97849cc2e8703_7c42f7b1-d707-494d-a5e4-034c58e9032b-Q4IlvNfBnYqSHgr06sCvIvePcMb1ZK.webp"
        imageAlt="Dental professional reviewing finance options with a patient on a tablet"
      />

      <TrustBadges
        badges={[
          "Trusted by UK patients",
          "Independent editorial process",
          "Finance compliance aware",
          "Reviewed treatment guidance",
        ]}
      />

      <CTASection
        title="Get your personalised monthly estimate"
        description="Use our calculators to compare repayment examples in under two minutes."
        primaryCta={{ href: "/finance-calculator", label: "Start Calculator" }}
        secondaryCta={{ href: "/monthly-payment-calculator", label: "Monthly Tool" }}
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
        title="Compare providers with confidence"
        description="See side-by-side options before committing to a treatment plan."
        primaryCta={{ href: "/finance-providers", label: "View Provider Hub" }}
      />

      <section className="steps-showcase mt-8 p-6 md:p-8">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <span className="steps-kicker">CUSTOMER</span>
            <h2 className="step-intro-title mt-5 text-3xl md:text-5xl">Your customers see the following...</h2>
            <p className="mt-4 text-base text-[#d6d9f5] md:text-lg">
              Once these steps are followed, your customer can proceed with treatment finance subject to eligibility and lender approval.
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

      <CTASection
        title="Ready to estimate repayments?"
        description="Check typical terms and monthly examples for your treatment budget."
        primaryCta={{ href: "/finance-calculator", label: "Estimate Payments" }}
      />

      <section className="surface-card mt-8 p-6">
        <h2 className="section-title text-2xl">Popular treatment finance options</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {treatmentCards.map((item) => (
            <TreatmentCard key={item.href} {...item} />
          ))}
        </div>
      </section>

      <CTASection
        title="Find a treatment plan that fits your budget"
        description="Compare common treatments and repayment scenarios before applying."
        primaryCta={{ href: "/dental-treatment-finance", label: "Explore Treatment Finance" }}
      />

      <section className="surface-card mt-8 p-6">
        <h2 className="section-title text-2xl">Compare providers</h2>
        <div className="mt-4 grid gap-6 lg:grid-cols-[1fr_280px]">
          <div className="grid gap-3 md:grid-cols-2">
            {providerCards.map((provider) => (
              <ProviderCard key={provider.href} {...provider} />
            ))}
          </div>
          <div className="relative hidden overflow-hidden rounded-2xl lg:block" style={{ minHeight: 187 }}>
            <Image
              src="/682ad3e892a970bf90d1c10f_article-d89e7d29-27d0-4f1c-9363-901fcf47bb9a-1747637031194-978648.webp"
              alt="Patients reviewing dental finance documents with a clinic advisor"
              fill
              sizes="280px"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <CTASection
        title="See all provider comparisons"
        description="Review provider differences, representative examples, and application pathways."
        primaryCta={{ href: "/finance-providers", label: "Compare All Providers" }}
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

      <LeadCtaSection />

      <FAQAccordion items={homeFaqs} />

      <Link href="/finance-calculator" className="mobile-floating-cta md:hidden">
        Check Monthly Payments
      </Link>
    </main>
  );
}
