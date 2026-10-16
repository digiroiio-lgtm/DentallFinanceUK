import Link from "next/link";
import { OPERATOR } from "@/lib/operator";

// Genuine editorial facts only: publisher, editorial team, update date and policies.
export default function EditorialTrustPanel({ page, notice }) {
  return (
    <section className="surface-card mt-8 p-6" aria-label="About this page">
      <h2 className="section-title text-2xl">{notice?.title ?? "About this page"}</h2>
      {notice?.summary ? <p className="mt-2 text-[#3f567b]">{notice.summary}</p> : null}
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="subtle-card p-3 text-sm">Written by: {page.author}</div>
        <div className="subtle-card p-3 text-sm">Published by: {OPERATOR.shortName} ({OPERATOR.legalName})</div>
        <div className="subtle-card p-3 text-sm">Last updated: {page.lastUpdated}</div>
        <div className="subtle-card p-3 text-sm">Review: general information; no named financial or clinical reviewer</div>
      </div>
      <p className="mt-4 text-sm text-[#556689]">
        <Link href="/editorial-policy" className="font-medium text-[#6d4fe0] underline">Editorial policy</Link>
        {" · "}
        <Link href="/cost-and-calculator-methodology" className="font-medium text-[#6d4fe0] underline">Calculation method</Link>
        {" · "}
        <Link href="/affiliate-disclosure" className="font-medium text-[#6d4fe0] underline">Affiliate disclosure</Link>
        {" · "}
        <Link href="/complaints-and-corrections" className="font-medium text-[#6d4fe0] underline">Report an error</Link>
      </p>
    </section>
  );
}
