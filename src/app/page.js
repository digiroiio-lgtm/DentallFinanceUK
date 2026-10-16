import Link from "next/link";
import StructuredData from "@/components/StructuredData";
import HeroSection from "@/components/HeroSection";
import FAQAccordion from "@/components/FAQAccordion";
import HomepageLoanCalculator from "@/components/HomepageLoanCalculator";
import TreatmentSelectorSection from "@/components/TreatmentSelectorSection";
import HeroDescriptionExperiment from "@/components/HeroDescriptionExperiment";
import { getPageUrl } from "@/lib/siteData";
import { calculateMonthlyPayment, formatGbp } from "@/lib/financeCalc";
import TrustStrip from "@/components/TrustStrip";
import UkTurkeySavingsCalculator from "@/components/UkTurkeySavingsCalculator";

export const dynamic = "force-static";

const homeFaqs = [
  {
    question: "Can I pay monthly for dental treatment?",
    answer:
      "Yes. Many UK practices offer payment plans, and some work with regulated lenders that offer dental finance. Availability and terms vary by practice and by your circumstances.",
  },
  {
    question: "Is 0% dental finance available?",
    answer:
      "Some providers offer 0% plans on selected terms, subject to eligibility. Longer terms or larger sums often carry an APR, so check the total repayable.",
  },
  {
    question: "Can I get dental finance with bad credit?",
    answer:
      "Some lenders consider applicants with imperfect credit, but approval is never guaranteed and pricing varies. Our bad credit guide explains what to check first.",
  },
  {
    question: "Does dental finance affect my credit score?",
    answer:
      "A formal application normally involves a credit search that appears on your file, and missed payments can lower your score. Some providers use a soft search first, which does not leave a visible mark for other lenders.",
  },
  {
    question: "Are you a lender or a broker?",
    answer:
      "No. Dental Finance UK is an independent information website. We do not lend, broker or approve credit and we are not authorised by the FCA.",
  },
  {
    question: "Are the calculator results a quote?",
    answer:
      "No. They are illustrative estimates from a standard formula. Only a lender can give you a personal rate and representative example.",
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

const providerProfiles = [
  { name: "Kandoo", href: "/kandoo-finance" },
  { name: "V12 Retail Finance", href: "/v12-retail-finance" },
  { name: "Tabeo", href: "/tabeo-finance" },
  { name: "Chrysalis Finance", href: "/chrysalis-finance" },
];

const exploreLinks = [
  { href: "/dental-payment-plans", label: "Dental payment plans", copy: "Practice plans, lender finance and alternatives compared." },
  { href: "/dental-monthly-payments", label: "Monthly payments", copy: "What a monthly figure looks like for common costs and terms." },
  { href: "/0-percent-dental-finance", label: "0% dental finance", copy: "What 0% means and where the catches are." },
  { href: "/bad-credit-dental-finance", label: "Bad credit", copy: "Realistic options and what to check before applying." },
  { href: "/dental-implants-finance", label: "Implants finance", copy: "Staged costs and illustrative payments." },
  { href: "/veneers-finance", label: "Veneers finance", copy: "Composite and porcelain, and what changes the cost." },
  { href: "/finance-calculator", label: "Calculators", copy: "Run your own numbers for your treatment." },
  { href: "/turkey-teeth-finance", label: "Treatment abroad", copy: "What to budget for, and why UK finance may not apply." },
];

const howItWorks = [
  "Get a written, itemised treatment plan and quote from your dentist.",
  "Choose how to pay: a practice plan, lender finance, or your own loan or card.",
  "If a lender is involved, they check affordability and your credit file before deciding.",
  "If approved, you sign an agreement and repay monthly. Compare the total repayable, not just the monthly figure.",
];

const exampleAmounts = [1500, 3000, 6000];
const exampleTerms = [12, 24, 36];
const monthly = (amount, term, apr) =>
  formatGbp(calculateMonthlyPayment({ totalCost: amount, termMonths: term, apr }).monthlyPayment);

export default function Home() {
  return (
    <main className="site-container py-8">
      {homepageSchema.map((schema, index) => (
        <StructuredData key={`home-schema-${index}`} data={schema} />
      ))}

      <HeroSection
        title="Dental Finance UK"
        description={<HeroDescriptionExperiment />}
        primaryCta={{ href: "/finance-calculator", label: "Calculate My Monthly Cost" }}
        secondaryCta={{ href: "https://wa.me/905353998999", label: "WhatsApp A Treatment Advisor", external: true, newTab: true }}
        highlights={["Independent UK Comparison Resource"]}
        image="/69fc79ae77a97849cc2e8703_7c42f7b1-d707-494d-a5e4-034c58e9032b-Q4IlvNfBnYqSHgr06sCvIvePcMb1ZK.webp"
        imageAlt="Dental professional reviewing finance options with a patient on a tablet"
      />

      <HomepageLoanCalculator />

      <section className="surface-card mt-8 p-6">
        <h2 className="section-title text-2xl">Dental finance in the UK: the short answer</h2>
        <p className="mt-3 text-[#374e75]">
          Dental finance lets you spread the cost of private dental treatment into monthly payments, through a practice
          payment plan or a regulated lender. What you repay depends on the interest rate, the term and any deposit, so
          compare the total repayable rather than the monthly figure. We are an independent information site: we do not
          lend, broker or approve finance.
        </p>
      </section>

      <TrustStrip />

      <UkTurkeySavingsCalculator />

      <TreatmentSelectorSection />

      <section className="surface-card mt-8 p-6">
        <h2 className="section-title text-2xl">How dental finance works</h2>
        <ol className="mt-4 list-decimal space-y-2 pl-6 text-[#374e75]">
          {howItWorks.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
        <p className="mt-4 text-sm text-[#556689]">
          Not sure which route fits?{" "}
          <Link href="/dental-payment-plans" className="font-medium text-[#6d4fe0] underline">
            Compare payment plan types
          </Link>
          .
        </p>
      </section>

      <section className="surface-card mt-8 p-6">
        <h2 className="section-title text-2xl">What monthly payments can look like</h2>
        <p className="mt-2 text-sm text-[#556689]">
          Illustrative monthly payments with no deposit, at 0% and at an example 9.9% APR. Not quotes.{" "}
          <Link href="/cost-and-calculator-methodology" className="font-medium text-[#6d4fe0] underline">
            How we calculate these
          </Link>
          .
        </p>
        <div className="table-wrap mt-4">
          <table className="table-ui">
            <thead>
              <tr>
                <th>Treatment cost</th>
                {exampleTerms.map((term) => (
                  <th key={`z-${term}`}>{term} months at 0%</th>
                ))}
                {exampleTerms.map((term) => (
                  <th key={`a-${term}`}>{term} months at 9.9%</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {exampleAmounts.map((amount) => (
                <tr key={amount}>
                  <th>{formatGbp(amount, 0)}</th>
                  {exampleTerms.map((term) => (
                    <td key={`z-${amount}-${term}`}>{monthly(amount, term, 0)}</td>
                  ))}
                  {exampleTerms.map((term) => (
                    <td key={`a-${amount}-${term}`}>{monthly(amount, term, 9.9)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="surface-card mt-8 p-6">
        <h2 className="section-title text-2xl">Explore by need</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {exploreLinks.map((item) => (
            <Link key={item.href} href={item.href} className="subtle-card p-4 transition hover:border-[#ab95ee] hover:bg-[#e8deff]">
              <span className="font-semibold text-[#2f1f75]">{item.label}</span>
              <span className="mt-1 block text-sm text-[#556689]">{item.copy}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="surface-card mt-8 p-6">
        <h2 className="section-title text-2xl">Compare finance providers</h2>
        <p className="mt-1 text-sm text-[#67589e]">
          Independent profiles of providers that work with UK dental practices. Check each provider&apos;s own terms,
          rates and eligibility rules before applying.
        </p>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {providerProfiles.map((provider) => (
            <li key={provider.href}>
              <Link href={provider.href} className="subtle-card block p-3 font-semibold text-[#2f1f75] transition hover:border-[#ab95ee] hover:bg-[#e8deff]">
                {provider.name}
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-4">
          <Link href="/finance-providers" className="btn btn-primary">
            Compare All Providers
          </Link>
        </div>
      </section>

      <FAQAccordion items={homeFaqs} />
    </main>
  );
}
