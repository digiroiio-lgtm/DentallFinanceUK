import Link from "next/link";

// Shown on provider profile and comparison pages so the limits of the comparison
// are visible where the comparison is made, not only in the footer.
export default function ComparisonDisclosure() {
  return (
    <aside className="mt-6 rounded-2xl border border-[#cdbdf3] bg-[#f7f3ff] p-4 text-sm text-[#3f3478]" aria-label="About this comparison">
      <strong>About this comparison:</strong> it covers only some providers (not the whole market), uses information
      providers publish themselves, and does not rank providers for your circumstances. We receive no payment from any
      finance provider. Check current terms directly with the provider.{" "}
      <Link href="/how-we-compare" className="font-semibold text-[#5f3cd5] underline">
        How we compare
      </Link>
    </aside>
  );
}
