import Link from "next/link";

export default function TreatmentCard({ title, href, exampleCost, fromMonthly }) {
  return (
    <Link href={href} className="subtle-card interactive-card block p-4">
      <p className="font-semibold text-[#0f2858]">{title}</p>
      <p className="mt-2 text-sm text-[#556689]">Example cost: {exampleCost}</p>
      <p className="text-sm font-medium text-[#2f4f8c]">From {fromMonthly}/month</p>
    </Link>
  );
}
