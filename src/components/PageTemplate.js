import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import StructuredData from "@/components/StructuredData";
import { getInternalLinks, getPageUrl } from "@/lib/siteData";
import CalculatorWidget from "@/components/CalculatorWidget";
import LeadCtaSection from "@/components/LeadCtaSection";

function buildSchemas(page) {
  const reviewedBy = [
    page.financeReviewer ? { "@type": "Person", name: page.financeReviewer } : null,
    page.dentalReviewer ? { "@type": "Person", name: page.dentalReviewer } : null,
    !page.financeReviewer && page.reviewer ? { "@type": "Person", name: page.reviewer } : null,
  ].filter(Boolean);

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
      reviewedBy,
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
    <section className="mt-8">
      <h2 className="section-title text-2xl">{section.title}</h2>
      {section.description ? <p className="mt-2 text-sm text-[#556689]">{section.description}</p> : null}
      <div className="table-wrap mt-4">
        <table className="table-ui">
          <thead>
            <tr>
              {section.headers.map((header) => (
                <th key={header}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {section.rows.map((row, rowIndex) => (
              <tr key={`${section.title}-${rowIndex}`}>
                {row.map((cell, cellIndex) => (
                  <td key={`${section.title}-${rowIndex}-${cellIndex}`}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function SavingsCalculation({ calculation }) {
  const toneClasses = {
    default: "subtle-card",
    accent: "rounded-2xl border border-[#c9baf1] bg-[#eee5ff]",
    positive: "rounded-2xl border border-[#bfe9c9] bg-[#effcf2]",
  };

  return (
    <section className="surface-card mt-8 p-6">
      <h2 className="section-title text-2xl">{calculation.title}</h2>
      {calculation.description ? <p className="mt-3 text-[#556689]">{calculation.description}</p> : null}
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        {calculation.metrics.map((metric) => (
          <div key={metric.label} className={`${toneClasses[metric.tone ?? "default"]} p-4 text-center`}>
            <p className="text-xs uppercase tracking-wide text-[#64779c]">{metric.label}</p>
            <p className="mt-1 text-2xl font-bold text-[#0f2858]">{metric.value}</p>
          </div>
        ))}
      </div>
      {calculation.footnote ? <p className="mt-3 text-xs text-[#6b7da3]">{calculation.footnote}</p> : null}
    </section>
  );
}

function SectionContent({ section }) {
  const items = section.items ?? [];
  const ListTag = section.ordered ? "ol" : "ul";

  return (
    <>
      {section.paragraphs?.length
        ? section.paragraphs.map((paragraph, index) => (
            <p key={`${section.heading}-paragraph-${index}`} className="mt-2 text-[#374e75]">
              {paragraph}
            </p>
          ))
        : section.body
          ? <p className="mt-2 text-[#374e75]">{section.body}</p>
          : null}

      {items.length > 0 ? (
        <ListTag className={`mt-3 space-y-2 pl-6 text-[#374e75] ${section.ordered ? "list-decimal" : "list-disc"}`}>
          {items.map((item, index) => {
            const value = typeof item === "string" ? { text: item } : item;

            return (
              <li key={`${section.heading}-item-${index}`}>
                {value.href ? (
                  <Link href={value.href} className="font-medium text-[#6d4fe0] underline decoration-2 underline-offset-2">
                    {value.text}
                  </Link>
                ) : (
                  value.text
                )}
              </li>
            );
          })}
        </ListTag>
      ) : null}
    </>
  );
}

function RelatedCards({ links }) {
  return (
    <section className="surface-card mt-8 p-6">
      <h2 className="section-title text-2xl">Related Guides</h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {links.map((link) => (
          <Link key={link.href} href={link.href} className="subtle-card p-4 font-semibold text-[#2f1f75] transition hover:border-[#ab95ee] hover:bg-[#e8deff]">
            {link.label}
          </Link>
        ))}
      </div>
    </section>
  );
}

export default function PageTemplate({ page }) {
  const internalLinks = page.internalLinks ?? getInternalLinks(page.slug);
  const schemas = buildSchemas(page);
  const medicalReview = page.medicalReview ?? null;
  const financeDisclosure = page.financeDisclosure ?? null;
  const isTurkey = /turkey|hollywood-smile/.test(page.slug);

  return (
    <main className="site-container py-8 text-[#25185f]">
      {schemas.map((schema, index) => (
        <StructuredData key={`${page.slug}-schema-${index}`} data={schema} />
      ))}

      <section className={`surface-card p-6 md:p-8 ${isTurkey ? "bg-gradient-to-br from-[#fff8ea] to-[#ffffff]" : ""}`}>
        <div className={`${isTurkey && page.image ? "grid gap-6 md:grid-cols-[1fr_auto] md:items-start" : ""}`}>
          <div>
            <nav className="text-sm text-[#6a5ea0]">
              <Link href="/" className="font-medium text-[#6d4fe0] underline">
                Home
              </Link>{" "}
              / {page.title}
            </nav>
            <h1 className="mt-3 text-3xl font-extrabold leading-tight text-[#2f1f75] md:text-4xl">{page.title}</h1>
            <p className={`mt-4 rounded-2xl border p-4 ${isTurkey ? "border-[#c9b9ef] bg-[#f0e8ff]" : "border-[#cdbdf3] bg-[#ece3ff]"}`}>
              {page.answerBlock}
            </p>
          </div>
          {isTurkey && page.image ? (
            <div className="relative hidden overflow-hidden rounded-2xl md:block" style={{ width: 360, height: 240 }}>
              <Image
                src={page.image}
                alt={page.imageAlt ?? page.title}
                fill
                sizes="360px"
                className="object-cover"
                priority
              />
            </div>
          ) : null}
        </div>
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

      {page.featureTable ? <DataTable section={page.featureTable} /> : null}
      {page.costTable ? <DataTable section={page.costTable} /> : null}
      {page.savingsCalculation ? <SavingsCalculation calculation={page.savingsCalculation} /> : null}
      {page.savingsTable ? <DataTable section={page.savingsTable} /> : null}
      {page.monthlyPaymentTable ? <DataTable section={page.monthlyPaymentTable} /> : null}

      {page.type === "calculator" ? (
        <>
          <section className="surface-card mt-8 p-6">
            <h2 className="section-title text-2xl">Calculator</h2>
            <p className="mt-2 text-sm text-[#556689]">
              Adjust inputs to estimate monthly repayments and compare repayment structures.
            </p>
            <div className="mt-4">
              <Suspense fallback={<p className="subtle-card p-4 text-sm text-[#6d5ea5]">Loading calculator…</p>}>
                <CalculatorWidget config={page.calculatorConfig} treatmentType={page.title} />
              </Suspense>
            </div>
          </section>

          {page.scenarios?.length > 0 ? (
            <section className="mt-8">
              <h2 className="section-title text-2xl">Example Scenarios</h2>
              <p className="mt-2 text-sm text-[#556689]">Indicative examples to compare monthly and total repayment outcomes.</p>
              <div className="table-wrap mt-4">
                <table className="table-ui">
                  <thead>
                    <tr>
                      <th>Scenario</th>
                      <th>Amount</th>
                      <th>APR</th>
                      <th>Term</th>
                      <th>Monthly</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {page.scenarios.map((row) => (
                      <tr key={row.name}>
                        <th>{row.name}</th>
                        <td>{row.amount}</td>
                        <td>{row.apr}</td>
                        <td>{row.term}</td>
                        <td>{row.monthly}</td>
                        <td>{row.total}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          ) : null}

          {page.aprExamples?.length > 0 ? (
            <section className="mt-8">
              <h2 className="section-title text-2xl">APR Comparison</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {page.aprExamples.map((row) => (
                  <div key={row.apr} className="subtle-card p-4">
                    <p className="text-sm font-semibold text-[#0f2858]">{row.apr}</p>
                    <p className="mt-2 text-sm text-[#556689]">Monthly: {row.monthly}</p>
                    <p className="text-sm text-[#556689]">Total: {row.total}</p>
                    <p className="text-sm text-[#556689]">Interest: {row.interest}</p>
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          {page.savingsExample ? (
            <section className="surface-card mt-8 border-[#c9baf1] bg-[#efe6ff] p-6">
              <h2 className="section-title text-2xl">Savings Example</h2>
              <p className="mt-2 text-[#3b5679]">{page.savingsExample.description}</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                <div className="subtle-card p-4 text-center">
                  <p className="text-xs text-[#6a7c9f]">0% APR monthly</p>
                  <p className="text-xl font-bold text-[#0f2858]">{page.savingsExample.zeroAprMonthly}</p>
                  <p className="text-xs text-[#6a7c9f]">Total: {page.savingsExample.zeroAprTotal}</p>
                </div>
                <div className="subtle-card p-4 text-center">
                  <p className="text-xs text-[#6a7c9f]">{page.savingsExample.repAprLabel} monthly</p>
                  <p className="text-xl font-bold text-[#2f1f75]">{page.savingsExample.repAprMonthly}</p>
                  <p className="text-xs text-[#6a7c9f]">Total: {page.savingsExample.repAprTotal}</p>
                </div>
                <div className="rounded-2xl border border-[#cbbdf1] bg-[#f7f3ff] p-4 text-center">
                  <p className="text-xs text-[#6a7c9f]">Interest saved at 0% APR</p>
                  <p className="text-xl font-bold text-[#5f3cd5]">{page.savingsExample.saving}</p>
                </div>
              </div>
              <p className="mt-3 text-xs text-[#6b7da3]">
                Savings examples are indicative. Actual savings depend on APR, term, and lender product availability.
              </p>
            </section>
          ) : null}
        </>
      ) : null}

      <section className="surface-card mt-8 p-6">
        <div className="space-y-6">
          {page.sections.map((section) => (
            <article key={section.heading}>
              <h2 className="section-title text-2xl">{section.heading}</h2>
              <SectionContent section={section} />
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
        <h2 className="section-title text-2xl">{medicalReview?.title ?? "Review and Disclosure"}</h2>
        {medicalReview?.summary ? <p className="mt-2 text-[#3f567b]">{medicalReview.summary}</p> : null}
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div className="subtle-card p-3 text-sm">Author: {page.author}</div>
          <div className="subtle-card p-3 text-sm">Finance Reviewer: {page.financeReviewer ?? page.reviewer}</div>
          {page.dentalReviewer ? <div className="subtle-card p-3 text-sm">Dental Reviewer: {page.dentalReviewer}</div> : null}
          <div className="subtle-card p-3 text-sm">Last Updated: {page.lastUpdated}</div>
        </div>
      </section>

      {financeDisclosure ? (
        <section className="surface-card mt-8 border-[#cdc0f0] bg-[#f4eeff] p-6">
          <h2 className="section-title text-2xl">{financeDisclosure.title ?? "Finance Disclosure"}</h2>
          {financeDisclosure.intro ? <p className="mt-2 text-[#3f567b]">{financeDisclosure.intro}</p> : null}
          {financeDisclosure.items?.length ? (
            <ul className="mt-3 list-disc space-y-1 pl-6 text-[#3f567b]">
              {financeDisclosure.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : null}
        </section>
      ) : null}

      <section className="surface-card mt-8 p-6">
        <h2 className="section-title text-2xl">References and Sources</h2>
        <ul className="mt-3 list-disc space-y-1 pl-6 text-[#3f567b]">
          {page.references.map((reference) => (
            <li key={reference}>{reference}</li>
          ))}
        </ul>
        <p className="mt-4 rounded-xl border border-[#d4c7f5] bg-[#f3edff] p-3 text-sm text-[#64579a]">Medical Disclaimer: {page.disclaimer}</p>
      </section>

      <RelatedCards links={internalLinks} />
      <LeadCtaSection />
    </main>
  );
}
