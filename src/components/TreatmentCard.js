import Link from "next/link";

export default function TreatmentCard({ title, href, exampleCost, fromMonthly }) {
  return (
    <Link href={href} className="subtle-card interactive-card block p-4">
      <p className="font-semibold text-[#2f1f75]">{title}</p>
      <p className="mt-2 text-sm text-[#68599f]">Example cost: {exampleCost}</p>
      <p className="text-sm font-medium text-[#5b469f]">From {fromMonthly}/month</p>
    </Link>
  );
}
