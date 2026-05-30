import Link from "next/link";

export default function LeadCtaSection() {
  return (
    <section className="surface-card mt-10 bg-gradient-to-r from-[#0f2858] to-[#1d4ea3] p-6 text-white">
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
    </section>
  );
}
