export default function FAQAccordion({ items = [] }) {
  return (
    <section className="surface-card mt-8 p-6">
      <h2 className="section-title text-2xl">FAQs</h2>
      <div className="mt-4 space-y-3">
        {items.map((faq) => (
          <details key={faq.question} className="subtle-card interactive-card p-4">
            <summary className="cursor-pointer font-semibold text-[#0f2858]">{faq.question}</summary>
            <p className="mt-2 text-sm text-[#556689]">{faq.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
