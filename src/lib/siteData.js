export const SITE_URL = "https://dentalfinanceuk.co.uk";

export const primaryNav = [
  { href: "/", label: "Homepage" },
  { href: "/finance-calculator", label: "Finance Calculator" },
  { href: "/dental-payment-plans", label: "Payment Plans" },
  { href: "/dental-implants-finance", label: "Implants Finance" },
  { href: "/veneers-finance", label: "Veneers Finance" },
  { href: "/turkey-teeth-finance", label: "Turkey Teeth Finance" },
];

const financeFaqs = [
  {
    question: "Can I pay monthly for dental treatment?",
    answer:
      "Yes. Most UK dental finance plans split treatment costs into monthly instalments, often from 6 to 60 months depending on lender criteria.",
  },
  {
    question: "Is dental finance worth it?",
    answer:
      "Dental finance can be useful when treatment is clinically needed but paying upfront is difficult. Compare total repayment, APR, and flexibility first.",
  },
  {
    question: "Does dental finance affect credit score?",
    answer:
      "Applications usually include a credit check. Missing repayments can negatively affect your score, while consistent repayments may support a stronger credit profile.",
  },
  {
    question: "Can I get dental finance with bad credit?",
    answer:
      "Some providers assess bad-credit applicants, but acceptance rates and APR can differ. Always review affordability and alternatives before agreeing.",
  },
  {
    question: "What APR is typical?",
    answer:
      "Typical UK APRs vary by provider, term, and credit profile. Some clinics offer 0% promotional terms, while longer plans may have representative APR charges.",
  },
  {
    question: "Is 0% dental finance available?",
    answer:
      "Yes, many UK clinics offer 0% promotional plans for selected terms. Longer repayment windows may use interest-bearing products.",
  },
  {
    question: "Can I finance dental implants?",
    answer:
      "Yes. Implant treatment is commonly financed over monthly instalments to reduce upfront cost pressure.",
  },
  {
    question: "Can I finance veneers?",
    answer:
      "Yes. Veneers are frequently included in cosmetic dentistry finance options, subject to lender and clinic rules.",
  },
  {
    question: "Can I finance treatment in Turkey?",
    answer:
      "Some UK lenders and overseas providers offer plans, but terms, legal protections, and follow-up care responsibilities vary significantly.",
  },
];

const allPages = [
  ["dental-finance-uk", "Dental Finance UK", "article"],
  ["dental-monthly-payments", "Dental Monthly Payments", "article"],
  ["dental-payment-plans", "Dental Payment Plans", "article"],
  ["dental-finance-calculator", "Dental Finance Calculator", "article"],
  ["0-percent-dental-finance", "0% Dental Finance", "article"],
  ["bad-credit-dental-finance", "Bad Credit Dental Finance", "article"],
  ["dental-treatment-finance", "Dental Treatment Finance", "article"],
  ["dental-implants-finance", "Dental Implants Finance", "article"],
  ["veneers-finance", "Veneers Finance", "article"],
  ["cosmetic-dentistry-finance", "Cosmetic Dentistry Finance", "article"],
  ["turkey-teeth-finance", "Turkey Teeth Finance", "article"],
  ["dental-treatment-turkey-finance", "Dental Treatment Turkey Finance", "article"],
  ["finance-calculator", "Finance Calculator", "calculator"],
  ["implant-finance-calculator", "Implant Finance Calculator", "calculator"],
  ["veneer-finance-calculator", "Veneer Finance Calculator", "calculator"],
  ["dental-finance-vs-credit-card", "Dental Finance vs Credit Card", "article"],
  ["dental-finance-vs-personal-loan", "Dental Finance vs Personal Loan", "article"],
  ["uk-vs-turkey-dental-costs", "UK vs Turkey Dental Costs", "article"],
  ["blog", "Blog", "hub"],
  ["about-us", "About Us", "policy"],
  ["editorial-policy", "Editorial Policy", "policy"],
  ["medical-review-policy", "Medical Review Policy", "policy"],
  ["authors", "Authors", "policy"],
  ["contact", "Contact", "policy"],
  ["privacy-policy", "Privacy Policy", "policy"],
  ["terms", "Terms", "policy"],
  ["cookie-policy", "Cookie Policy", "policy"],
];

export const pageMap = Object.fromEntries(
  allPages.map(([slug, title, type]) => {
    const summaryRows = [
      ["Typical UK treatment budget", "£800 to £12,000+ depending on treatment"],
      ["Monthly payment terms", "6 to 60 months"],
      ["0% APR availability", "Available on selected promotional terms"],
      ["Representative example", "£3,000 over 24 months from £125 per month at 0% APR"],
    ];

    const base = {
      slug,
      title,
      type,
      description: `UK-focused guidance on ${title.toLowerCase()}, affordability, eligibility, and monthly repayment examples.`,
      answerBlock:
        "Dental finance helps spread treatment costs through manageable monthly payments. Compare APR, term length, total repayable amount, and provider protections before applying.",
      keyTakeaways: [
        "Compare total repayable, not just monthly cost.",
        "Check if 0% terms are available for your treatment type.",
        "Use affordability checks before applying.",
        "Understand how hard and soft credit checks are used.",
      ],
      summaryRows,
      sections: [
        {
          heading: "Definition and how it works",
          body:
            "Dental finance is a regulated credit agreement that allows patients to spread treatment costs across fixed monthly payments. UK providers typically offer short 0% plans and longer interest-bearing options.",
        },
        {
          heading: "Eligibility and application criteria",
          body:
            "Most lenders assess UK residency, age, affordability, and credit history. Approval depends on the lender and can include income verification and affordability checks.",
        },
        {
          heading: "Pros and cons",
          body:
            "Pros include immediate access to treatment and predictable budgeting. Cons include potential interest costs, missed-payment risks, and credit-impact considerations.",
        },
        {
          heading: "Monthly repayment example",
          body:
            "Example only: £2,400 treatment cost over 24 months could be around £100/month at 0% APR. At representative APR rates, monthly costs and total repayable increase.",
        },
      ],
      faqs: financeFaqs,
      author: "DentalFinanceUK Editorial Team",
      reviewer: "Dr Emily Carter, GDC-Registered Dentist",
      references: [
        "Financial Conduct Authority (FCA) Consumer Credit rules",
        "NHS dental charges and treatment guidance",
        "MoneyHelper borrowing and credit information",
      ],
      disclaimer:
        "Medical and financial information is educational only and not personal advice. Confirm suitability with a qualified clinician and regulated lender before proceeding.",
      lastUpdated: "2026-05-29",
    };

    if (type === "calculator") {
      return [
        slug,
        {
          ...base,
          answerBlock:
            "Use this calculator to estimate likely monthly dental finance repayments for UK treatment budgets and repayment terms.",
          sections: [
            {
              heading: "How to use this calculator",
              body:
                "Enter estimated treatment cost, APR, and term to compare possible monthly repayments before requesting a formal quote.",
            },
            {
              heading: "What this estimate includes",
              body:
                "Calculator outputs are indicative and do not replace lender-specific illustrations or representative examples.",
            },
          ],
        },
      ];
    }

    if (type === "hub") {
      return [
        slug,
        {
          ...base,
          answerBlock:
            "Explore our finance, implant, veneer, turkey treatment, cost guide, and calculator content silos designed for UK readers.",
          sections: [
            {
              heading: "Blog content silos",
              body:
                "Finance, Implants, Veneers, Turkey Dental Treatment, Cost Guides, and Calculators. Each article includes direct answers, key takeaways, and practical comparison tables.",
            },
          ],
        },
      ];
    }

    if (type === "policy") {
      return [
        slug,
        {
          ...base,
          answerBlock: `${title} explains how DentalFinanceUK maintains transparency, editorial standards, and user trust for UK readers.`,
          sections: [
            {
              heading: `${title} overview`,
              body:
                "This page explains governance, compliance approach, and how content quality is monitored and updated.",
            },
            {
              heading: "Trust and transparency",
              body:
                "We publish clear disclosures, update dates, author and reviewer information, and source references on all core content pages.",
            },
          ],
        },
      ];
    }

    return [slug, base];
  })
);

export const pageSlugs = Object.keys(pageMap);

export function getPageBySlug(slug) {
  return pageMap[slug];
}

export function getPageUrl(path = "") {
  return `${SITE_URL}${path}`;
}

export function getInternalLinks(currentSlug) {
  const baseLinks = [
    { href: "/", label: "Homepage" },
    { href: "/finance-calculator", label: "Finance Calculator" },
    { href: "/dental-payment-plans", label: "Dental Payment Plans" },
    { href: "/dental-treatment-finance", label: "Dental Treatment Finance" },
    { href: "/dental-implants-finance", label: "Dental Implants Finance" },
    { href: "/veneers-finance", label: "Veneers Finance" },
    { href: "/turkey-teeth-finance", label: "Turkey Teeth Finance" },
  ];

  return baseLinks.filter((link) => link.href !== `/${currentSlug}`);
}
