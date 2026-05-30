import Link from "next/link";
import StructuredData from "@/components/StructuredData";
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
    <main className="mx-auto w-full max-w-5xl p-6 text-gray-900">
      {schemas.map((schema, index) => (
        <StructuredData key={`${page.slug}-hub-schema-${index}`} data={schema} />
      ))}

      <nav className="mb-4 text-sm">
        <Link href="/" className="underline">
          Home
        </Link>{" "}
        / {page.title}
      </nav>

      <h1 className="text-4xl font-bold">{page.title}</h1>
      <p className="mt-3 rounded bg-blue-50 p-4">{page.answerBlock}</p>

      <section className="mt-6">
        <h2 className="text-2xl font-semibold">Key Takeaways</h2>
        <ul className="mt-2 list-disc space-y-1 pl-6">
          {page.keyTakeaways.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold">Choose a Calculator</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {calculatorHubLinks.map((calc) => (
            <Link
              key={calc.href}
              href={calc.href}
              className="flex flex-col rounded border border-gray-200 p-4 hover:border-blue-400 hover:bg-blue-50 transition-colors"
            >
              <span className="font-semibold text-blue-800 underline">{calc.label}</span>
              <span className="mt-1 text-sm text-gray-600">{calc.description}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-8 overflow-x-auto">
        <h2 className="text-2xl font-semibold">Summary Table</h2>
        <table className="mt-2 w-full border-collapse border border-gray-300">
          <tbody>
            {page.summaryRows.map(([label, value]) => (
              <tr key={label}>
                <th className="border border-gray-300 bg-gray-50 p-2 text-left">{label}</th>
                <td className="border border-gray-300 p-2">{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="mt-8 space-y-4">
        {page.sections.map((section) => (
          <article key={section.heading}>
            <h2 className="text-2xl font-semibold">{section.heading}</h2>
            <p className="mt-2">{section.body}</p>
          </article>
        ))}
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold">Frequently Asked Questions</h2>
        <div className="mt-3 space-y-3">
          {page.faqs.map((faq) => (
            <details key={faq.question} className="rounded border border-gray-200 p-3">
              <summary className="cursor-pointer font-medium">{faq.question}</summary>
              <p className="mt-2">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="mt-8 rounded border border-gray-200 p-4">
        <h2 className="text-2xl font-semibold">Author and Medical Review</h2>
        <p>Author: {page.author}</p>
        <p>Reviewer: {page.reviewer}</p>
        <p>Last Updated: {page.lastUpdated}</p>
      </section>

      <section className="mt-8 rounded border border-gray-200 p-4">
        <h2 className="text-2xl font-semibold">References and Sources</h2>
        <ul className="list-disc pl-6">
          {page.references.map((reference) => (
            <li key={reference}>{reference}</li>
          ))}
        </ul>
        <p className="mt-3 text-sm">Medical Disclaimer: {page.disclaimer}</p>
      </section>

      <section className="mt-8 rounded border border-gray-200 p-4">
        <h2 className="text-2xl font-semibold">Internal Links</h2>
        <div className="mt-2 flex flex-wrap gap-3 text-sm">
          {internalLinks.map((link) => (
            <Link key={link.href} href={link.href} className="underline">
              {link.label}
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
