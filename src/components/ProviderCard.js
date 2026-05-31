import Link from "next/link";

export default function ProviderCard({ title, href, copy, apr, bestFor }) {
  return (
    <Link href={href} className="subtle-card interactive-card block p-4">
      <p className="font-semibold text-[#2f1f75]">{title}</p>
      <p className="mt-1 text-sm text-[#68599f]">{copy}</p>
      <div className="mt-3 flex flex-wrap gap-2 text-xs text-[#5f5294]">
        <span className="badge">APR: {apr}</span>
        <span className="badge">Best for: {bestFor}</span>
      </div>
    </Link>
  );
}
