import { Suspense } from "react";
import Link from "next/link";
import StructuredData from "@/components/StructuredData";
import { getInternalLinks, getPageUrl } from "@/lib/siteData";
import CalculatorWidget from "@/components/CalculatorWidget";

function buildSchemas(page) {
  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: getPageUrl("/") },
      { "@type": "ListItem", position: 2, name: page.title, item: getPageUrl(`/${page.slug}`) },
    ],
  };

  if (page.type === "calculator") {
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
      breadcrumbs,
    ];
  }

  return [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: page.title,
      dateModified: page.lastUpdated,
      author: { "@type": "Person", name: page.author },
      reviewedBy: { "@type": "Person", name: page.reviewer },
      description: page.description,
      mainEntityOfPage: getPageUrl(`/${page.slug}`),
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
    breadcrumbs,
  ];
}

function DataTable({ section }) {
  return (
    <section className="mt-6 overflow-x-auto">
      <h2 className="text-2xl font-semibold">{section.title}</h2>
      {section.description ? <p className="mt-2 text-sm text-gray-600">{section.description}</p> : null}
      <table className="mt-3 w-full border-collapse border border-gray-300 text-sm">
        <thead>
          <tr>
            {section.headers.map((header) => (
              <th key={header} className="border border-gray-300 bg-gray-50 p-2 text-left">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {section.rows.map((row, rowIndex) => (
            <tr key={`${section.title}-${rowIndex}`}>
              {row.map((cell, cellIndex) => (
                <td key={`${section.title}-${rowIndex}-${cellIndex}`} className="border border-gray-300 p-2">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default function PageTemplate({ page }) {
  const internalLinks = page.internalLinks ?? getInternalLinks(page.slug);
  const schemas = buildSchemas(page);
  const medicalReview = page.medicalReview ?? null;
  const financeDisclosure = page.financeDisclosure ?? null;

  return (
    <main className="mx-auto w-full max-w-5xl p-6 text-gray-900">
      {schemas.map((schema, index) => (
        <StructuredData key={`${page.slug}-schema-${index}`} data={schema} />
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

      {page.savingsTable ? <DataTable section={page.savingsTable} /> : null}

      {page.monthlyPaymentTable ? <DataTable section={page.monthlyPaymentTable} /> : null}

      {page.type === "calculator" ? (
        <>
          <section className="mt-6">
            <h2 className="text-2xl font-semibold">Calculator</h2>
            <p className="mt-1 mb-3 text-sm text-gray-600">
              Adjust the inputs below to estimate your monthly repayment. The URL updates automatically — copy and share
              it to save your calculation.
            </p>
            <Suspense fallback={<p className="rounded border border-gray-200 p-4 text-sm text-gray-500">Loading calculator…</p>}>
              <CalculatorWidget config={page.calculatorConfig} />
            </Suspense>
          </section>

          {page.scenarios && page.scenarios.length > 0 && (
            <section className="mt-8 overflow-x-auto">
              <h2 className="text-2xl font-semibold">Example Scenarios</h2>
              <p className="mt-1 text-sm text-gray-600">
                Indicative estimates based on standard loan amortisation. Use the calculator above to adjust for your
                own figures.
              </p>
              <table className="mt-3 w-full border-collapse border border-gray-300 text-sm">
                <thead>
                  <tr>
                    <th className="border border-gray-300 bg-gray-50 p-2 text-left">Scenario</th>
                    <th className="border border-gray-300 bg-gray-50 p-2 text-left">Amount</th>
                    <th className="border border-gray-300 bg-gray-50 p-2 text-left">APR</th>
                    <th className="border border-gray-300 bg-gray-50 p-2 text-left">Term</th>
                    <th className="border border-gray-300 bg-gray-50 p-2 text-left">Monthly</th>
                    <th className="border border-gray-300 bg-gray-50 p-2 text-left">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {page.scenarios.map((row) => (
                    <tr key={row.name}>
                      <td className="border border-gray-300 p-2 font-medium">{row.name}</td>
                      <td className="border border-gray-300 p-2">{row.amount}</td>
                      <td className="border border-gray-300 p-2">{row.apr}</td>
                      <td className="border border-gray-300 p-2">{row.term}</td>
                      <td className="border border-gray-300 p-2">{row.monthly}</td>
                      <td className="border border-gray-300 p-2">{row.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          )}

          {page.aprExamples && page.aprExamples.length > 0 && (
            <section className="mt-8 overflow-x-auto">
              <h2 className="text-2xl font-semibold">APR Comparison</h2>
              <p className="mt-1 text-sm text-gray-600">
                Same loan amount and term at different APRs, showing the impact of interest rate on monthly payment
                and total cost.
              </p>
              <table className="mt-3 w-full border-collapse border border-gray-300 text-sm">
                <thead>
                  <tr>
                    <th className="border border-gray-300 bg-gray-50 p-2 text-left">APR</th>
                    <th className="border border-gray-300 bg-gray-50 p-2 text-left">Monthly Payment</th>
                    <th className="border border-gray-300 bg-gray-50 p-2 text-left">Total Repayable</th>
                    <th className="border border-gray-300 bg-gray-50 p-2 text-left">Total Interest</th>
                  </tr>
                </thead>
                <tbody>
                  {page.aprExamples.map((row) => (
                    <tr key={row.apr}>
                      <th className="border border-gray-300 bg-gray-50 p-2 text-left font-medium">{row.apr}</th>
                      <td className="border border-gray-300 p-2">{row.monthly}</td>
                      <td className="border border-gray-300 p-2">{row.total}</td>
                      <td className="border border-gray-300 p-2">{row.interest}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          )}

          {page.savingsExample && (
            <section className="mt-8 rounded border border-blue-100 bg-blue-50 p-4">
              <h2 className="text-2xl font-semibold">Savings Example</h2>
              <p className="mt-2">{page.savingsExample.description}</p>
              <div className="mt-3 grid gap-3 sm:grid-cols-3">
                <div className="rounded border border-blue-200 bg-white p-3 text-center">
                  <p className="text-xs text-gray-500">0% APR monthly</p>
                  <p className="text-xl font-bold text-blue-800">{page.savingsExample.zeroAprMonthly}</p>
                  <p className="text-xs text-gray-500">Total: {page.savingsExample.zeroAprTotal}</p>
                </div>
                <div className="rounded border border-gray-200 bg-white p-3 text-center">
                  <p className="text-xs text-gray-500">{page.savingsExample.repAprLabel} monthly</p>
                  <p className="text-xl font-bold">{page.savingsExample.repAprMonthly}</p>
                  <p className="text-xs text-gray-500">Total: {page.savingsExample.repAprTotal}</p>
                </div>
                <div className="rounded border border-green-200 bg-white p-3 text-center">
                  <p className="text-xs text-gray-500">Interest saved at 0% APR</p>
                  <p className="text-xl font-bold text-green-700">{page.savingsExample.saving}</p>
                </div>
              </div>
              <p className="mt-3 text-xs text-gray-500">
                Savings examples are indicative. Actual savings depend on the specific APR, term, and lender product available to you.
              </p>
            </section>
          )}
        </>
      ) : null}

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
        <h2 className="text-2xl font-semibold">{medicalReview?.title ?? "Medical Review"}</h2>
        {medicalReview?.summary ? <p className="mb-3">{medicalReview.summary}</p> : null}
        <p>Author: {page.author}</p>
        <p>Reviewer: {page.reviewer}</p>
        <p>Last Updated: {page.lastUpdated}</p>
      </section>

      {financeDisclosure ? (
        <section className="mt-6 rounded border border-gray-200 p-4">
          <h2 className="text-2xl font-semibold">{financeDisclosure.title ?? "Finance Disclosure"}</h2>
          {financeDisclosure.intro ? <p className="mt-2">{financeDisclosure.intro}</p> : null}
          {financeDisclosure.items?.length ? (
            <ul className="mt-3 list-disc space-y-1 pl-6">
              {financeDisclosure.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : null}
        </section>
      ) : null}

      <section className="mt-6 rounded border border-gray-200 p-4">
        <h2 className="text-2xl font-semibold">References and Sources</h2>
        <ul className="list-disc pl-6">
          {page.references.map((reference) => (
            <li key={reference}>{reference}</li>
          ))}
        </ul>
        <p className="mt-3 text-sm">Medical Disclaimer: {page.disclaimer}</p>
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
