import Link from "next/link";
import { OPERATOR_STATUS } from "@/lib/operator";

// Legal and trust links shared by the site footer. Every legal page must be listed here
// (enforced by test/compliance-v5.test.mjs).
export const legalFooterColumns = [
  {
    title: "About & Trust",
    links: [
      { href: "/about-us", label: "About Us" },
      { href: "/editorial-policy", label: "Editorial Policy" },
      { href: "/how-we-compare", label: "How We Compare" },
      { href: "/affiliate-disclosure", label: "Affiliate Disclosure" },
      { href: "/partners", label: "Partners" },
      { href: "/medical-review-policy", label: "Medical Review Policy" },
      { href: "/complaints-and-corrections", label: "Complaints & Corrections" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/legal-notice", label: "Legal Notice" },
      { href: "/disclaimer", label: "Disclaimer" },
      { href: "/financial-disclosure", label: "Financial Disclosure" },
      { href: "/privacy-policy", label: "Privacy Policy" },
      { href: "/cookie-policy", label: "Cookie Policy" },
      { href: "/terms", label: "Terms" },
      { href: "/accessibility", label: "Accessibility" },
    ],
  },
];

export function LegalFooterColumns() {
  return legalFooterColumns.map((column) => (
    <div key={column.title}>
      <p className="text-sm font-semibold text-white">{column.title}</p>
      <ul className="mt-3 space-y-2 text-sm">
        {column.links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="text-[#d2c7ff] hover:text-white">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  ));
}

export default function LegalFooter() {
  return (
    <div className="mt-10 rounded-2xl border border-[#4f3a9f] bg-[#26156a] p-4 text-xs leading-6 text-[#ddd4ff]">
      {OPERATOR_STATUS} Figures on this site are illustrative, not offers. Finance from third-party lenders is subject to
      status, eligibility, affordability and lender approval.
    </div>
  );
}
