import Link from "next/link";
import { OPERATOR } from "@/lib/operator";
import LegalFooter, { LegalFooterColumns } from "@/components/LegalFooter";

const footerColumns = [
  {
    title: "Main Pages",
    links: [
      { href: "/", label: "Homepage" },
      { href: "/finance-calculator", label: "Finance Calculator" },
      { href: "/dental-payment-plans", label: "Payment Plans" },
      { href: "/finance-providers", label: "Providers" },
    ],
  },
  {
    title: "Treatment Finance",
    links: [
      { href: "/dental-implants-finance", label: "Implants Finance" },
      { href: "/veneers-finance", label: "Veneers Finance" },
      { href: "/dental-treatment-finance", label: "Dental Treatment Finance" },
      { href: "/cosmetic-dentistry-finance", label: "Cosmetic Dentistry Finance" },
    ],
  },
  {
    title: "Provider Guides",
    links: [
      { href: "/dental-finance-companies-uk", label: "Dental Finance Companies UK" },
      { href: "/best-dental-finance-provider-uk", label: "Choosing a Dental Finance Provider" },
      { href: "/kandoo-vs-v12", label: "Kandoo vs V12" },
      { href: "/finance-providers", label: "Finance Providers Hub" },
    ],
  },
  {
    title: "Turkey Finance",
    links: [
      { href: "/turkey-teeth-finance", label: "Turkey Teeth Finance" },
      { href: "/veneers-uk-vs-turkey", label: "Veneers UK vs Turkey" },
      { href: "/implants-uk-vs-turkey", label: "Implants UK vs Turkey" },
      { href: "/all-on-4-uk-vs-turkey", label: "All-on-4 UK vs Turkey" },
    ],
  },
];

export default function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-[#4f3a9f] bg-[#1a1046] text-[#ece7ff]">
      <div className="site-container py-12">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_3fr]">
          <div>
            <p className="text-xl font-bold text-white">Dental Finance UK</p>
            <p className="mt-3 text-sm text-[#d2c7ff]">
              Educational guides and illustrative calculators about paying for dental treatment in the UK.
            </p>
            <p className="mt-3 text-xs text-[#c4b8f5]">
              Operated by {OPERATOR.legalName}, {OPERATOR.address.addressLocality} / {OPERATOR.address.addressRegion},{" "}
              {OPERATOR.country}.{" "}
              <a href={`mailto:${OPERATOR.email}`} className="underline hover:text-white">
                {OPERATOR.email}
              </a>
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-6">
            {footerColumns.map((column) => (
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
            ))}
            <LegalFooterColumns />
          </div>
        </div>

        <LegalFooter />
      </div>
    </footer>
  );
}
