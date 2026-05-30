import Link from "next/link";

export default function LeadCtaSection() {
  return (
    <section className="surface-card mt-10 bg-gradient-to-r from-[#0f2858] to-[#1d4ea3] p-6 text-white">
      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr] lg:items-center">
        <div>
          <h2 className="text-2xl font-bold">Ready to compare your monthly dental payments?</h2>
          <p className="mt-2 text-sm text-[#d9e6ff]">
            Use the calculator and provider guides to compare finance examples before you apply.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/finance-calculator" className="btn bg-white text-[#0f2858] hover:bg-[#edf4ff]">
              Use Finance Calculator
            </Link>
            <Link href="/finance-providers" className="btn border border-[#aac3f6] bg-transparent text-white hover:bg-[#163a7f]">
              Compare Providers
            </Link>
          </div>
        </div>

        <form action="/contact" className="lead-form-card">
          <p className="text-sm font-semibold text-[#0f2858]">Get tailored finance guidance</p>
          <label className="lead-form-label" htmlFor="lead-name">
            Name
          </label>
          <input id="lead-name" name="name" className="lead-form-input" placeholder="Your name" />
          <label className="lead-form-label" htmlFor="lead-treatment">
            Treatment
          </label>
          <input id="lead-treatment" name="treatment" className="lead-form-input" placeholder="e.g. Implants" />
          <button type="submit" className="btn btn-primary mt-3 w-full">
            Continue
          </button>
        </form>
      </div>
    </section>
  );
}
