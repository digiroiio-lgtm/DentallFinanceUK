import Link from "next/link";
import StructuredData from "@/components/StructuredData";
import { getPageBySlug, getPageUrl, pageSlugs } from "@/lib/siteData";

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

const homepageSections = [
  "What is dental finance",
  "How dental finance works",
  "Eligibility requirements",
  "0% APR options",
  "Monthly payment examples",
  "Finance calculator",
  "Comparison tables",
  "Dental implants finance",
  "Veneers finance",
  "Turkey treatment finance",
];

export default function Home() {
  const featuredPages = pageSlugs
    .filter((slug) => !["about-us", "privacy-policy", "terms", "cookie-policy"].includes(slug))
    .slice(0, 18)
    .map((slug) => getPageBySlug(slug));

  return (
    <main className="mx-auto w-full max-w-5xl p-6">
      {homepageSchema.map((schema, index) => (
        <StructuredData key={`home-schema-${index}`} data={schema} />
      ))}

      <h1 className="text-4xl font-bold">Dental Finance UK</h1>
      <p className="mt-3 text-xl">
        Compare dental payment plans, monthly finance options and treatment costs across the UK.
      </p>

      <p className="mt-4 rounded bg-blue-50 p-4">
        We help users compare UK dental finance options with educational guides, repayment examples, and calculator tools.
        Finance products are provided by authorised third-party lenders and brokers, subject to eligibility and status.
      </p>

      <section className="mt-6">
        <h2 className="text-2xl font-semibold">Key Takeaways</h2>
        <ul className="mt-2 list-disc pl-6">
          <li>0% dental finance can be available for selected terms.</li>
          <li>Bad credit options exist, but APR and criteria can differ.</li>
          <li>Implants, veneers, and wider cosmetic treatment can all be financed.</li>
          <li>Use calculators and comparison pages before submitting applications.</li>
        </ul>
      </section>

      <section className="mt-6 overflow-x-auto">
        <h2 className="text-2xl font-semibold">Summary Table</h2>
        <table className="mt-2 w-full border-collapse border border-gray-300">
          <tbody>
            <tr>
              <th className="border border-gray-300 bg-gray-50 p-2 text-left">Primary CTA</th>
              <td className="border border-gray-300 p-2">Check Your Monthly Payments</td>
            </tr>
            <tr>
              <th className="border border-gray-300 bg-gray-50 p-2 text-left">Secondary CTA</th>
              <td className="border border-gray-300 p-2">Get A Free Finance Assessment</td>
            </tr>
            <tr>
              <th className="border border-gray-300 bg-gray-50 p-2 text-left">Representative Example</th>
              <td className="border border-gray-300 p-2">£2,400 over 24 months from £100 per month at 0% APR</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className="mt-6">
        <h2 className="text-2xl font-semibold">Homepage Content Coverage</h2>
        <div className="mt-2 grid gap-2 sm:grid-cols-2">
          {homepageSections.map((section) => (
            <div key={section} className="rounded border border-gray-200 p-3">
              {section}
            </div>
          ))}
        </div>
      </section>

      <section className="mt-6 rounded border border-gray-200 p-4">
        <h2 className="text-2xl font-semibold">Trust and Transparency</h2>
        <ul className="mt-2 list-disc pl-6">
          <li><strong>Independent Information:</strong> We publish educational content and comparison resources about dental treatment finance.</li>
          <li><strong>FCA Transparency:</strong> Featured finance products are offered by authorised third-party providers who make eligibility and lending decisions.</li>
          <li><strong>Editorial Independence:</strong> Content is written and reviewed independently from finance providers.</li>
        </ul>
      </section>

      <section className="mt-6 rounded border border-gray-200 p-4">
        <h2 className="text-2xl font-semibold">Lead Form</h2>
        <form className="mt-2 grid gap-3 sm:grid-cols-2" aria-label="Lead form">
          {["First Name", "Last Name", "Email", "Phone", "Treatment Type", "Estimated Budget"].map((field) => (
            <label key={field} className="block text-sm">
              {field}
              <input className="mt-1 w-full rounded border p-2" />
            </label>
          ))}
          <div className="sm:col-span-2 flex gap-3">
            <button type="button" className="rounded bg-blue-700 px-4 py-2 text-white">
              Check Your Monthly Payments
            </button>
            <button type="button" className="rounded border border-blue-700 px-4 py-2 text-blue-700">
              Get A Free Finance Assessment
            </button>
          </div>
        </form>
      </section>

      <section className="mt-6">
        <h2 className="text-2xl font-semibold">Site Architecture and Content Map</h2>
        <div className="mt-2 grid gap-2 sm:grid-cols-2">
          {featuredPages.map((page) => (
            <Link key={page.slug} href={`/${page.slug}`} className="rounded border border-gray-200 p-3 underline">
              {page.title}
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-6">
        <h2 className="text-2xl font-semibold">FAQs</h2>
        <div className="mt-2 space-y-2">
          {homeFaqs.map((faq) => (
            <details key={faq.question} className="rounded border border-gray-200 p-3">
              <summary>{faq.question}</summary>
              <p className="mt-2">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>
    </main>
  );
}
