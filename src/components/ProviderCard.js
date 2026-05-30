import Link from "next/link";

export default function ProviderCard({ title, href, copy, apr, bestFor }) {
  return (
    <Link href={href} className="subtle-card interactive-card block p-4">
      <p className="font-semibold text-[#0f2858]">{title}</p>
      <p className="mt-1 text-sm text-[#556689]">{copy}</p>
      <div className="mt-3 flex flex-wrap gap-2 text-xs text-[#3d5480]">
        <span className="badge">APR: {apr}</span>
        <span className="badge">Best for: {bestFor}</span>
      </div>
    </Link>
  );
}
