import Link from "next/link";
import StructuredData from "@/components/StructuredData";
import { getInternalLinks, getPageUrl } from "@/lib/siteData";

function buildCitySchemas(page) {
  const reviewedBy = [
    page.financeReviewer ? { "@type": "Person", name: page.financeReviewer } : null,
    page.dentalReviewer ? { "@type": "Person", name: page.dentalReviewer } : null,
    !page.financeReviewer && page.reviewer ? { "@type": "Person", name: page.reviewer } : null,
  ].filter(Boolean);

  return [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: page.title,
      dateModified: page.lastUpdated,
      author: { "@type": "Person", name: page.author },
      reviewedBy,
      url: getPageUrl(`/${page.slug}`),
      description: page.description,
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
        { "@type": "ListItem", position: 2, name: page.serviceType, item: getPageUrl(`/${page.slug}`) },
        { "@type": "ListItem", position: 3, name: page.cityName, item: getPageUrl(`/${page.slug}`) },
      ],
    },
  ];
}

export default function CityPageTemplate({ page }) {
  const baseLinks = getInternalLinks(page.slug);
  const internalLinks = [...(page.localLinks ?? []), ...baseLinks].filter(
    (link, index, array) => link.href !== `/${page.slug}` && array.findIndex((item) => item.href === link.href) === index
  );
  const schemas = buildCitySchemas(page);

  return (
    <main className="mx-auto w-full max-w-5xl p-6 text-gray-900">
      {schemas.map((schema, index) => (
        <StructuredData key={`${page.slug}-city-schema-${index}`} data={schema} />
      ))}

      <nav className="mb-4 text-sm">
        <Link href="/" className="underline">
          Home
        </Link>{" "}
        / {page.title}
      </nav>

      <h1 className="text-4xl font-bold">{page.title}</h1>
      <p className="mt-3 rounded bg-blue-50 p-4">{page.answerBlock}</p>
      <p className="mt-4">{page.localIntroduction}</p>

      <section className="mt-6">
        <h2 className="text-2xl font-semibold">Key Takeaways</h2>
        <ul className="mt-2 list-disc space-y-1 pl-6">
          {page.keyTakeaways.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </section>

      <section className="mt-6 overflow-x-auto">
        <h2 className="text-2xl font-semibold">Monthly Payment Examples</h2>
        <table className="mt-2 w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 bg-gray-50 p-2 text-left">Scenario</th>
              <th className="border border-gray-300 bg-gray-50 p-2 text-left">Treatment Cost</th>
              <th className="border border-gray-300 bg-gray-50 p-2 text-left">APR</th>
              <th className="border border-gray-300 bg-gray-50 p-2 text-left">Monthly</th>
              <th className="border border-gray-300 bg-gray-50 p-2 text-left">Total Repayable</th>
            </tr>
          </thead>
          <tbody>
            {page.monthlyExamples.map((example) => (
              <tr key={example.label}>
                <th className="border border-gray-300 bg-gray-50 p-2 text-left">{example.label}</th>
                <td className="border border-gray-300 p-2">{example.treatmentCost}</td>
                <td className="border border-gray-300 p-2">{example.apr}</td>
                <td className="border border-gray-300 p-2">{example.monthly}</td>
                <td className="border border-gray-300 p-2">{example.totalRepayable}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="mt-6 overflow-x-auto">
        <h2 className="text-2xl font-semibold">Comparison Table</h2>
        <table className="mt-2 w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 bg-gray-50 p-2 text-left">Option</th>
              <th className="border border-gray-300 bg-gray-50 p-2 text-left">Strength</th>
              <th className="border border-gray-300 bg-gray-50 p-2 text-left">Consideration</th>
            </tr>
          </thead>
          <tbody>
            {page.comparisonRows.map(([option, strength, consideration]) => (
              <tr key={option}>
                <th className="border border-gray-300 bg-gray-50 p-2 text-left">{option}</th>
                <td className="border border-gray-300 p-2">{strength}</td>
                <td className="border border-gray-300 p-2">{consideration}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="mt-6 overflow-x-auto">
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

      <section className="mt-6">
        <h2 className="text-2xl font-semibold">Long-tail Queries Covered</h2>
        <ul className="mt-2 list-disc space-y-1 pl-6">
          {page.longTailQueries.map((query) => (
            <li key={query}>{query}</li>
          ))}
        </ul>
      </section>

      <section className="mt-6 space-y-4">
        {page.sections.map((section) => (
          <article key={section.heading}>
            <h2 className="text-2xl font-semibold">{section.heading}</h2>
            <p className="mt-2">{section.body}</p>
          </article>
        ))}
      </section>

      <section className="mt-6">
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

      <section className="mt-6 rounded border border-gray-200 p-4">
        <h2 className="text-2xl font-semibold">Review and Disclosure</h2>
        <p>Author: {page.author}</p>
        <p>Finance Reviewer: {page.financeReviewer ?? page.reviewer}</p>
        {page.dentalReviewer ? <p>Dental Reviewer: {page.dentalReviewer}</p> : null}
        <p>Last Updated: {page.lastUpdated}</p>
      </section>

      <section className="mt-6 rounded border border-gray-200 p-4">
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
