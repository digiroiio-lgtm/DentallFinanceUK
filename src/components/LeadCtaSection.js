import Link from "next/link";

export default function LeadCtaSection({
  title = "Ready to compare your monthly dental payments?",
  description = "Use the calculator and provider guides to compare finance examples before you apply.",
}) {
  return (
    <section className="surface-card mt-10 bg-gradient-to-r from-[#f1e8ff] to-[#faf7ff] p-6 text-[#0f172a] md:from-[#2b1b6b] md:to-[#6e4adf] md:text-white">
      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr] lg:items-center">
        <div>
          <h2 className="text-2xl font-bold text-[#0f172a] md:text-white">{title}</h2>
          <p className="mt-2 text-sm text-[#334155] md:text-[#eee7ff]">
            {description}
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/finance-calculator" className="btn btn-primary">
              Use Finance Calculator
            </Link>
            <Link href="/finance-providers" className="btn btn-secondary">
              Compare Providers
            </Link>
          </div>
        </div>

        <div className="lead-form-card">
          <p className="text-sm font-semibold text-[#0f2858]">Get tailored finance guidance</p>
          <label className="lead-form-label" htmlFor="lead-budget">
            Budget
          </label>
          <input
            id="lead-budget"
            name="budget"
            type="text"
            autoComplete="off"
            inputMode="numeric"
            pattern="^[£0-9,\\s]+$"
            className="lead-form-input"
            placeholder="e.g. £3,000"
          />
          <label className="lead-form-label" htmlFor="lead-treatment">
            Treatment
          </label>
          <input
            id="lead-treatment"
            name="treatment"
            type="text"
            autoComplete="off"
            className="lead-form-input"
            placeholder="e.g. Implants"
          />
          <Link href="/contact" className="btn btn-primary mt-3 w-full">
            Continue
          </Link>
        </div>
      </div>
    </section>
  );
}
