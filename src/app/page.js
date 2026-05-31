import Link from "next/link";
import StructuredData from "@/components/StructuredData";
import HeroSection from "@/components/HeroSection";
import FAQAccordion from "@/components/FAQAccordion";
import HomepageLoanCalculator from "@/components/HomepageLoanCalculator";
import TreatmentSelectorSection from "@/components/TreatmentSelectorSection";
import HeroDescriptionExperiment from "@/components/HeroDescriptionExperiment";
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
        secondaryCta={{ href: "https://wa.me/905353998999", label: "Speak With Treatment Team", external: true, newTab: true }}
        highlights={["Independent UK Comparison Resource"]}
        image="/69fc79ae77a97849cc2e8703_7c42f7b1-d707-494d-a5e4-034c58e9032b-Q4IlvNfBnYqSHgr06sCvIvePcMb1ZK.webp"
        imageAlt="Dental professional reviewing finance options with a patient on a tablet"
      />

      <HomepageLoanCalculator />

      <TreatmentSelectorSection />

      <section className="surface-card mt-8 p-6">
        <h2 className="section-title text-2xl">Compare providers</h2>
        <p className="mt-3 text-[#67589e]">Compare key provider differences at a glance.</p>
        <div className="table-wrap mt-4">
          <table className="table-ui">
            <thead>
              <tr>
                <th>Provider</th>
                <th>Soft Check</th>
                <th>APR</th>
                <th>Best For</th>
              </tr>
            </thead>
            <tbody>
              {providerRows.map((provider) => (
                <tr key={provider.provider}>
                  <td className="font-semibold text-[#2f1f75]">{provider.provider}</td>
                  <td>{provider.softCheck}</td>
                  <td>{provider.apr}</td>
                  <td>{provider.bestFor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
