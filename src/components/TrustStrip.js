export default function TrustStrip() {
  const items = [
    "Compare multiple finance providers",
    "Estimate monthly payments instantly",
    "UK and Turkey treatment finance comparisons",
    "No impact soft-check information available",
  ];

  return (
    <section className="surface-card mt-6 p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#65579a]">
        Independent UK Comparison Resource
      </p>
      <ul className="mt-3 grid gap-2 sm:grid-cols-2">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2 text-sm text-[#2f1f75]">
            <span className="mt-0.5 text-[#2e7d32] text-base leading-none" aria-hidden="true">
              ✓
            </span>
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
