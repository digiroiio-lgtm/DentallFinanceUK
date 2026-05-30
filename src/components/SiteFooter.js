import Link from "next/link";

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
      { href: "/best-dental-finance-provider-uk", label: "Best Dental Finance Provider UK" },
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
  {
    title: "Legal",
    links: [
      { href: "/about-us", label: "About Us" },
      { href: "/editorial-policy", label: "Editorial Policy" },
      { href: "/medical-review-policy", label: "Medical Review Policy" },
      { href: "/financial-disclosure", label: "Financial Disclosure" },
      { href: "/privacy-policy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms" },
      { href: "/cookie-policy", label: "Cookie Policy" },
      { href: "/contact", label: "Contact" },
    ],
  },
];

export default function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-[#d9e2f3] bg-[#0f2858] text-[#e4edff]">
      <div className="site-container py-12">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_3fr]">
          <div>
            <p className="text-xl font-bold text-white">Dental Finance UK</p>
            <p className="mt-3 text-sm text-[#c5d3f3]">
              Independent UK resource for comparing monthly dental payment plans, provider options, and treatment finance guides.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {footerColumns.map((column) => (
              <div key={column.title}>
                <p className="text-sm font-semibold text-white">{column.title}</p>
                <ul className="mt-3 space-y-2 text-sm">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="text-[#c5d3f3] hover:text-white">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 rounded-2xl border border-[#2a4270] bg-[#112e65] p-4 text-xs leading-6 text-[#d2ddf5]">
          DentalFinanceUK is an independent educational and comparison website. We do not provide loans, make lending decisions, or offer regulated credit products. Finance products are provided by third-party authorised providers, subject to status and eligibility.
        </div>
      </div>
    </footer>
  );
}
