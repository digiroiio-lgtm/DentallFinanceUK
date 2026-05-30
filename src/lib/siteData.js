export const SITE_URL = "https://dentalfinanceuk.co.uk";

export const primaryNav = [
  { href: "/", label: "Homepage" },
  { href: "/finance-calculator", label: "Finance Calculator" },
  { href: "/dental-payment-plans", label: "Payment Plans" },
  { href: "/dental-implants-finance", label: "Implants Finance" },
  { href: "/veneers-finance", label: "Veneers Finance" },
  { href: "/turkey-teeth-finance", label: "Turkey Teeth Finance" },
];

const cityCatalog = [
  { name: "London", slug: "london" },
  { name: "Manchester", slug: "manchester" },
  { name: "Birmingham", slug: "birmingham" },
  { name: "Leeds", slug: "leeds" },
  { name: "Liverpool", slug: "liverpool" },
  { name: "Glasgow", slug: "glasgow" },
];

const cityServiceConfigs = [
  {
    key: "dental-finance",
    slugPrefix: "dental-finance",
    titlePrefix: "Dental Finance",
    treatmentLabel: "general private dental treatment",
    costBase: 3000,
  },
  {
    key: "veneers-finance",
    slugPrefix: "veneers-finance",
    titlePrefix: "Veneers Finance",
    treatmentLabel: "composite and porcelain veneers",
    costBase: 4200,
  },
  {
    key: "dental-implants-finance",
    slugPrefix: "dental-implants-finance",
    titlePrefix: "Dental Implants Finance",
    treatmentLabel: "single and multiple dental implant treatment",
    costBase: 6800,
  },
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
  ["finance-calculator", "Finance Calculator", "calculator-hub"],
  ["0-percent-finance-calculator", "0% Finance Calculator", "calculator"],
  ["dental-loan-calculator", "Dental Loan Calculator", "calculator"],
  ["monthly-payment-calculator", "Monthly Payment Calculator", "calculator"],
  ["veneer-cost-calculator", "Veneer Cost Calculator", "calculator"],
  ["implant-cost-calculator", "Implant Cost Calculator", "calculator"],
  ["all-on-4-finance-calculator", "All-on-4 Finance Calculator", "calculator"],
  ["all-on-6-finance-calculator", "All-on-6 Finance Calculator", "calculator"],
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

function toCurrency(value) {
  return `£${value.toLocaleString("en-GB")}`;
}

function calcMonthly(principal, aprPct, months) {
  if (aprPct === 0) return principal / months;
  const r = aprPct / 1200;
  return (principal * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
}

function fmtMoney(n) {
  return `£${Math.round(n).toLocaleString("en-GB")}`;
}

function buildAprRow(amount, aprPct, term, label) {
  const monthly = calcMonthly(amount, aprPct, term);
  const total = monthly * term;
  const interest = total - amount;
  return {
    apr: label,
    monthly: fmtMoney(monthly),
    total: fmtMoney(total),
    interest: fmtMoney(interest),
  };
}

function buildScenarioRow(name, amount, aprPct, term) {
  const monthly = calcMonthly(amount, aprPct, term);
  const total = monthly * term;
  return {
    name,
    amount: fmtMoney(amount),
    apr: aprPct === 0 ? "0% APR" : `${aprPct}% APR`,
    term: `${term} months`,
    monthly: fmtMoney(monthly),
    total: fmtMoney(total),
  };
}

// Per-calculator data: config, scenarios, APR examples, savings example, FAQs
const calculatorData = {
  "0-percent-finance-calculator": {
    calculatorConfig: { defaultAmount: 3000, defaultApr: 0, defaultTerm: 24 },
    scenarios: [
      buildScenarioRow("Composite veneers (6 teeth)", 2000, 0, 12),
      buildScenarioRow("Single implant", 3000, 0, 24),
      buildScenarioRow("Cosmetic package", 5000, 0, 24),
      buildScenarioRow("Teeth whitening + bonding", 800, 0, 12),
    ],
    aprExamples: [
      buildAprRow(3000, 0, 24, "0% APR"),
      buildAprRow(3000, 6.9, 24, "6.9% APR"),
      buildAprRow(3000, 9.9, 24, "9.9% APR"),
      buildAprRow(3000, 12.9, 24, "12.9% APR"),
    ],
    savingsExample: {
      description: "Choosing 0% APR vs 9.9% APR on £3,000 over 24 months saves approximately £321 in interest. Always confirm available terms with your clinic before applying.",
      zeroAprMonthly: fmtMoney(calcMonthly(3000, 0, 24)),
      zeroAprTotal: fmtMoney(3000),
      repAprLabel: "9.9% APR",
      repAprMonthly: fmtMoney(calcMonthly(3000, 9.9, 24)),
      repAprTotal: fmtMoney(calcMonthly(3000, 9.9, 24) * 24),
      saving: fmtMoney(calcMonthly(3000, 9.9, 24) * 24 - 3000),
    },
    keyTakeaways: [
      "0% APR means you repay exactly what you borrow with no added interest.",
      "Short promotional 0% terms (12–24 months) are the most common clinic offer.",
      "Longer terms may switch to a representative APR — always check the full agreement.",
      "Total repayable equals treatment cost on a genuine 0% plan.",
    ],
    summaryRows: [
      ["Example loan amount", "£3,000"],
      ["APR", "0%"],
      ["Term", "24 months"],
      ["Monthly payment", fmtMoney(calcMonthly(3000, 0, 24))],
      ["Total repayable", "£3,000"],
      ["Interest charged", "£0"],
    ],
    answerBlock:
      "A 0% finance calculator shows your exact monthly repayment on an interest-free dental plan — because you pay back only what you borrow, total repayable equals the original cost.",
    description: "Use our 0% finance calculator to estimate monthly payments on an interest-free dental plan. Enter loan amount and term to see your repayment with zero interest.",
    sections: [
      {
        heading: "How 0% dental finance works",
        body: "With a 0% APR plan, the lender charges no interest for a fixed promotional term. Monthly payments are simply the treatment cost divided by the number of months. If you miss a payment or exceed the agreed term, different rates may apply.",
      },
      {
        heading: "Typical 0% APR terms available",
        body: "UK dental clinics most commonly offer 0% plans across 6, 12, or 24 months. Some providers extend to 36 months. Availability depends on lender eligibility, credit profile, and the clinic's finance arrangement.",
      },
      {
        heading: "What happens after the 0% period",
        body: "If any balance remains after the promotional term, the lender's standard representative APR applies to that balance. Always confirm the full credit agreement before accepting a plan.",
      },
      {
        heading: "Eligibility for 0% dental finance",
        body: "Lenders assess income, residency, and credit history. 0% plans are typically available to applicants who pass affordability checks. Some clinics accept a wider range of credit profiles for higher-APR products.",
      },
    ],
    faqs: [
      { question: "Is 0% dental finance really free?", answer: "Yes — on a genuine 0% APR plan, you repay exactly what you borrow. No interest is added. Check the credit agreement carefully to confirm no fees apply." },
      { question: "What is the longest 0% dental finance term available?", answer: "Most UK clinics offer 0% for up to 12 or 24 months. A small number of providers extend to 36 months on selected treatments. Always verify current availability." },
      { question: "Can I get 0% finance with bad credit?", answer: "0% plans usually require a standard affordability check. Applicants with adverse credit may be offered interest-bearing alternatives. Compare total repayable across all options offered." },
      { question: "Does 0% finance affect my credit score?", answer: "Applying typically involves a credit check which may leave a footprint. Making regular on-time repayments can support your credit profile over time." },
      { question: "What if I can't repay within the 0% period?", answer: "Any outstanding balance at the end of the 0% term may switch to the standard representative APR. Confirm deferral and early settlement options before signing." },
    ],
  },

  "dental-loan-calculator": {
    calculatorConfig: { defaultAmount: 2500, defaultApr: 9.9, defaultTerm: 24 },
    scenarios: [
      buildScenarioRow("Routine cosmetic treatment", 1500, 9.9, 12),
      buildScenarioRow("Mid-range procedure", 2500, 9.9, 24),
      buildScenarioRow("Advanced cosmetic work", 5000, 9.9, 36),
      buildScenarioRow("Multiple treatments", 8000, 12.9, 48),
    ],
    aprExamples: [
      buildAprRow(2500, 0, 24, "0% APR"),
      buildAprRow(2500, 6.9, 24, "6.9% APR"),
      buildAprRow(2500, 9.9, 24, "9.9% representative APR"),
      buildAprRow(2500, 14.9, 24, "14.9% APR"),
    ],
    savingsExample: {
      description: "Choosing 0% APR vs 9.9% APR on £2,500 over 24 months saves approximately £267 in interest.",
      zeroAprMonthly: fmtMoney(calcMonthly(2500, 0, 24)),
      zeroAprTotal: fmtMoney(2500),
      repAprLabel: "9.9% APR",
      repAprMonthly: fmtMoney(calcMonthly(2500, 9.9, 24)),
      repAprTotal: fmtMoney(calcMonthly(2500, 9.9, 24) * 24),
      saving: fmtMoney(calcMonthly(2500, 9.9, 24) * 24 - 2500),
    },
    keyTakeaways: [
      "Dental loans spread treatment costs into fixed monthly payments.",
      "APR directly affects total repayable — compare rates carefully.",
      "Shorter terms mean higher monthly payments but less interest overall.",
      "Always review total repayable, not just monthly payment, before accepting.",
    ],
    summaryRows: [
      ["Example loan amount", "£2,500"],
      ["Representative APR", "9.9%"],
      ["Term", "24 months"],
      ["Monthly payment", fmtMoney(calcMonthly(2500, 9.9, 24))],
      ["Total repayable", fmtMoney(calcMonthly(2500, 9.9, 24) * 24)],
      ["Total interest", fmtMoney(calcMonthly(2500, 9.9, 24) * 24 - 2500)],
    ],
    answerBlock:
      "A dental loan calculator estimates your monthly repayments based on loan amount, APR, and term length. Use it to compare the cost of financing treatment at different interest rates before applying.",
    description: "Calculate monthly repayments on a dental loan. Enter your loan amount, APR, and term to see monthly payments, total repayable, and total interest.",
    sections: [
      {
        heading: "What is a dental loan?",
        body: "A dental loan is a personal credit agreement used to fund private dental treatment. Lenders advance the treatment cost and the patient repays in fixed monthly instalments over an agreed term, with interest applied at the stated APR.",
      },
      {
        heading: "How APR affects your repayments",
        body: "APR (Annual Percentage Rate) determines the true yearly cost of borrowing. A higher APR increases both the monthly payment and the total amount repayable. For example, borrowing £2,500 at 9.9% APR over 24 months costs significantly more than the same loan at 0% APR.",
      },
      {
        heading: "Choosing the right loan term",
        body: "Shorter terms mean higher monthly payments but lower total interest. Longer terms reduce monthly outgoings but increase the total cost. Use the calculator above to compare scenarios before choosing a term length.",
      },
      {
        heading: "How to compare dental loan offers",
        body: "Request a formal representative example from each lender. Compare total repayable, monthly payment, early settlement charges, and any arrangement fees. Confirm whether the APR is fixed or variable throughout the term.",
      },
    ],
    faqs: [
      { question: "What is a typical APR for a dental loan?", answer: "UK dental finance APRs vary by lender, term, and credit profile. Promotional 0% plans are available for shorter terms. Longer or higher-risk agreements may carry representative APRs of 6.9% to 19.9% or higher." },
      { question: "Can I pay off a dental loan early?", answer: "Most UK credit agreements allow early settlement. Some lenders charge an early settlement fee equal to a portion of remaining interest. Check your credit agreement for specific terms before signing." },
      { question: "Are dental loans regulated in the UK?", answer: "Yes. UK dental finance agreements are regulated by the Financial Conduct Authority (FCA) under the Consumer Credit Act. Lenders must provide representative examples and a 14-day cooling-off period." },
      { question: "Does a dental loan affect my credit score?", answer: "Applying for a loan typically involves a hard credit check, which may temporarily affect your score. Regular on-time repayments over the loan term can positively influence your credit profile." },
      { question: "What if I miss a dental loan payment?", answer: "Missing a payment can result in late fees, contact from the lender, and a negative mark on your credit file. Contact your lender promptly if you anticipate difficulty with a payment." },
    ],
  },

  "monthly-payment-calculator": {
    calculatorConfig: { defaultAmount: 3000, defaultApr: 0, defaultTerm: 24 },
    scenarios: [
      buildScenarioRow("£1,000 over 12 months at 0%", 1000, 0, 12),
      buildScenarioRow("£2,000 over 24 months at 0%", 2000, 0, 24),
      buildScenarioRow("£3,000 over 24 months at 0%", 3000, 0, 24),
      buildScenarioRow("£5,000 over 36 months at 9.9%", 5000, 9.9, 36),
      buildScenarioRow("£8,000 over 48 months at 9.9%", 8000, 9.9, 48),
    ],
    aprExamples: [
      buildAprRow(3000, 0, 12, "0% APR, 12 months"),
      buildAprRow(3000, 0, 24, "0% APR, 24 months"),
      buildAprRow(3000, 9.9, 24, "9.9% APR, 24 months"),
      buildAprRow(3000, 9.9, 36, "9.9% APR, 36 months"),
    ],
    savingsExample: {
      description: "Extending from 24 to 36 months at 9.9% APR on £3,000 reduces monthly payments but increases total interest paid.",
      zeroAprMonthly: fmtMoney(calcMonthly(3000, 9.9, 24)),
      zeroAprTotal: fmtMoney(calcMonthly(3000, 9.9, 24) * 24),
      repAprLabel: "36 months at 9.9%",
      repAprMonthly: fmtMoney(calcMonthly(3000, 9.9, 36)),
      repAprTotal: fmtMoney(calcMonthly(3000, 9.9, 36) * 36),
      saving: fmtMoney(Math.abs(calcMonthly(3000, 9.9, 24) * 24 - calcMonthly(3000, 9.9, 36) * 36)),
    },
    keyTakeaways: [
      "Monthly payment is determined by loan amount, APR, and term length.",
      "Longer terms lower monthly payments but increase total cost.",
      "At 0% APR, monthly payment equals treatment cost divided by months.",
      "Compare multiple scenarios before committing to a repayment term.",
    ],
    summaryRows: [
      ["Example loan amount", "£3,000"],
      ["APR", "0%"],
      ["Term", "24 months"],
      ["Monthly payment", fmtMoney(calcMonthly(3000, 0, 24))],
      ["Total repayable", "£3,000"],
    ],
    answerBlock:
      "The monthly payment calculator shows what you will pay each month for UK dental treatment based on the loan amount, APR, and repayment term you choose.",
    description: "Estimate your monthly dental finance payment. Enter treatment cost, APR, and term length to compare monthly repayment options across UK finance plans.",
    sections: [
      {
        heading: "How monthly payments are calculated",
        body: "At 0% APR, monthly payment equals the loan amount divided by the number of months. At any other APR, the standard loan amortisation formula applies: each payment covers accrued interest plus a portion of principal until the balance reaches zero.",
      },
      {
        heading: "Term length and monthly payment trade-offs",
        body: "A shorter term (e.g. 12 months) gives higher monthly payments but zero or minimal total interest. A longer term (e.g. 60 months) reduces monthly outgoings but increases total repayable — especially at higher APRs.",
      },
      {
        heading: "UK dental finance term options",
        body: "Most UK dental finance lenders offer terms from 6 to 60 months. Common options are 12, 24, and 36 months. Promotional 0% rates are most frequently available on 12 or 24-month plans.",
      },
      {
        heading: "Budgeting your monthly dental payment",
        body: "Use the calculator above to find a monthly payment that fits your budget, then confirm the full credit agreement with your lender before signing. Factor in any deposit required by the clinic or lender.",
      },
    ],
    faqs: [
      { question: "How is a monthly dental payment calculated?", answer: "At 0% APR, monthly payment = loan amount ÷ term (months). At other APRs, the amortisation formula divides interest costs across each monthly payment until the loan is fully repaid." },
      { question: "What is a realistic monthly payment for dental implants?", answer: "A single implant costing £3,000 over 24 months at 0% APR would be approximately £125 per month. At 9.9% APR the same loan would be around £138 per month." },
      { question: "Can I choose my repayment term?", answer: "Term selection depends on the lender and clinic. Common options are 6, 12, 18, 24, 36, 48, and 60 months. Longer terms are subject to the lender's affordability assessment." },
      { question: "What is the minimum monthly dental finance payment?", answer: "There is no universal minimum, but lenders set minimum loan amounts and term combinations. Smaller loans over shorter terms typically have higher monthly payments per pound borrowed." },
    ],
  },

  "veneer-cost-calculator": {
    calculatorConfig: { defaultAmount: 4200, defaultApr: 0, defaultTerm: 24 },
    scenarios: [
      buildScenarioRow("4 composite veneers", 1600, 0, 12),
      buildScenarioRow("6 porcelain veneers", 4200, 0, 24),
      buildScenarioRow("8 porcelain veneers", 5600, 0, 24),
      buildScenarioRow("10 porcelain veneers", 7000, 9.9, 36),
      buildScenarioRow("Full smile makeover (10–12)", 8400, 9.9, 36),
    ],
    aprExamples: [
      buildAprRow(4200, 0, 24, "0% APR, 24 months"),
      buildAprRow(4200, 6.9, 24, "6.9% APR, 24 months"),
      buildAprRow(4200, 9.9, 24, "9.9% APR, 24 months"),
      buildAprRow(4200, 9.9, 36, "9.9% APR, 36 months"),
    ],
    savingsExample: {
      description: "6 porcelain veneers at £4,200: choosing 0% APR vs 9.9% APR over 24 months saves approximately £449 in total interest.",
      zeroAprMonthly: fmtMoney(calcMonthly(4200, 0, 24)),
      zeroAprTotal: fmtMoney(4200),
      repAprLabel: "9.9% APR",
      repAprMonthly: fmtMoney(calcMonthly(4200, 9.9, 24)),
      repAprTotal: fmtMoney(calcMonthly(4200, 9.9, 24) * 24),
      saving: fmtMoney(calcMonthly(4200, 9.9, 24) * 24 - 4200),
    },
    keyTakeaways: [
      "Porcelain veneer costs typically range from £700 to £1,000 per tooth.",
      "Composite veneers are lower cost but may need replacing sooner.",
      "Finance spreads the cost across monthly instalments.",
      "Comparing 0% APR options can save hundreds in interest on larger sets.",
    ],
    summaryRows: [
      ["Example: 6 porcelain veneers", "£4,200"],
      ["Finance term", "24 months"],
      ["0% APR monthly", fmtMoney(calcMonthly(4200, 0, 24))],
      ["0% APR total", "£4,200"],
      ["9.9% APR monthly", fmtMoney(calcMonthly(4200, 9.9, 24))],
      ["9.9% APR total", fmtMoney(calcMonthly(4200, 9.9, 24) * 24)],
    ],
    answerBlock:
      "The veneer cost calculator estimates monthly finance payments for composite or porcelain veneers based on treatment cost, APR, and repayment term.",
    description: "Estimate monthly repayments for dental veneers. Calculate composite or porcelain veneer finance costs by entering total treatment cost, APR, and term.",
    sections: [
      {
        heading: "How much do dental veneers cost in the UK?",
        body: "Composite veneers typically cost £200–£500 per tooth. Porcelain (ceramic) veneers range from £700–£1,200 per tooth depending on the clinic, material, and location. A full set of 10 porcelain veneers could cost £7,000–£12,000.",
      },
      {
        heading: "Financing veneers with monthly payments",
        body: "Most UK cosmetic dental clinics offer finance for veneers through lender-backed plans. Plans typically range from 12 to 60 months, with 0% promotional offers available for shorter terms depending on eligibility.",
      },
      {
        heading: "Composite vs porcelain veneers: finance considerations",
        body: "Composite veneers have lower upfront costs and can be financed on shorter, lower-value plans. Porcelain veneers have higher costs and are more commonly financed over longer terms — making APR comparison particularly important.",
      },
      {
        heading: "Key questions to ask before financing veneers",
        body: "Confirm whether the quoted cost includes all consultations, fittings, and adjustments. Ask the clinic about their lender panel, available terms, and the cooling-off period for the credit agreement.",
      },
    ],
    faqs: [
      { question: "Can I finance dental veneers on a monthly plan?", answer: "Yes. Most UK cosmetic dental clinics offer monthly payment plans for veneers through regulated lender arrangements. Subject to eligibility and affordability checks." },
      { question: "What is the monthly cost of 6 porcelain veneers?", answer: "6 porcelain veneers at approximately £4,200 financed over 24 months at 0% APR would be approximately £175 per month. At 9.9% APR the same plan costs around £194 per month." },
      { question: "Is 0% finance available for veneers?", answer: "Yes, many UK clinics offer 0% promotional plans for veneers, typically over 12 or 24 months, subject to the lender's eligibility criteria." },
      { question: "What is the difference between composite and porcelain veneer finance?", answer: "Composite veneers cost less per tooth and are often financed on shorter plans. Porcelain veneers carry higher upfront costs, making longer-term finance more common — and total interest comparisons more financially significant." },
      { question: "How long does veneer finance last?", answer: "Finance terms for veneers typically range from 12 to 60 months depending on the lender and the total treatment amount. 0% offers are most commonly available on 12 or 24-month plans." },
    ],
  },

  "implant-cost-calculator": {
    calculatorConfig: { defaultAmount: 6800, defaultApr: 0, defaultTerm: 24 },
    scenarios: [
      buildScenarioRow("Single implant", 3000, 0, 24),
      buildScenarioRow("Two implants", 6000, 0, 24),
      buildScenarioRow("Single implant + crown", 3500, 9.9, 24),
      buildScenarioRow("Multiple implants (3–4)", 10000, 9.9, 36),
      buildScenarioRow("Full arch implants", 20000, 9.9, 60),
    ],
    aprExamples: [
      buildAprRow(6800, 0, 24, "0% APR, 24 months"),
      buildAprRow(6800, 6.9, 24, "6.9% APR, 24 months"),
      buildAprRow(6800, 9.9, 24, "9.9% APR, 24 months"),
      buildAprRow(6800, 9.9, 36, "9.9% APR, 36 months"),
    ],
    savingsExample: {
      description: "Two dental implants at £6,800: 0% APR over 24 months versus 9.9% APR over the same term saves approximately £728 in total interest.",
      zeroAprMonthly: fmtMoney(calcMonthly(6800, 0, 24)),
      zeroAprTotal: fmtMoney(6800),
      repAprLabel: "9.9% APR",
      repAprMonthly: fmtMoney(calcMonthly(6800, 9.9, 24)),
      repAprTotal: fmtMoney(calcMonthly(6800, 9.9, 24) * 24),
      saving: fmtMoney(calcMonthly(6800, 9.9, 24) * 24 - 6800),
    },
    keyTakeaways: [
      "A single dental implant in the UK typically costs £2,000–£3,500.",
      "Finance plans can spread implant costs over 12 to 60 months.",
      "0% APR offers significant savings on higher-value implant plans.",
      "Always confirm implant warranty, aftercare, and lender terms before proceeding.",
    ],
    summaryRows: [
      ["Example: 2 implants", "£6,800"],
      ["Term", "24 months at 0%"],
      ["Monthly (0% APR)", fmtMoney(calcMonthly(6800, 0, 24))],
      ["Total (0% APR)", "£6,800"],
      ["Monthly (9.9% APR)", fmtMoney(calcMonthly(6800, 9.9, 24))],
      ["Total (9.9% APR)", fmtMoney(calcMonthly(6800, 9.9, 24) * 24)],
    ],
    answerBlock:
      "The implant cost calculator helps you estimate monthly finance repayments for single or multiple dental implants based on the total treatment cost, APR, and chosen repayment term.",
    description: "Calculate monthly payments for dental implants. Enter total implant treatment cost, APR, and term to estimate repayments for single or multiple implants.",
    sections: [
      {
        heading: "How much do dental implants cost in the UK?",
        body: "Single dental implants typically cost £2,000–£3,500 in the UK. Full arch treatments and same-day implant procedures carry higher costs. Prices vary by clinic, location, implant brand, and number of implants placed.",
      },
      {
        heading: "Financing dental implants",
        body: "Dental implants are among the most commonly financed dental procedures due to their higher upfront costs. Many UK clinics offer regulated monthly payment plans through lender partners, with terms ranging from 12 to 60 months.",
      },
      {
        heading: "0% APR and implant finance",
        body: "Some clinics offer 0% APR for selected terms on implant treatment. For higher-cost full-arch procedures, a longer term at representative APR may be the only available option. Confirm all available products before applying.",
      },
      {
        heading: "What is included in implant treatment costs?",
        body: "Implant costs can include the implant post, abutment, crown, consultation, imaging, surgical guide, and aftercare. Always confirm exactly what is included in any quoted price before financing the treatment.",
      },
    ],
    faqs: [
      { question: "Can I finance dental implants monthly?", answer: "Yes. Most UK dental implant clinics offer regulated finance plans through lender partners. Repayment periods typically range from 12 to 60 months depending on the total cost and your eligibility." },
      { question: "What is the monthly cost of a dental implant?", answer: "A single implant at £3,000 financed over 24 months at 0% APR costs approximately £125 per month. At 9.9% APR the same loan costs around £138 per month." },
      { question: "Is 0% implant finance available?", answer: "Yes, some clinics offer promotional 0% APR for implant treatment. Availability depends on the lender, total treatment cost, and your credit profile. Longer terms may require an interest-bearing product." },
      { question: "What happens if I need additional implant work after financing?", answer: "If further treatment is needed after your original finance agreement, you would need to arrange a new finance plan or pay the additional cost separately. Confirm the scope of treatment in writing before signing any credit agreement." },
      { question: "What is the difference between implant cost and implant finance?", answer: "Implant cost is the full upfront price of the treatment. Implant finance is the credit product used to spread that cost over monthly payments. Finance adds interest costs unless a 0% APR plan is available." },
    ],
  },

  "all-on-4-finance-calculator": {
    calculatorConfig: { defaultAmount: 12000, defaultApr: 9.9, defaultTerm: 36 },
    scenarios: [
      buildScenarioRow("Single arch All-on-4", 12000, 9.9, 36),
      buildScenarioRow("Single arch All-on-4 (0% offer)", 12000, 0, 24),
      buildScenarioRow("Full mouth All-on-4 (2 arches)", 24000, 9.9, 60),
      buildScenarioRow("All-on-4 with bone graft", 15000, 9.9, 48),
    ],
    aprExamples: [
      buildAprRow(12000, 0, 24, "0% APR, 24 months"),
      buildAprRow(12000, 9.9, 36, "9.9% APR, 36 months"),
      buildAprRow(12000, 9.9, 48, "9.9% APR, 48 months"),
      buildAprRow(12000, 12.9, 60, "12.9% APR, 60 months"),
    ],
    savingsExample: {
      description: "For a £12,000 All-on-4 treatment, choosing a 36-month 9.9% APR plan vs a 60-month 12.9% APR plan reduces total interest significantly.",
      zeroAprMonthly: fmtMoney(calcMonthly(12000, 9.9, 36)),
      zeroAprTotal: fmtMoney(calcMonthly(12000, 9.9, 36) * 36),
      repAprLabel: "12.9% APR, 60 months",
      repAprMonthly: fmtMoney(calcMonthly(12000, 12.9, 60)),
      repAprTotal: fmtMoney(calcMonthly(12000, 12.9, 60) * 60),
      saving: fmtMoney(calcMonthly(12000, 12.9, 60) * 60 - calcMonthly(12000, 9.9, 36) * 36),
    },
    keyTakeaways: [
      "All-on-4 treatment uses four implants to support a full fixed arch of teeth.",
      "UK All-on-4 costs typically range from £10,000 to £18,000 per arch.",
      "Finance terms of 36–60 months are most common for All-on-4 treatment.",
      "Comparing APR and total repayable can save thousands on longer-term plans.",
    ],
    summaryRows: [
      ["Example: single arch All-on-4", "£12,000"],
      ["Representative APR", "9.9%"],
      ["Term", "36 months"],
      ["Monthly payment", fmtMoney(calcMonthly(12000, 9.9, 36))],
      ["Total repayable", fmtMoney(calcMonthly(12000, 9.9, 36) * 36)],
      ["Total interest", fmtMoney(calcMonthly(12000, 9.9, 36) * 36 - 12000)],
    ],
    answerBlock:
      "The All-on-4 finance calculator estimates monthly repayments for All-on-4 dental implant treatment. Enter your total treatment cost, APR, and term to compare payment plans for full-arch implant procedures.",
    description: "Calculate monthly finance payments for All-on-4 dental implants. Compare APR options and term lengths for single or full-mouth All-on-4 treatment costs.",
    sections: [
      {
        heading: "What is All-on-4 dental treatment?",
        body: "All-on-4 is a full-arch dental implant procedure that uses four strategically placed implants to support a fixed bridge of replacement teeth. It can restore a full upper or lower arch in a single procedure, often with immediate loading.",
      },
      {
        heading: "All-on-4 costs in the UK",
        body: "UK All-on-4 treatment typically costs £10,000–£18,000 per arch depending on the clinic, included components, and complexity. Full mouth treatment (both arches) can reach £20,000–£35,000. Costs vary by clinic and whether bone grafting is required.",
      },
      {
        heading: "Financing All-on-4 treatment",
        body: "Due to the high upfront costs, most patients finance All-on-4 treatment. Finance terms of 36, 48, or 60 months are most common. Some clinics offer promotional 0% plans for shorter terms. Compare total repayable carefully across all available options.",
      },
      {
        heading: "All-on-4 vs other full-arch options",
        body: "All-on-4 typically offers lower cost than All-on-6 or individual implants for full-arch restoration. However, All-on-6 may offer greater stability and support for some patients. Consult with a specialist before committing to either treatment.",
      },
    ],
    faqs: [
      { question: "How much does All-on-4 cost per month?", answer: "A single arch All-on-4 at £12,000 financed over 36 months at 9.9% APR costs approximately £384 per month with a total repayable of around £13,833. At 0% APR over 24 months it would be £500 per month." },
      { question: "Is finance available for All-on-4 dental treatment?", answer: "Yes. Most UK clinics offering All-on-4 work with regulated lender panels to provide monthly payment options. Terms and APR depend on the lender and your credit profile." },
      { question: "What is included in All-on-4 treatment costs?", answer: "Typical inclusions are consultation, imaging (CT scan), implant placement, temporary bridge, final fixed bridge, and initial aftercare. Always confirm exactly what is included and what might incur additional charges." },
      { question: "Can I get All-on-4 treatment abroad and finance it in the UK?", answer: "Some UK finance providers will only fund treatment at UK-registered clinics. Overseas All-on-4 procedures may require self-funding or a personal loan rather than a clinic-arranged finance product." },
      { question: "How does All-on-4 finance compare to All-on-6?", answer: "All-on-4 uses four implants per arch and is generally lower cost. All-on-6 uses six implants per arch and may cost £2,000–£5,000 more per arch depending on the clinic. Both can be financed on monthly plans subject to eligibility." },
    ],
  },

  "all-on-6-finance-calculator": {
    calculatorConfig: { defaultAmount: 15000, defaultApr: 9.9, defaultTerm: 36 },
    scenarios: [
      buildScenarioRow("Single arch All-on-6", 15000, 9.9, 36),
      buildScenarioRow("Single arch All-on-6 (0% offer)", 15000, 0, 24),
      buildScenarioRow("Full mouth All-on-6 (2 arches)", 30000, 9.9, 60),
      buildScenarioRow("All-on-6 with bone graft", 18000, 9.9, 48),
    ],
    aprExamples: [
      buildAprRow(15000, 0, 24, "0% APR, 24 months"),
      buildAprRow(15000, 9.9, 36, "9.9% APR, 36 months"),
      buildAprRow(15000, 9.9, 48, "9.9% APR, 48 months"),
      buildAprRow(15000, 12.9, 60, "12.9% APR, 60 months"),
    ],
    savingsExample: {
      description: "For a £15,000 All-on-6 treatment, a 36-month plan at 9.9% APR reduces total interest compared to a 60-month plan at 12.9% APR.",
      zeroAprMonthly: fmtMoney(calcMonthly(15000, 9.9, 36)),
      zeroAprTotal: fmtMoney(calcMonthly(15000, 9.9, 36) * 36),
      repAprLabel: "12.9% APR, 60 months",
      repAprMonthly: fmtMoney(calcMonthly(15000, 12.9, 60)),
      repAprTotal: fmtMoney(calcMonthly(15000, 12.9, 60) * 60),
      saving: fmtMoney(calcMonthly(15000, 12.9, 60) * 60 - calcMonthly(15000, 9.9, 36) * 36),
    },
    keyTakeaways: [
      "All-on-6 uses six implants per arch for enhanced support and stability.",
      "UK All-on-6 treatment typically costs £12,000–£20,000 per arch.",
      "Finance terms of 36–60 months are most common for All-on-6 procedures.",
      "Full-mouth All-on-6 can exceed £30,000 — comparing total repayable is critical.",
    ],
    summaryRows: [
      ["Example: single arch All-on-6", "£15,000"],
      ["Representative APR", "9.9%"],
      ["Term", "36 months"],
      ["Monthly payment", fmtMoney(calcMonthly(15000, 9.9, 36))],
      ["Total repayable", fmtMoney(calcMonthly(15000, 9.9, 36) * 36)],
      ["Total interest", fmtMoney(calcMonthly(15000, 9.9, 36) * 36 - 15000)],
    ],
    answerBlock:
      "The All-on-6 finance calculator estimates monthly repayments for All-on-6 full-arch dental implant treatment. Compare payment plans and total costs across different APR and term combinations.",
    description: "Calculate monthly finance payments for All-on-6 dental implants. Compare APR and term options for single arch or full-mouth All-on-6 treatment costs.",
    sections: [
      {
        heading: "What is All-on-6 dental treatment?",
        body: "All-on-6 is a full-arch implant procedure using six implants per arch to support a fixed bridge. The additional implants compared to All-on-4 can provide greater load distribution and stability, particularly beneficial for patients with sufficient bone volume.",
      },
      {
        heading: "All-on-6 costs in the UK",
        body: "All-on-6 treatment typically costs £12,000–£20,000 per arch in the UK, depending on the clinic and included components. Full mouth treatment can range from £25,000 to £40,000. Complexity, bone graft requirements, and implant brand affect final pricing.",
      },
      {
        heading: "Financing All-on-6 treatment",
        body: "Given the high treatment costs, most All-on-6 patients use finance to spread payments over 36–60 months. Some UK clinics offer promotional 0% APR for shorter terms. Always obtain a formal representative example and confirm total repayable before signing.",
      },
      {
        heading: "All-on-6 vs All-on-4: which to choose?",
        body: "All-on-4 uses fewer implants and is generally lower cost. All-on-6 may be recommended when more implant support is clinically beneficial. The decision should be made with your implantologist based on bone structure, overall health, and treatment goals.",
      },
    ],
    faqs: [
      { question: "How much does All-on-6 cost per month?", answer: "A single arch All-on-6 at £15,000 financed over 36 months at 9.9% APR costs approximately £481 per month with a total repayable of around £17,292. At 0% APR over 24 months it would be £625 per month." },
      { question: "Is All-on-6 available on finance?", answer: "Yes. Most UK clinics offering All-on-6 work with regulated lender partners to provide monthly payment options. Subject to affordability checks and lender eligibility criteria." },
      { question: "What does All-on-6 treatment include?", answer: "Typical All-on-6 inclusions are consultation, CT scan, six implant placements, temporary bridge, final fixed bridge, and initial aftercare reviews. Confirm inclusions with your clinic — bone grafting and other additional procedures may increase the total cost." },
      { question: "How does All-on-6 compare to All-on-4 in terms of cost?", answer: "All-on-6 typically costs £2,000–£5,000 more per arch than All-on-4 due to the additional implants and materials. Both can be financed over similar terms through clinic-arranged lender plans." },
      { question: "Can I get All-on-6 with bad credit?", answer: "Some lenders assess a wider range of credit profiles, but higher-cost procedures like All-on-6 may require strong affordability evidence. Alternative products with higher APRs may be offered if standard eligibility is not met." },
    ],
  },

  "implant-finance-calculator": {
    calculatorConfig: { defaultAmount: 3000, defaultApr: 0, defaultTerm: 24 },
    scenarios: [
      buildScenarioRow("Single implant at 0%", 3000, 0, 24),
      buildScenarioRow("Single implant at 9.9%", 3000, 9.9, 24),
      buildScenarioRow("Two implants at 0%", 6000, 0, 24),
      buildScenarioRow("Three implants at 9.9%", 9000, 9.9, 36),
    ],
    aprExamples: [
      buildAprRow(3000, 0, 24, "0% APR, 24 months"),
      buildAprRow(3000, 9.9, 24, "9.9% APR, 24 months"),
      buildAprRow(3000, 9.9, 36, "9.9% APR, 36 months"),
      buildAprRow(3000, 12.9, 48, "12.9% APR, 48 months"),
    ],
    savingsExample: {
      description: "A single implant at £3,000: 0% APR over 24 months versus 9.9% APR saves approximately £321 in total interest.",
      zeroAprMonthly: fmtMoney(calcMonthly(3000, 0, 24)),
      zeroAprTotal: fmtMoney(3000),
      repAprLabel: "9.9% APR",
      repAprMonthly: fmtMoney(calcMonthly(3000, 9.9, 24)),
      repAprTotal: fmtMoney(calcMonthly(3000, 9.9, 24) * 24),
      saving: fmtMoney(calcMonthly(3000, 9.9, 24) * 24 - 3000),
    },
    keyTakeaways: [
      "Implant finance spreads treatment costs into manageable monthly payments.",
      "0% APR plans offer the most cost-effective repayment where available.",
      "Compare total repayable across term lengths before committing.",
      "Confirm implant warranty and aftercare before signing any finance agreement.",
    ],
    summaryRows: [
      ["Example: single implant", "£3,000"],
      ["Term", "24 months"],
      ["0% APR monthly", fmtMoney(calcMonthly(3000, 0, 24))],
      ["9.9% APR monthly", fmtMoney(calcMonthly(3000, 9.9, 24))],
    ],
    answerBlock:
      "The implant finance calculator helps you estimate monthly repayments for single or multiple dental implants based on loan amount, APR, and repayment term.",
    description: "Estimate monthly payments for dental implant finance. Enter the implant cost, APR, and term to compare repayment options for single and multiple implants.",
    sections: [
      {
        heading: "Financing dental implants",
        body: "Dental implant finance plans are regulated credit agreements that let patients spread the cost of implant treatment over fixed monthly payments. Most UK implant clinics partner with FCA-regulated lenders.",
      },
      {
        heading: "Comparing implant finance options",
        body: "Use the calculator above to compare 0% APR against representative APR plans for your implant cost. Shorter terms at 0% APR offer the lowest total cost. Longer terms reduce monthly payments but increase total interest paid.",
      },
    ],
    faqs: [
      { question: "What is the monthly cost of dental implant finance?", answer: "A single implant at £3,000 over 24 months at 0% APR would be approximately £125 per month. Rates and terms vary by lender and individual eligibility." },
      { question: "Is 0% implant finance widely available?", answer: "Many UK implant clinics offer 0% promotional finance for shorter terms. Longer terms or higher-cost treatments typically use interest-bearing products." },
      { question: "How long can I finance dental implants for?", answer: "Finance terms for dental implants typically range from 12 to 60 months. The maximum available term depends on the lender and total treatment value." },
    ],
  },

  "veneer-finance-calculator": {
    calculatorConfig: { defaultAmount: 4200, defaultApr: 0, defaultTerm: 24 },
    scenarios: [
      buildScenarioRow("6 porcelain veneers at 0%", 4200, 0, 24),
      buildScenarioRow("6 porcelain veneers at 9.9%", 4200, 9.9, 24),
      buildScenarioRow("8 porcelain veneers at 0%", 5600, 0, 24),
      buildScenarioRow("10 porcelain veneers at 9.9%", 7000, 9.9, 36),
    ],
    aprExamples: [
      buildAprRow(4200, 0, 24, "0% APR, 24 months"),
      buildAprRow(4200, 9.9, 24, "9.9% APR, 24 months"),
      buildAprRow(4200, 9.9, 36, "9.9% APR, 36 months"),
      buildAprRow(4200, 12.9, 48, "12.9% APR, 48 months"),
    ],
    savingsExample: {
      description: "6 porcelain veneers at £4,200: choosing 0% APR over 24 months versus 9.9% APR saves approximately £449 in total interest.",
      zeroAprMonthly: fmtMoney(calcMonthly(4200, 0, 24)),
      zeroAprTotal: fmtMoney(4200),
      repAprLabel: "9.9% APR",
      repAprMonthly: fmtMoney(calcMonthly(4200, 9.9, 24)),
      repAprTotal: fmtMoney(calcMonthly(4200, 9.9, 24) * 24),
      saving: fmtMoney(calcMonthly(4200, 9.9, 24) * 24 - 4200),
    },
    keyTakeaways: [
      "Veneer finance spreads porcelain or composite veneer costs monthly.",
      "0% APR is often available for 12 or 24-month veneer plans.",
      "Compare total repayable to understand the true cost of longer terms.",
      "Confirm all consultations and adjustments are included in the quoted price.",
    ],
    summaryRows: [
      ["Example: 6 porcelain veneers", "£4,200"],
      ["Term", "24 months"],
      ["0% APR monthly", fmtMoney(calcMonthly(4200, 0, 24))],
      ["9.9% APR monthly", fmtMoney(calcMonthly(4200, 9.9, 24))],
    ],
    answerBlock:
      "The veneer finance calculator estimates monthly repayments for composite or porcelain veneer treatment based on your total cost, APR, and chosen repayment term.",
    description: "Calculate monthly finance payments for dental veneers. Enter veneer treatment cost, APR, and term length to estimate repayments for composite or porcelain veneers.",
    sections: [
      {
        heading: "Financing dental veneers",
        body: "Veneer finance lets patients spread the cost of composite or porcelain veneers over monthly payments. Most UK cosmetic dental clinics offer regulated lender-backed plans from 12 to 60 months.",
      },
      {
        heading: "Comparing 0% vs representative APR for veneers",
        body: "Where 0% APR is available, it offers the most cost-effective repayment — you pay back exactly what you borrow. Representative APR plans increase total cost but may offer longer repayment terms for higher-cost veneer sets.",
      },
    ],
    faqs: [
      { question: "Can I finance veneers on a monthly plan?", answer: "Yes. Most UK cosmetic clinics offer veneer finance through regulated lenders. Subject to eligibility and affordability checks." },
      { question: "What is the monthly cost of financing 6 porcelain veneers?", answer: "6 porcelain veneers at £4,200 over 24 months at 0% APR costs approximately £175 per month. At 9.9% APR it is around £194 per month." },
      { question: "Is 0% finance available for veneers?", answer: "Many clinics offer 0% promotional rates for 12 or 24-month veneer plans. Longer terms or higher-cost sets may require interest-bearing products." },
    ],
  },
};

// All sub-calculator slugs for the hub page
export const calculatorHubLinks = [
  { href: "/0-percent-finance-calculator", label: "0% Finance Calculator", description: "Estimate monthly payments with zero interest on a promotional 0% APR dental plan." },
  { href: "/dental-loan-calculator", label: "Dental Loan Calculator", description: "Calculate repayments on interest-bearing dental loans across a range of APR rates." },
  { href: "/monthly-payment-calculator", label: "Monthly Payment Calculator", description: "Find the right monthly payment by adjusting loan amount, APR, and term length." },
  { href: "/veneer-cost-calculator", label: "Veneer Cost Calculator", description: "Estimate monthly finance payments for composite or porcelain veneer treatment." },
  { href: "/implant-cost-calculator", label: "Implant Cost Calculator", description: "Compare monthly payment options for single implants, multiple implants, and full arches." },
  { href: "/all-on-4-finance-calculator", label: "All-on-4 Finance Calculator", description: "Calculate monthly repayments for All-on-4 full-arch dental implant treatment." },
  { href: "/all-on-6-finance-calculator", label: "All-on-6 Finance Calculator", description: "Estimate monthly costs for All-on-6 implant procedures across different term lengths." },
];

function getMonthlyExamples(costBase) {
  return [
    {
      label: "12 month 0% example",
      treatmentCost: toCurrency(costBase),
      apr: "0% APR",
      monthly: toCurrency(Math.round(costBase / 12)),
      totalRepayable: toCurrency(costBase),
    },
    {
      label: "24 month representative example",
      treatmentCost: toCurrency(costBase),
      apr: "9.9% APR",
      monthly: toCurrency(Math.round((costBase * 1.1) / 24)),
      totalRepayable: toCurrency(Math.round(costBase * 1.1)),
    },
    {
      label: "36 month representative example",
      treatmentCost: toCurrency(costBase),
      apr: "12.9% APR",
      monthly: toCurrency(Math.round((costBase * 1.2) / 36)),
      totalRepayable: toCurrency(Math.round(costBase * 1.2)),
    },
  ];
}

function buildCityPage(city, service) {
  const slug = `${service.slugPrefix}-${city.slug}`;
  const title = `${service.titlePrefix} ${city.name}`;
  const monthlyExamples = getMonthlyExamples(service.costBase);

  return [
    slug,
    {
      slug,
      title,
      type: "city",
      cityName: city.name,
      serviceType: service.titlePrefix,
      description: `Compare ${service.titlePrefix.toLowerCase()} in ${city.name} with local monthly payment examples, eligibility guidance, and lender-focused options for UK patients.`,
      answerBlock: `${service.titlePrefix} in ${city.name} can help spread ${service.treatmentLabel} costs into fixed monthly instalments. Compare APR, total repayable amount, and clinic-lender support before applying.`,
      localIntroduction: `This ${city.name}-focused guide targets long-tail queries such as "${service.slugPrefix} ${city.slug}", "${service.slugPrefix} monthly payments ${city.slug}", and "${service.slugPrefix} bad credit ${city.slug}" so patients can compare options faster.`,
      keyTakeaways: [
        `${city.name} clinics may offer both 0% and representative APR plans depending on term and eligibility.`,
        "Total repayable can vary significantly by APR and repayment duration.",
        "Compare lender checks, deposit rules, and early-settlement terms before agreeing.",
        "Use calculators and treatment-specific pages before submitting any application.",
      ],
      summaryRows: [
        ["City", city.name],
        ["Treatment focus", service.treatmentLabel],
        ["Common terms", "6 to 60 months"],
        ["Availability", "0% promotional and representative APR plans"],
      ],
      monthlyExamples,
      comparisonRows: [
        ["0% short term", "Lower monthly terms, no interest", "Higher monthly outlay"],
        ["Representative APR plans", "Longer term flexibility", "Higher total repayable amount"],
        ["Clinic-arranged finance", "Streamlined treatment journey", "Lender panel may be limited"],
      ],
      longTailQueries: [
        `${service.slugPrefix} ${city.slug}`,
        `${service.slugPrefix} monthly payments ${city.slug}`,
        `${service.slugPrefix} bad credit ${city.slug}`,
        `${service.slugPrefix} 0 percent ${city.slug}`,
      ],
      sections: [
        {
          heading: `${city.name} local finance overview`,
          body: `Patients in ${city.name} typically compare treatment timeline, deposit requirements, and repayment flexibility before choosing ${service.titlePrefix.toLowerCase()} options.`,
        },
        {
          heading: "Eligibility and approval checks",
          body: "Most lenders assess residency, affordability, and credit profile. Some pathways may start with soft checks, followed by full checks before agreement.",
        },
        {
          heading: "How to compare local options",
          body: `Ask clinics for representative examples, total repayable values, and written terms. Compare at least two offers before selecting a ${service.titlePrefix.toLowerCase()} route.`,
        },
      ],
      faqs: [
        {
          question: `Can I get ${service.titlePrefix.toLowerCase()} in ${city.name} with monthly payments?`,
          answer: `Yes, many clinics in ${city.name} provide lender-backed monthly plans. Terms and APR depend on provider criteria and affordability checks.`,
        },
        {
          question: `Is 0% ${service.titlePrefix.toLowerCase()} available in ${city.name}?`,
          answer:
            "Some clinics offer 0% promotional terms for selected repayment durations. Longer terms may use interest-bearing agreements.",
        },
        {
          question: `Can bad-credit applicants in ${city.name} apply for ${service.titlePrefix.toLowerCase()}?`,
          answer:
            "Some providers assess wider credit profiles, but acceptance and pricing vary. Always review total repayable and repayment risk.",
        },
        {
          question: `What should I compare before choosing a ${service.titlePrefix.toLowerCase()} plan?`,
          answer:
            "Compare APR, total repayable, monthly amount, late-fee policy, and early-settlement terms alongside treatment quality and aftercare.",
        },
      ],
      localLinks: [
        { href: "/finance-calculator", label: "Finance Calculator" },
        { href: "/dental-finance-uk", label: "Dental Finance UK" },
        { href: "/dental-implants-finance", label: "Dental Implants Finance" },
        { href: "/veneers-finance", label: "Veneers Finance" },
      ],
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
    },
  ];
}

const cityPageEntries = cityCatalog.flatMap((city) =>
  cityServiceConfigs.map((service) => buildCityPage(city, service))
);

const basePageEntries = allPages.map(([slug, title, type]) => {
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
      const specific = calculatorData[slug] ?? {};
      return [
        slug,
        {
          ...base,
          answerBlock:
            specific.answerBlock ??
            "Use this calculator to estimate likely monthly dental finance repayments for UK treatment budgets and repayment terms.",
          description:
            specific.description ??
            `UK-focused guidance on ${title.toLowerCase()}, affordability, eligibility, and monthly repayment examples.`,
          keyTakeaways: specific.keyTakeaways ?? base.keyTakeaways,
          summaryRows: specific.summaryRows ?? base.summaryRows,
          sections: specific.sections ?? [
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
          faqs: specific.faqs ?? base.faqs,
          calculatorConfig: specific.calculatorConfig ?? { defaultAmount: 3000, defaultApr: 0, defaultTerm: 24 },
          scenarios: specific.scenarios ?? [],
          aprExamples: specific.aprExamples ?? [],
          savingsExample: specific.savingsExample ?? null,
        },
      ];
    }

    if (type === "calculator-hub") {
      return [
        slug,
        {
          ...base,
          type: "calculator-hub",
          title: "Finance Calculator Hub",
          description:
            "Free UK dental finance calculators: estimate monthly payments for implants, veneers, All-on-4, All-on-6, and 0% APR plans. Shareable results and APR comparison tables.",
          answerBlock:
            "Choose a specialist dental finance calculator below to estimate monthly repayments, compare APR options, and view example scenarios for your treatment.",
          keyTakeaways: [
            "Seven specialist calculators covering 0%, loans, implants, veneers, All-on-4, and All-on-6.",
            "Shareable URLs let you save or send your estimate.",
            "APR comparison tables show the true cost across different rates.",
            "All results are indicative — confirm with your lender before applying.",
          ],
          summaryRows: [
            ["Calculators available", "7 specialist tools"],
            ["Typical loan range", "£500 to £35,000"],
            ["Term options", "6 to 60 months"],
            ["0% APR", "Available on selected promotional plans"],
          ],
          sections: [
            {
              heading: "How our dental finance calculators work",
              body:
                "Each calculator uses the standard loan amortisation formula: at 0% APR monthly payment equals loan amount divided by term. At any other APR, interest is distributed across each monthly payment. Figures are estimates and do not represent a formal credit offer.",
            },
            {
              heading: "What do the APR comparison tables show?",
              body:
                "Each calculator includes an APR comparison table showing monthly payment, total repayable, and total interest for the same loan amount at different APRs. This helps you assess the cost impact of choosing a 0% plan versus a representative APR product.",
            },
            {
              heading: "How shareable URLs work",
              body:
                "When you adjust the calculator inputs, the URL updates automatically with your chosen amount, APR, and term as query parameters. Copy and share the URL to send your estimate to a partner, friend, or clinic.",
            },
            {
              heading: "Are calculator results accurate?",
              body:
                "Calculator outputs are indicative estimates based on standard loan mathematics. Actual lender offers will reflect individual credit assessments, arrangement fees, and specific product terms. Always obtain a formal representative example from your lender before agreeing to any credit product.",
            },
          ],
          faqs: [
            { question: "Which dental finance calculator should I use?", answer: "Choose the calculator that matches your treatment: implant cost calculator for implants, veneer cost calculator for veneers, All-on-4 or All-on-6 calculators for full-arch procedures, and 0% finance calculator to estimate interest-free plans." },
            { question: "Are the calculator results accurate?", answer: "Results are indicative estimates based on the standard amortisation formula. Actual offers from lenders will differ based on your credit profile, product fees, and specific lender terms. Always obtain a formal quote before applying." },
            { question: "Can I share my calculator result?", answer: "Yes. After adjusting the inputs on any calculator page, the URL updates with your selected parameters. Copy the URL from your browser address bar to share your specific calculation." },
            { question: "Do calculator results affect my credit score?", answer: "No. The calculators are informational tools only. No credit check is performed when using any calculator on this site." },
            { question: "What is APR?", answer: "APR (Annual Percentage Rate) is the annual cost of borrowing, including interest and any compulsory fees. A lower APR means less total cost. 0% APR means no interest is charged for the promotional term." },
          ],
          author: "DentalFinanceUK Editorial Team",
          reviewer: "Dr Emily Carter, GDC-Registered Dentist",
          references: base.references,
          disclaimer: base.disclaimer,
          lastUpdated: "2026-05-29",
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
  });

export const pageMap = Object.fromEntries([...basePageEntries, ...cityPageEntries]);

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
