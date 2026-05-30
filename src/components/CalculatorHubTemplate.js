import Link from "next/link";
import StructuredData from "@/components/StructuredData";
import LeadCtaSection from "@/components/LeadCtaSection";
import { calculatorHubLinks, getInternalLinks, getPageUrl } from "@/lib/siteData";

function buildHubSchemas(page) {
  return [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: page.title,
      applicationCategory: "FinanceApplication",
      operatingSystem: "Web",
      url: getPageUrl(`/${page.slug}`),
      description: page.description,
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "GBP",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: page.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: getPageUrl("/") },
        { "@type": "ListItem", position: 2, name: page.title, item: getPageUrl(`/${page.slug}`) },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Dental Finance Calculators",
      itemListElement: calculatorHubLinks.map((calc, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: calc.label,
        url: getPageUrl(calc.href),
      })),
    },
  ];
}

export default function CalculatorHubTemplate({ page }) {
  const internalLinks = getInternalLinks(page.slug);
  const schemas = buildHubSchemas(page);

  return (
    <main className="site-container py-8 text-[#132445]">
      {schemas.map((schema, index) => (
        <StructuredData key={`${page.slug}-hub-schema-${index}`} data={schema} />
      ))}

      <section className="surface-card p-6 md:p-8">
        <nav className="text-sm text-[#5d6f91]">
          <Link href="/" className="font-medium text-[#1f4eb1] underline">
            Home
          </Link>{" "}
          / {page.title}
        </nav>
        <h1 className="mt-3 text-3xl font-extrabold text-[#0f2858] md:text-4xl">{page.title}</h1>
        <p className="mt-4 rounded-2xl border border-[#cfe0ff] bg-[#edf4ff] p-4">{page.answerBlock}</p>
      </section>

      <section className="surface-card mt-8 p-6">
        <h2 className="section-title text-2xl">Key Takeaways</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {page.keyTakeaways.map((point) => (
            <div key={point} className="subtle-card p-3 text-sm text-[#334b71]">
              {point}
            </div>
          ))}
        </div>
      </section>

      <section className="surface-card mt-8 p-6">
        <h2 className="section-title text-2xl">Choose a Calculator</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {calculatorHubLinks.map((calc) => (
            <Link key={calc.href} href={calc.href} className="subtle-card p-4 transition hover:border-[#b2c5ed] hover:bg-[#f2f7ff]">
              <p className="font-semibold text-[#0f2858]">{calc.label}</p>
              <p className="mt-1 text-sm text-[#556689]">{calc.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="section-title text-2xl">Summary Table</h2>
        <div className="table-wrap mt-4">
          <table className="table-ui">
            <tbody>
              {page.summaryRows.map(([label, value]) => (
                <tr key={label}>
                  <th>{label}</th>
                  <td>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="surface-card mt-8 p-6">
        <div className="space-y-6">
          {page.sections.map((section) => (
            <article key={section.heading}>
              <h2 className="section-title text-2xl">{section.heading}</h2>
              <p className="mt-2 text-[#3f567b]">{section.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="surface-card mt-8 p-6">
        <h2 className="section-title text-2xl">Frequently Asked Questions</h2>
        <div className="mt-4 space-y-3">
          {page.faqs.map((faq) => (
            <details key={faq.question} className="subtle-card p-4">
              <summary className="cursor-pointer font-semibold text-[#0f2858]">{faq.question}</summary>
              <p className="mt-2 text-[#3f567b]">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="surface-card mt-8 p-6">
        <h2 className="section-title text-2xl">Review and Disclosure</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div className="subtle-card p-3 text-sm">Author: {page.author}</div>
          <div className="subtle-card p-3 text-sm">Finance Reviewer: {page.financeReviewer ?? page.reviewer}</div>
          {page.dentalReviewer ? <div className="subtle-card p-3 text-sm">Dental Reviewer: {page.dentalReviewer}</div> : null}
          <div className="subtle-card p-3 text-sm">Last Updated: {page.lastUpdated}</div>
        </div>
      </section>

      <section className="surface-card mt-8 p-6">
        <h2 className="section-title text-2xl">References and Sources</h2>
        <ul className="mt-3 list-disc space-y-1 pl-6 text-[#3f567b]">
          {page.references.map((reference) => (
            <li key={reference}>{reference}</li>
          ))}
        </ul>
        <p className="mt-4 rounded-xl border border-[#e1e8f7] bg-[#f8fbff] p-3 text-sm text-[#4f6389]">Medical Disclaimer: {page.disclaimer}</p>
      </section>

      <section className="surface-card mt-8 p-6">
        <h2 className="section-title text-2xl">Related Guides</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {internalLinks.map((link) => (
            <Link key={link.href} href={link.href} className="subtle-card p-4 font-semibold text-[#0f2858] transition hover:border-[#b2c5ed] hover:bg-[#f2f7ff]">
              {link.label}
            </Link>
          ))}
        </div>
      </section>

      <LeadCtaSection />
    </main>
  );
}
