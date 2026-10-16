// Core commercial and trust pages that previously used the generic base template.
// Each page here has its own search intent and does not repeat the others:
//  - dental-finance-uk              overview of the whole topic (hub)
//  - dental-payment-plans           the routes: practice plan vs lender finance vs alternatives
//  - dental-monthly-payments        the numbers: what term, deposit and rate do to a monthly figure
//  - dental-finance-calculator      how the maths works and how to use a calculator
//  - 0-percent-dental-finance       what "0%" means and where the catches are
//  - dental-treatment-finance       which treatments are usually financed and how
//  - dental-implants-finance        implant-specific costs, staging and repayments
//  - veneers-finance                veneer-specific costs and repayments
//  - cosmetic-dentistry-finance     cosmetic-specific eligibility and costs
// All money figures are illustrative planning examples calculated with
// calculateMonthlyPayment(); they are not quotes or lender offers.
import { calculateMonthlyPayment, formatGbp } from "./financeCalc.js";

const LAST_UPDATED = "2026-10-16";

const REFERENCES = [
  "Financial Conduct Authority: consumer credit rules (CONC) and guidance for borrowers",
  "MoneyHelper: guides to borrowing, credit scores and credit checks",
  "NHS: NHS dental charges and what NHS dental treatment covers",
  "Financial Ombudsman Service: complaints about consumer credit",
  "Credit reference agencies (Experian, Equifax, TransUnion): how credit checks and searches work",
];

const DISCLAIMER =
  "Dental Finance UK is an independent information website. We are not a lender or credit broker, we are not authorised by the FCA, and we do not arrange or recommend credit. Figures are illustrative examples, not quotes. Finance is subject to status, eligibility, affordability and lender approval.";

const L = {
  home: { href: "/dental-finance-uk", label: "Dental Finance UK Overview" },
  plans: { href: "/dental-payment-plans", label: "Dental Payment Plans" },
  monthly: { href: "/dental-monthly-payments", label: "Dental Monthly Payments" },
  calcHub: { href: "/finance-calculator", label: "Finance Calculator" },
  calcGuide: { href: "/dental-finance-calculator", label: "How Dental Finance Calculators Work" },
  zero: { href: "/0-percent-dental-finance", label: "0% Dental Finance" },
  zeroHow: { href: "/how-0-percent-dental-finance-works", label: "How 0% Dental Finance Works" },
  treatment: { href: "/dental-treatment-finance", label: "Dental Treatment Finance" },
  implants: { href: "/dental-implants-finance", label: "Dental Implants Finance" },
  veneers: { href: "/veneers-finance", label: "Veneers Finance" },
  cosmetic: { href: "/cosmetic-dentistry-finance", label: "Cosmetic Dentistry Finance" },
  badCredit: { href: "/bad-credit-dental-finance", label: "Bad Credit Dental Finance" },
  eligibility: { href: "/dental-finance-eligibility", label: "Dental Finance Eligibility" },
  providers: { href: "/finance-providers", label: "Finance Providers Hub" },
  turkey: { href: "/turkey-teeth-finance", label: "Turkey Teeth Finance" },
  explained: { href: "/dental-finance-explained-uk-guide-paying-monthly", label: "Dental Finance Explained" },
  worth: { href: "/is-dental-finance-worth-it", label: "Is Dental Finance Worth It?" },
  vsCard: { href: "/dental-finance-vs-credit-card", label: "Dental Finance vs Credit Card" },
  vsLoan: { href: "/dental-finance-vs-loan", label: "Dental Finance vs Loan" },
  vsBnpl: { href: "/dental-finance-vs-buy-now-pay-later", label: "Dental Finance vs Buy Now Pay Later" },
  method: { href: "/cost-and-calculator-methodology", label: "Cost and Calculator Methodology" },
  disclosure: { href: "/financial-disclosure", label: "Financial Disclosure" },
  implantPayments: { href: "/dental-implants-monthly-payments", label: "Dental Implants Monthly Payments" },
  veneerPayments: { href: "/veneers-monthly-payments", label: "Veneers Monthly Payments" },
  crownPayments: { href: "/dental-crowns-monthly-payments", label: "Dental Crowns Monthly Payments" },
  implantCalc: { href: "/implant-finance-calculator", label: "Implant Finance Calculator" },
  veneerCalc: { href: "/veneer-finance-calculator", label: "Veneer Finance Calculator" },
  contact: { href: "/contact", label: "Contact" },
};

// Calculation helpers -----------------------------------------------------------

function monthly(amount, term, apr = 0, deposit = 0) {
  return calculateMonthlyPayment({ totalCost: amount, depositAmount: deposit, termMonths: term, apr }).monthlyPayment;
}

function totalInterest(amount, term, apr = 0, deposit = 0) {
  return calculateMonthlyPayment({ totalCost: amount, depositAmount: deposit, termMonths: term, apr }).totalInterest;
}

function repaymentRows(amounts, terms, apr) {
  return amounts.map((amount) => [formatGbp(amount, 0), ...terms.map((term) => formatGbp(monthly(amount, term, apr)))]);
}

function section(heading, paragraphs, items) {
  return { heading, ...(paragraphs?.length ? { paragraphs } : {}), ...(items?.length ? { items } : {}) };
}

function page(config) {
  return [
    config.slug,
    {
      type: "article",
      references: REFERENCES,
      disclaimer: DISCLAIMER,
      lastUpdated: LAST_UPDATED,
      ...config,
    },
  ];
}

// Shared illustrative figures
const CITIES = [
  ["London", "london"],
  ["Manchester", "manchester"],
  ["Birmingham", "birmingham"],
  ["Leeds", "leeds"],
  ["Liverpool", "liverpool"],
  ["Glasgow", "glasgow"],
];

function localSection(heading, prefix, label) {
  return section(heading, ["Local guides with illustrative costs and payment examples:"], CITIES.map(([name, key]) => ({ text: `${label} in ${name}`, href: `/${prefix}-${key}` })));
}

const TERMS = [12, 24, 36];
const AMOUNTS = [1500, 3000, 6000];
const A3000 = 3000;

// Pages -----------------------------------------------------------------------

const dentalFinanceUk = page({
  slug: "dental-finance-uk",
  title: "Dental Finance UK: How It Works, Costs and Options",
  description:
    "A plain-English guide to dental finance in the UK: how monthly payment plans work, what they cost, how credit checks apply and how to compare your options.",
  answerBlock:
    "Dental finance lets you spread the cost of private dental treatment into monthly payments, usually through a payment plan arranged by your dental practice or a separate regulated lender. The total you repay depends on the interest rate, the term and any deposit, so compare the total repayable, not just the monthly figure.",
  keyTakeaways: [
    "Most plans run from about 6 to 60 months; shorter terms cost less in total.",
    "Some clinics offer 0% plans on selected terms; others use interest-bearing credit.",
    "Lenders must assess affordability, and most applications involve a credit check.",
    "Dental Finance UK is an information site: we do not lend, broker or approve finance.",
  ],
  summaryRows: [
    ["What it is", "Spreading the cost of private dental treatment into monthly payments"],
    ["Who provides it", "Dental practices (own plans) and regulated lenders working with practices"],
    ["Typical terms", "Often 6 to 60 months, depending on lender and treatment cost"],
    ["Cost", "0% on some promotional terms; otherwise interest, shown as a representative APR"],
    ["Illustration", `${formatGbp(A3000, 0)} over 24 months: ${formatGbp(monthly(A3000, 24))} a month at 0%, ${formatGbp(monthly(A3000, 24, 9.9))} at 9.9% APR`],
  ],
  featureTable: {
    title: "Ways to pay for private dental treatment",
    description: "A high-level comparison. Terms vary by provider; always read the agreement.",
    headers: ["Route", "How it works", "Main things to check"],
    rows: [
      ["Practice payment plan", "The practice lets you pay in instalments, often interest-free over a short term", "Who is the creditor, what happens if treatment changes, any admin fees"],
      ["Third-party dental finance", "A regulated lender funds the treatment and you repay the lender monthly", "Representative APR, total repayable, credit search type, early repayment"],
      ["Personal loan", "You borrow a lump sum and pay the clinic yourself", "APR for your circumstances, fees, flexibility to overpay"],
      ["Credit card", "You pay by card and repay over time", "Interest if not cleared, protection under Section 75 on eligible purchases"],
      ["Savings or staged payments", "You pay as treatment progresses", "Whether the clinic allows staging; no interest but less flexibility"],
    ],
  },
  costTable: {
    title: "Illustrative repayments (no deposit)",
    description: "Monthly payment for common amounts and terms at 0% and at an example 9.9% APR. Illustrative only; see our methodology.",
    headers: ["Treatment cost", "12 months at 0%", "24 months at 0%", "36 months at 0%", "12 months at 9.9%", "24 months at 9.9%", "36 months at 9.9%"],
    rows: AMOUNTS.map((amount) => [
      formatGbp(amount, 0),
      ...TERMS.map((term) => formatGbp(monthly(amount, term))),
      ...TERMS.map((term) => formatGbp(monthly(amount, term, 9.9))),
    ]),
  },
  sections: [
    section("How dental finance works", [
      "You agree a treatment plan and written quote with your dentist. If you want to pay monthly, the practice either offers its own instalment plan or introduces a lender that offers finance for dental treatment.",
      "If a lender is involved, you apply, usually online or at the practice. The lender checks your identity, income, outgoings and credit file, then decides whether to lend. If approved, you sign an agreement and repay monthly over the agreed term.",
    ]),
    section("What it costs", [
      "The cost of credit is shown as an APR (annual percentage rate), which includes interest and compulsory fees. A 0% plan means you repay only the treatment cost over the promotional term. Longer terms or higher-risk applications are more likely to carry interest.",
      "A lower monthly payment usually means a longer term and more interest overall. The table above shows how term and rate change the monthly figure for the same treatment cost.",
    ]),
    section("Credit checks and eligibility", [
      "Regulated lenders must assess whether you can afford the repayments. Many use a soft search first, which does not leave a visible mark that other lenders can see, and then a hard search when you formally apply, which does. Providers differ, so ask which type is used before you consent.",
      "Eligibility depends on the lender, your income, existing debts and credit history, and the size of the loan. No lender can responsibly guarantee approval in advance.",
    ], [
      { text: "What lenders typically check", href: "/dental-finance-eligibility" },
      { text: "Dental finance with bad credit", href: "/bad-credit-dental-finance" },
    ]),
    section("Before you sign", null, [
      "Get a written, itemised treatment quote first.",
      "Check the total repayable, the representative APR and any fees, not only the monthly payment.",
      "Ask who the lender is and whether they are authorised by the FCA (you can check the FCA Register).",
      "Check your rights: regulated credit usually gives a right to withdraw within 14 days and to settle early. Confirm in your agreement.",
      "Only borrow what you can comfortably repay. Late payments can lead to fees and harm your credit file.",
    ]),
    localSection("Dental finance by city", "dental-finance", "Dental finance"),
    section("Explore by need", null, [
      { text: "Compare payment plan types", href: "/dental-payment-plans" },
      { text: "See monthly payment examples", href: "/dental-monthly-payments" },
      { text: "Use a calculator for your own numbers", href: "/finance-calculator" },
      { text: "Understand 0% finance", href: "/0-percent-dental-finance" },
      { text: "Finance for implants", href: "/dental-implants-finance" },
      { text: "Finance for veneers", href: "/veneers-finance" },
      { text: "Compare finance providers", href: "/finance-providers" },
    ]),
  ],
  faqs: [
    { question: "What is dental finance?", answer: "Dental finance is a way to pay for private dental treatment in monthly instalments, either through a payment plan offered by the practice or through credit from a separate lender. It does not reduce the treatment price; it spreads when you pay." },
    { question: "Is dental finance a loan?", answer: "Often yes. Third-party dental finance is usually a regulated credit agreement with a lender. Some practice plans are interest-free instalments agreed with the practice. Read the agreement to see who the creditor is." },
    { question: "Does dental finance affect my credit score?", answer: "A formal application normally involves a credit search that is recorded on your file, and the agreement itself may be reported. Missing payments can lower your score; paying on time can support it. A soft search does not leave a visible mark for other lenders." },
    { question: "Can I get dental finance with bad credit?", answer: "Some lenders consider applicants with imperfect credit, but approval is never guaranteed and the rate may be higher or a larger deposit may be requested. See our bad credit guide for what to check first." },
    { question: "Is there a legal right to cancel dental finance?", answer: "Regulated credit agreements usually include a 14-day right to withdraw, and you generally have the right to repay early. Check your own agreement for the exact terms and any early settlement charges." },
  ],
  internalLinks: [L.plans, L.monthly, L.calcHub, L.zero, L.badCredit, L.implants, L.veneers, L.providers, L.method],
});

const dentalPaymentPlans = page({
  slug: "dental-payment-plans",
  title: "Dental Payment Plans UK: Types, Costs and How to Compare",
  description:
    "Compare UK dental payment plans: practice instalment plans, lender-backed dental finance, loans and credit cards, with worked examples and what to check before you sign.",
  answerBlock:
    "A dental payment plan spreads the cost of treatment over monthly payments. In the UK you will usually meet three types: an interest-free plan run by the practice, finance from a regulated lender, or borrowing you arrange yourself. Compare who you owe, the total repayable and what happens if treatment changes.",
  keyTakeaways: [
    "Who you owe matters: the practice, a lender or your own loan or card provider.",
    "A 0% plan usually has a short term and sometimes a deposit.",
    "Monthly membership plans for routine care are different from plans that spread a treatment cost.",
    "Always compare total repayable and read what happens if you stop treatment early.",
  ],
  summaryRows: [
    ["Practice plan", "Instalments agreed with the practice, often interest-free over a short term"],
    ["Lender finance", "Regulated credit arranged at the practice, repaid to the lender"],
    ["Self-arranged", "Personal loan or credit card, paid to the clinic by you"],
    ["Key figure", "Total repayable, not the monthly payment"],
  ],
  featureTable: {
    title: "Types of dental payment plan compared",
    description: "General features only. Each provider sets its own terms.",
    headers: ["Type", "Who you owe", "Typical cost", "Best when", "Watch for"],
    rows: [
      ["Practice instalment plan", "The practice", "Often 0% over a short term", "You can repay quickly and want no credit agreement", "Payments may be tied to treatment stages; refunds if plans change"],
      ["Lender-backed dental finance", "A regulated lender", "0% promotions or an APR", "You need a longer term or a larger sum", "Credit search, representative APR, early repayment terms"],
      ["Personal loan", "The loan provider", "A fixed APR set by your credit profile", "You want to compare offers outside the practice", "Arrangement fees, you must manage payment to the clinic"],
      ["Credit card", "The card issuer", "0% intro offers or a high APR", "You can clear the balance within any 0% period", "High interest afterwards; check Section 75 protection"],
      ["Membership plan", "The plan provider", "A fixed monthly fee", "You want routine care spread monthly", "Usually not designed for large treatment such as implants"],
    ],
  },
  costTable: {
    title: "Same treatment, different plans",
    description: "A £3,000 treatment over 12 or 24 months, illustrative only.",
    headers: ["Plan", "Term", "APR", "Monthly payment", "Total repayable", "Interest"],
    rows: [
      ["Interest-free practice plan", "12 months", "0%", formatGbp(monthly(3000, 12)), formatGbp(3000), formatGbp(0)],
      ["Interest-free practice plan", "24 months", "0%", formatGbp(monthly(3000, 24)), formatGbp(3000), formatGbp(0)],
      ["Lender finance (example)", "24 months", "9.9%", formatGbp(monthly(3000, 24, 9.9)), formatGbp(monthly(3000, 24, 9.9) * 24), formatGbp(totalInterest(3000, 24, 9.9))],
      ["Lender finance (example)", "36 months", "9.9%", formatGbp(monthly(3000, 36, 9.9)), formatGbp(monthly(3000, 36, 9.9) * 36), formatGbp(totalInterest(3000, 36, 9.9))],
    ],
  },
  sections: [
    section("What to ask before choosing a plan", null, [
      "Who is the lender or creditor, and are they authorised by the FCA?",
      "What is the total repayable and the representative APR?",
      "Is a deposit required and is it refundable if treatment changes?",
      "Is the credit search soft or hard, and when?",
      "What happens to the plan if you stop treatment or the plan changes?",
      "Can you repay early and are there charges?",
    ]),
    section("Practice plans versus lender finance", [
      "A practice plan is usually simpler but is limited by what the practice is willing to offer and for how long. Lender finance can fund larger treatment over a longer term but is a regulated credit agreement, so it involves a credit assessment and can carry interest.",
      "Neither is automatically cheaper. A 0% plan over a short term is cheapest in total, but only if the monthly payment is affordable.",
    ]),
    section("Matching the plan to the treatment", [
      "Smaller, one-visit treatments are often paid in full or on a short practice plan. Staged treatments such as implants usually involve several payments tied to milestones, and a lender may fund the whole plan up front.",
    ], [
      { text: "Implant payment examples", href: "/dental-implants-monthly-payments" },
      { text: "Veneer payment examples", href: "/veneers-monthly-payments" },
      { text: "Crown payment examples", href: "/dental-crowns-monthly-payments" },
    ]),
  ],
  faqs: [
    { question: "Are dental payment plans interest-free?", answer: "Some are, usually over a short term. Others carry interest and show a representative APR. Check the total repayable before you agree." },
    { question: "Is a dental membership plan the same as a payment plan?", answer: "No. Membership plans spread the cost of routine check-ups and care through a monthly fee. Payment plans spread the cost of a specific treatment." },
    { question: "Can I change my payment plan if my treatment changes?", answer: "It depends on the agreement. Ask what happens to payments and any deposit if the plan changes, and get the answer in writing." },
    { question: "Do dental payment plans affect my credit score?", answer: "Practice plans without credit checks usually do not. Lender-backed finance normally involves a credit search and may be reported to credit reference agencies." },
  ],
  internalLinks: [L.home, L.monthly, L.zero, L.calcHub, L.vsCard, L.vsLoan, L.vsBnpl, L.providers],
});

const dentalMonthlyPayments = page({
  slug: "dental-monthly-payments",
  title: "Dental Monthly Payments: What You Could Pay Each Month",
  description:
    "See what monthly dental payments could look like for common treatment costs, terms and rates, and how deposit and term change the figure.",
  answerBlock:
    "Your monthly dental payment is mainly set by three things: the amount you finance after any deposit, the term in months and the interest rate. Doubling the term roughly halves the payment at 0% but increases the total interest on interest-bearing finance.",
  keyTakeaways: [
    "At 0%, monthly payment = amount financed divided by months.",
    "With interest, a longer term lowers the monthly figure but raises the total paid.",
    "A deposit reduces the amount you finance and therefore every monthly payment.",
    "Figures here are illustrative; use your own quote and lender illustration.",
  ],
  summaryRows: [
    ["Inputs", "Amount financed, term, APR, deposit"],
    ["0% formula", "Amount financed / number of months"],
    ["Example", `${formatGbp(3000, 0)} over 24 months: ${formatGbp(monthly(3000, 24))} at 0%, ${formatGbp(monthly(3000, 24, 9.9))} at 9.9% APR`],
    ["Deposit effect", `A ${formatGbp(500, 0)} deposit on ${formatGbp(3000, 0)} over 24 months at 0% reduces payments to ${formatGbp(monthly(3000, 24, 0, 500))}`],
  ],
  costTable: {
    title: "Monthly payment by treatment cost and term, at 0% APR",
    description: "No deposit. Illustrative only.",
    headers: ["Treatment cost", "12 months", "24 months", "36 months"],
    rows: repaymentRows([1000, 1500, 3000, 6000, 10000], TERMS, 0),
  },
  savingsTable: {
    title: "The same amounts at 9.9% APR",
    description: "An example rate used for illustration; real rates vary by lender and applicant.",
    headers: ["Treatment cost", "12 months", "24 months", "36 months"],
    rows: repaymentRows([1000, 1500, 3000, 6000, 10000], TERMS, 9.9),
  },
  sections: [
    section("How the figure is calculated", [
      "At 0% APR the monthly payment is the amount you finance divided by the number of months. With interest, lenders use a reducing-balance calculation, so each payment covers some interest and some of the original amount.",
      "Our methodology page shows the formula and the assumptions behind every example on this site.",
    ]),
    section("What changes the number", null, [
      "A longer term lowers the monthly payment but usually raises the total interest.",
      "A higher APR raises both the monthly payment and the total repayable.",
      "A deposit reduces the amount financed. A £500 deposit on a £3,000 treatment over 24 months at 0% cuts the monthly payment from " + formatGbp(monthly(3000, 24)) + " to " + formatGbp(monthly(3000, 24, 0, 500)) + ".",
      "Fees can raise the real cost; the representative APR includes compulsory fees.",
    ]),
    section("Checking affordability", [
      "A payment can look small and still be unaffordable. Before applying, list your regular income and essential outgoings, subtract existing debt repayments and check the new payment fits with some margin.",
      "If the payment feels tight, a shorter treatment plan, a larger deposit or saving for part of the cost may suit you better than a longer term.",
    ]),
  ],
  faqs: [
    { question: "How much per month is £3,000 of dental treatment?", answer: `Over 24 months at 0% it is ${formatGbp(monthly(3000, 24))} a month. At an example 9.9% APR it is ${formatGbp(monthly(3000, 24, 9.9))}. Your actual figure depends on the lender, term and any deposit.` },
    { question: "Does a longer term save money?", answer: "It lowers the monthly payment but, on interest-bearing finance, increases the total interest. On a true 0% plan the total stays the same." },
    { question: "Can I overpay or repay early?", answer: "Regulated credit generally lets you repay early, though charges may apply. Check the early repayment terms in your agreement." },
    { question: "Are these figures a quote?", answer: "No. They are illustrative examples calculated from a standard formula, not offers from a lender or clinic." },
  ],
  internalLinks: [L.plans, L.calcHub, L.calcGuide, L.method, L.implantPayments, L.veneerPayments, L.crownPayments, L.zero],
});

const dentalFinanceCalculator = page({
  slug: "dental-finance-calculator",
  title: "How Dental Finance Calculators Work and How to Use One",
  description:
    "Understand the maths behind dental finance calculators, work through an example by hand and avoid common mistakes before you use one for your own treatment.",
  answerBlock:
    "A dental finance calculator estimates your monthly payment from the amount you finance, the term and the APR. It is a planning tool, not a lender offer. This guide explains the formula, shows a worked example and points you to the calculator that fits your treatment.",
  keyTakeaways: [
    "Enter the amount you will finance after any deposit, not the full treatment cost.",
    "At 0% the maths is simple division; with interest a reducing-balance formula applies.",
    "Results are estimates: lender fees and your personal APR can change the real figure.",
    "Use the same inputs to compare terms and rates side by side.",
  ],
  summaryRows: [
    ["Inputs", "Amount financed, APR, term in months"],
    ["Outputs", "Monthly payment, total repayable, total interest"],
    ["Worked example", `${formatGbp(3000, 0)} at 9.9% APR over 24 months = ${formatGbp(monthly(3000, 24, 9.9))} a month`],
    ["Not a quote", "Only a lender can give you a personal rate and representative example"],
  ],
  costTable: {
    title: "Worked example: £3,000 at 9.9% APR over 24 months",
    description: "The same result you would get from a calculator.",
    headers: ["Step", "Value"],
    rows: [
      ["Amount financed", formatGbp(3000)],
      ["Monthly rate (APR / 12)", "0.825%"],
      ["Monthly payment", formatGbp(monthly(3000, 24, 9.9))],
      ["Total repayable (24 payments)", formatGbp(monthly(3000, 24, 9.9) * 24)],
      ["Total interest", formatGbp(totalInterest(3000, 24, 9.9))],
    ],
  },
  sections: [
    section("The formula", [
      "With interest, the monthly payment is (loan x monthly rate) / (1 - (1 + monthly rate)^-term), where the monthly rate is the APR divided by 12 and the loan is the treatment cost minus any deposit. At 0% APR the payment is simply the loan divided by the number of months.",
      "This is an approximation. Lenders may calculate interest daily or add fees, so your agreement can differ slightly from a calculator result.",
    ]),
    section("Common mistakes", null, [
      "Entering the full cost when you plan to pay a deposit.",
      "Comparing monthly payments only, without looking at total repayable.",
      "Using a 0% rate for a term the lender does not offer at 0%.",
      "Treating a calculator result as an approved offer.",
    ]),
    section("Which calculator to use", null, [
      { text: "All calculators in one place", href: "/finance-calculator" },
      { text: "Implant finance calculator", href: "/implant-finance-calculator" },
      { text: "Veneer finance calculator", href: "/veneer-finance-calculator" },
      { text: "0% finance calculator", href: "/0-percent-finance-calculator" },
      { text: "Monthly payment calculator", href: "/monthly-payment-calculator" },
      { text: "Dental loan calculator", href: "/dental-loan-calculator" },
    ]),
  ],
  faqs: [
    { question: "Are dental finance calculators accurate?", answer: "They are accurate for the inputs you enter, using a standard formula. Your actual lender figure can differ because of fees, rounding and your personal APR." },
    { question: "Does using a calculator affect my credit score?", answer: "No. Our calculators do not perform any credit check and do not collect personal data to produce a result." },
    { question: "What APR should I enter?", answer: "Use the representative APR shown in a lender's illustration if you have one. Otherwise use a few example rates to see the range, as the exact rate is only known after a lender assesses you." },
  ],
  internalLinks: [L.calcHub, L.monthly, L.method, L.zero, L.implantCalc, L.veneerCalc],
});

const zeroPercent = page({
  slug: "0-percent-dental-finance",
  title: "0% Dental Finance UK: What It Means and What to Check",
  description:
    "What 0% dental finance means in the UK, who it suits, where the catches are, and how much interest you could save compared with an interest-bearing plan.",
  answerBlock:
    "0% dental finance means you repay only the treatment cost over a promotional term, with no interest. It is usually offered on shorter terms, may need a deposit and is subject to credit approval. Check the term, what happens if you miss a payment and whether the rate changes after the offer ends.",
  keyTakeaways: [
    "On a genuine 0% plan, total repayable equals the amount financed.",
    "0% terms are often short; longer terms may carry an APR.",
    "Missed payments can end the offer or trigger fees.",
    "Being offered 0% is not guaranteed even if a clinic advertises it.",
  ],
  summaryRows: [
    ["What 0% means", "No interest on the promotional term"],
    ["Typical conditions", "Short term, possible deposit, credit approval"],
    ["Saving example", `${formatGbp(3000, 0)} over 24 months: ${formatGbp(totalInterest(3000, 24, 9.9))} interest avoided versus 9.9% APR`],
    ["Main risk", "Fees or interest if you miss payments or exceed the term"],
  ],
  costTable: {
    title: "0% versus an interest-bearing plan",
    description: "£3,000 over 24 months. Illustrative only.",
    headers: ["Plan", "Monthly payment", "Total repayable", "Interest"],
    rows: [
      ["0% promotional", formatGbp(monthly(3000, 24)), formatGbp(3000), formatGbp(0)],
      ["9.9% APR (example)", formatGbp(monthly(3000, 24, 9.9)), formatGbp(monthly(3000, 24, 9.9) * 24), formatGbp(totalInterest(3000, 24, 9.9))],
      ["14.9% APR (example)", formatGbp(monthly(3000, 24, 14.9)), formatGbp(monthly(3000, 24, 14.9) * 24), formatGbp(totalInterest(3000, 24, 14.9))],
    ],
  },
  sections: [
    section("How 0% finance works", [
      "A lender or practice offers a promotional period where no interest is charged. The monthly payment is the treatment cost, less any deposit, divided by the number of months. Providers may fund 0% offers through other means, such as fees paid by the practice, so availability depends on the clinic and the product.",
    ]),
    section("The catches to check", null, [
      "The 0% term may be shorter than the term you need; longer terms can use an APR.",
      "A deposit may be required, which affects how much you finance.",
      "Missing a payment may end the 0% rate or add charges.",
      "Approval depends on your credit profile and affordability; 0% is not guaranteed.",
      "Check that the 0% applies to the whole treatment plan, including later stages.",
    ]),
    section("Where to go next", [
      "For a step-by-step look at how a 0% plan is structured, see our guide to how 0% dental finance works. To run your own numbers, use the 0% finance calculator.",
    ], [
      { text: "How 0% dental finance works", href: "/how-0-percent-dental-finance-works" },
      { text: "0% finance calculator", href: "/0-percent-finance-calculator" },
      { text: "Can you get 0% finance for implants?", href: "/can-you-get-0-percent-finance-for-dental-implants" },
      { text: "Can you get 0% finance for veneers?", href: "/can-you-get-0-percent-finance-for-veneers" },
    ]),
  ],
  faqs: [
    { question: "Is 0% dental finance really free?", answer: "You pay no interest during the promotional term, but you still repay the full treatment cost. Fees, a deposit or missed payments can add cost." },
    { question: "Can I get 0% dental finance with bad credit?", answer: "It is less likely, as 0% offers are usually reserved for applicants the lender considers lower risk. Options and terms vary by lender." },
    { question: "What happens when the 0% period ends?", answer: "Either the plan is repaid in full by then, or any balance may start to attract interest. Read the agreement to see which applies." },
  ],
  internalLinks: [L.zeroHow, L.plans, L.monthly, L.calcHub, L.eligibility, L.badCredit],
});

const treatmentFinance = page({
  slug: "dental-treatment-finance",
  title: "Dental Treatment Finance UK: Which Treatments and How",
  description:
    "Which private dental treatments are commonly paid for with finance in the UK, how payments are usually structured, and where to find treatment-specific guides.",
  answerBlock:
    "Finance is most often used for higher-cost private treatment such as dental implants, veneers, crowns and orthodontics, where the cost is hard to pay in one go. Smaller treatments are usually paid directly or on a short practice plan. NHS charges are separate and set by bands.",
  keyTakeaways: [
    "Higher-cost private treatment is the most common reason to use finance.",
    "Staged treatment is usually paid in stages or financed as a whole plan.",
    "Cosmetic treatment may be treated differently by some lenders, so check eligibility.",
    "NHS dental charges follow fixed bands; finance applies to private treatment.",
  ],
  summaryRows: [
    ["Often financed", "Implants, veneers, crowns, orthodontics, full-arch treatment"],
    ["Often paid directly", "Check-ups, hygiene, simple fillings"],
    ["NHS", "Charged by band; not a finance product"],
    ["Key step", "A written, itemised treatment plan and quote"],
  ],
  featureTable: {
    title: "Common treatments and how people usually pay",
    description: "General patterns only; every practice and lender sets its own terms.",
    headers: ["Treatment", "Typical payment pattern", "Where to read more"],
    rows: [
      ["Dental implants", "Staged payments or a financed treatment plan", "Dental implants finance"],
      ["Veneers", "Per-tooth quote paid up front or financed", "Veneers finance"],
      ["Crowns", "Often paid per crown; larger plans may be financed", "Crown payment examples"],
      ["Cosmetic dentistry", "Packages such as whitening, bonding and veneers", "Cosmetic dentistry finance"],
      ["Treatment abroad", "Usually staged or self-funded; UK finance may not apply overseas", "Turkey teeth finance"],
    ],
  },
  sections: [
    section("How to choose", [
      "Start with the clinical plan, not the finance. Once you have a written quote, compare payment routes against the total cost and your monthly budget.",
    ], [
      { text: "Dental implants finance", href: "/dental-implants-finance" },
      { text: "Veneers finance", href: "/veneers-finance" },
      { text: "Cosmetic dentistry finance", href: "/cosmetic-dentistry-finance" },
      { text: "Crown payment examples", href: "/dental-crowns-monthly-payments" },
      { text: "Clear aligners finance", href: "/clear-aligners-finance" },
      { text: "Dental insurance vs dental plans", href: "/dental-insurance-vs-dental-plans" },
      { text: "Turkey teeth finance", href: "/turkey-teeth-finance" },
    ]),
    section("One-off, staged and ongoing treatment", [
      "One-visit treatments are usually paid at the appointment or on a short practice plan. Staged treatment, such as implants, is often paid at milestones or financed as a whole plan, so the lender may pay the practice up front while you repay monthly. Ongoing care, such as orthodontics, is often spread across the length of treatment.",
      "Whichever pattern applies, ask the practice to show the full plan and the total cost in writing, then compare payment routes against that single figure.",
    ]),
    section("NHS and private treatment", [
      "NHS dental treatment in England is charged in bands, and many cosmetic treatments and, in most cases, dental implants are private. Check the NHS website for current charges and what is covered before assuming a treatment must be financed.",
    ]),
  ],
  faqs: [
    { question: "Can I finance any dental treatment?", answer: "Availability depends on the practice and lender. Cosmetic and high-cost treatments are commonly financed, while very small treatments often are not." },
    { question: "Does finance cover NHS treatment?", answer: "NHS treatment is charged by band and is not usually financed. Finance is mainly used for private treatment." },
    { question: "What should I ask my dentist about payment?", answer: "Ask for a written itemised quote, what payment plans the practice offers, which lenders it works with and what happens to payments if the plan changes." },
  ],
  internalLinks: [L.home, L.plans, L.implants, L.veneers, L.cosmetic, L.turkey, L.monthly],
});

const implantsFinance = page({
  slug: "dental-implants-finance",
  title: "Dental Implants Finance UK: Costs, Staging and Payments",
  description:
    "How dental implant finance works in the UK: why costs are staged, what a quote should include, and illustrative monthly payments for single implants to full arches.",
  answerBlock:
    "Dental implants are usually private treatment priced by scope, from a single implant to a full arch, and delivered in stages. Finance spreads the total over monthly payments. Compare the total repayable and check what the quote includes before you borrow.",
  keyTakeaways: [
    "Implant treatment is staged, so payment timing and finance should match the plan.",
    "A quote should list consultation, scans, surgery, components and the final crown or bridge.",
    "Longer terms lower the monthly payment but raise total interest where interest applies.",
    "All figures here are illustrative; get a written quote from the clinic.",
  ],
  summaryRows: [
    ["Typical scope examples", "Single implant, several implants, full arch or full mouth"],
    ["Payment style", "Staged payments or a financed treatment plan"],
    ["Example", `${formatGbp(2800, 0)} single implant, ${formatGbp(500, 0)} deposit, 24 months at 0%: ${formatGbp(monthly(2800, 24, 0, 500))} a month`],
    ["NHS", "Implants are private in most cases"],
  ],
  costTable: {
    title: "Illustrative implant scenarios (0% APR)",
    description: "Scope examples with deposit, monthly payment over 24 and 48 months. Not prices or quotes.",
    headers: ["Scenario", "Total cost", "Deposit", "24 months", "48 months"],
    rows: [
      ["Single implant", 2800, 500],
      ["4 implants", 11000, 1500],
      ["Full mouth (implant-supported)", 16000, 3000],
    ].map(([label, total, deposit]) => [label, formatGbp(total, 0), formatGbp(deposit, 0), formatGbp(monthly(total, 24, 0, deposit)), formatGbp(monthly(total, 48, 0, deposit))]),
  },
  sections: [
    section("Why implant costs are staged", [
      "Implant treatment usually involves assessment and scans, surgery to place the implants, a healing period and then the final tooth, crown or bridge. Some plans also include extractions, bone grafting or sedation. Ask which are in the quote and which would be extra.",
    ]),
    section("What a good quote includes", null, [
      "Consultation, imaging and treatment planning",
      "Surgery and implant components",
      "Temporary teeth if needed",
      "The final crown, bridge or denture",
      "Aftercare, reviews and any warranty terms",
      "Anything that could cost extra, such as grafting or sedation",
    ]),
    localSection("Implant finance by city", "dental-implants-finance", "Implant finance"),
    section("Matching finance to the treatment plan", [
      "Check the finance covers the whole treatment, including later stages, and whether the lender pays the practice in one go or in stages. If the plan changes, ask how the agreement and any deposit are affected.",
    ], [
      { text: "Implant payment examples", href: "/dental-implants-monthly-payments" },
      { text: "Single implant vs full-mouth finance", href: "/single-implant-finance-vs-full-mouth-finance" },
      { text: "How much per month on finance", href: "/how-much-do-dental-implants-cost-per-month-on-finance" },
      { text: "Implant finance calculator", href: "/implant-finance-calculator" },
    ]),
  ],
  faqs: [
    { question: "Can I get finance for dental implants in the UK?", answer: "Yes, many practices offer implant finance through payment plans or a lender. Availability, term and rate depend on the provider and your circumstances." },
    { question: "Are dental implants available on the NHS?", answer: "In most cases implants are private. Check the NHS website for the limited situations where they may be provided." },
    { question: "Can I get 0% finance for implants?", answer: "Some providers offer 0% on selected terms, but longer terms or larger sums often carry an APR. Check the offer for your exact treatment." },
    { question: "What if my implant plan changes after finance is agreed?", answer: "Ask the practice and lender before signing how the agreement, payments and any deposit are handled if the plan changes." },
  ],
  internalLinks: [L.treatment, L.implantPayments, L.implantCalc, L.plans, L.zero, L.eligibility, L.monthly],
});

const veneersFinance = page({
  slug: "veneers-finance",
  title: "Veneers Finance UK: Costs, Types and Monthly Payments",
  description:
    "How veneers finance works in the UK: composite and porcelain veneers, what drives the cost, and illustrative monthly payments for a few teeth up to a full smile.",
  answerBlock:
    "Veneers are cosmetic, private treatment priced per tooth or per set, so the total depends on how many teeth are treated and whether you choose composite or porcelain. Finance can spread the cost, but check the total repayable and whether your lender or practice offers finance for cosmetic work.",
  keyTakeaways: [
    "Veneers are cosmetic and not normally available on the NHS.",
    "Cost depends on the number of teeth, material and the clinic's planning and lab work.",
    "Some lenders and practices treat cosmetic treatment differently, so check eligibility.",
    "Figures here are illustrative; request a written itemised quote.",
  ],
  summaryRows: [
    ["Scope examples", "A few teeth, one arch or a full smile"],
    ["Materials", "Composite or porcelain, with different cost and lifespan trade-offs"],
    ["Example", `${formatGbp(3600, 0)} for 8 veneers, ${formatGbp(500, 0)} deposit, 24 months at 0%: ${formatGbp(monthly(3600, 24, 0, 500))} a month`],
    ["Key check", "What the quote includes beyond the veneers themselves"],
  ],
  costTable: {
    title: "Illustrative veneer scenarios (0% APR)",
    description: "Scope examples only; not prices or quotes.",
    headers: ["Scenario", "Total cost", "Deposit", "12 months", "24 months", "36 months"],
    rows: [
      ["4 veneers", 1800, 300],
      ["8 veneers", 3600, 500],
      ["Full smile (10 to 12 veneers)", 5400, 750],
    ].map(([label, total, deposit]) => [label, formatGbp(total, 0), formatGbp(deposit, 0), ...TERMS.map((term) => formatGbp(monthly(total, term, 0, deposit)))]),
  },
  sections: [
    section("Composite versus porcelain", [
      "Composite veneers are usually shaped directly on the teeth and can often be done in fewer visits; porcelain veneers are made in a lab, usually take more visits and are typically priced higher. Durability, maintenance and repair differ, so ask your dentist what suits your teeth and goals.",
    ], [
      { text: "Composite vs porcelain veneers on finance", href: "/composite-vs-porcelain-veneers-on-finance" },
    ]),
    section("What to check in a veneers quote", null, [
      "Number of teeth and material",
      "Consultation, mock-up or preview, and any preparation work",
      "Lab fees, follow-up visits and any warranty",
      "Replacement or repair costs over time",
    ]),
    localSection("Veneers finance by city", "veneers-finance", "Veneers finance"),
    section("Paying monthly for veneers", [
      "Because veneers are cosmetic, confirm that your chosen lender or practice plan covers them. Compare a short 0% plan if you can afford the payment against a longer interest-bearing plan.",
    ], [
      { text: "Veneer payment examples", href: "/veneers-monthly-payments" },
      { text: "Can you get 0% finance for veneers?", href: "/can-you-get-0-percent-finance-for-veneers" },
      { text: "Veneer finance calculator", href: "/veneer-finance-calculator" },
    ]),
  ],
  faqs: [
    { question: "Can I get finance for veneers?", answer: "Many practices offer payment plans or lender finance for veneers. Availability depends on the practice, the lender and your circumstances." },
    { question: "Are veneers available on the NHS?", answer: "Veneers are cosmetic and are not normally available on the NHS. Check the NHS website for what is covered." },
    { question: "Is porcelain or composite cheaper on finance?", answer: "Composite is often cheaper up front, but total cost depends on the number of teeth, repairs and replacements. Compare quotes and the total repayable." },
  ],
  internalLinks: [L.treatment, L.cosmetic, L.veneerPayments, L.veneerCalc, L.plans, L.zero, L.monthly],
});

const cosmeticFinance = page({
  slug: "cosmetic-dentistry-finance",
  title: "Cosmetic Dentistry Finance UK: Options and What to Check",
  description:
    "Cosmetic dentistry finance in the UK: which treatments are commonly financed, how eligibility can differ for cosmetic work, and what to check before you commit.",
  answerBlock:
    "Cosmetic dentistry such as veneers, bonding, whitening and smile makeovers is private treatment, so finance, where available, is arranged through the practice or a lender. Because it is elective, some providers apply different rules, so confirm eligibility for your exact treatment before relying on a plan.",
  keyTakeaways: [
    "Cosmetic treatment is elective and normally private.",
    "Lenders and practices may cover some cosmetic treatments and not others.",
    "Smile makeovers can combine several treatments, so ask for one itemised plan.",
    "Compare total repayable across a short 0% plan and longer plans.",
  ],
  summaryRows: [
    ["Common treatments", "Veneers, bonding, whitening, clear aligners, smile makeovers"],
    ["Payment route", "Practice plan or lender finance, subject to eligibility"],
    ["Example", `${formatGbp(4500, 0)} smile package, ${formatGbp(500, 0)} deposit, 24 months at 0%: ${formatGbp(monthly(4500, 24, 0, 500))} a month`],
    ["Key check", "Does the finance cover the whole combined plan?"],
  ],
  costTable: {
    title: "Illustrative cosmetic package repayments (no deposit)",
    description: "Example package costs; not quotes.",
    headers: ["Package cost", "12 months at 0%", "24 months at 0%", "24 months at 9.9%", "36 months at 9.9%"],
    rows: [1500, 3000, 6000].map((amount) => [formatGbp(amount, 0), formatGbp(monthly(amount, 12)), formatGbp(monthly(amount, 24)), formatGbp(monthly(amount, 24, 9.9)), formatGbp(monthly(amount, 36, 9.9))]),
  },
  sections: [
    section("What counts as cosmetic", [
      "Treatments chosen mainly to change how teeth look, rather than to treat disease or restore function, are generally cosmetic. Some treatments, such as crowns, can be clinical or cosmetic depending on the case, which can affect how they are priced and funded.",
    ]),
    section("Questions to ask", null, [
      "Does the finance cover every treatment in the plan, or only some?",
      "Is there a minimum or maximum amount?",
      "What happens to payments if the plan changes after you start?",
      "Are follow-up visits, retainers or maintenance included in the quote?",
    ]),
    section("What drives cosmetic treatment cost", null, [
      "The number of teeth treated and the materials chosen",
      "Planning, mock-ups and any lab work",
      "Preparatory work such as whitening, gum treatment or straightening first",
      "Follow-up visits, retainers and long-term maintenance",
    ]),
    section("Financing elective treatment responsibly", [
      "Cosmetic treatment is a choice, so it is worth being extra careful about borrowing for it. Only take on payments you can comfortably afford, compare the total repayable rather than the monthly figure, and remember that late or missed payments can add charges and harm your credit file.",
      "Take time to decide: a reputable provider should give you a written quote and let you think before signing. Regulated credit usually includes a right to withdraw within 14 days, but check the agreement.",
    ]),
    section("Next steps", null, [
      { text: "Clear aligners finance", href: "/clear-aligners-finance" },
      { text: "Veneers finance", href: "/veneers-finance" },
      { text: "Dental payment plans compared", href: "/dental-payment-plans" },
      { text: "Monthly payment examples", href: "/dental-monthly-payments" },
      { text: "Dental treatment finance overview", href: "/dental-treatment-finance" },
    ]),
  ],
  faqs: [
    { question: "Can I get finance for cosmetic dentistry?", answer: "Often yes through a practice plan or lender, but availability depends on the treatment and provider. Confirm before you commit." },
    { question: "Is cosmetic dentistry available on the NHS?", answer: "Generally no. Cosmetic treatment is private. Check the NHS website for what is covered." },
    { question: "Can I finance a whole smile makeover?", answer: "Some providers can finance a combined plan, but check the amount limits and whether every treatment is eligible." },
  ],
  internalLinks: [L.veneers, L.treatment, L.plans, L.monthly, L.zero, L.calcHub],
});

// Trust and policy pages (statements limited to what has been confirmed) -------------

const policyReferences = ["Financial Conduct Authority: financial promotions and consumer credit rules", "MoneyHelper: guides to borrowing and credit"];


const medicalReviewPolicy = page({
  slug: "medical-review-policy",
  type: "policy",
  title: "Medical Review Policy",
  description: "How Dental Finance UK treats clinical and dental information: our content is general and has not been clinically reviewed.",
  answerBlock:
    "Dental Finance UK is a finance information site. Where our pages mention dental treatment, the information is general and has not been reviewed by a named dentist or other clinician. It is not clinical advice, so always speak to a registered dental professional about your own care.",
  keyTakeaways: [
    "We do not claim clinical review of our content.",
    "Treatment descriptions are general and for cost-planning context only.",
    "Always get a diagnosis, treatment plan and written quote from a registered dentist.",
    "Check a dentist's registration on the General Dental Council register.",
  ],
  summaryRows: [
    ["Clinical review", "Not carried out"],
    ["Purpose of treatment text", "Context for cost and payment planning"],
    ["Advice", "None; consult a registered dentist"],
  ],
  sections: [
    section("Our approach", [
      "We describe treatments such as implants, veneers and crowns at a general level so you can understand what a quote might include and how payment may be structured. We do not recommend any treatment.",
    ]),
    section("If we add clinical review in future", [
      "If we publish content reviewed by a named, registered clinician, the reviewer's identity and registration will be shown on those pages and this policy will be updated.",
    ]),
  ],
  faqs: [
    { question: "Has a dentist reviewed this site?", answer: "No. The content is general information prepared by our Editorial Team and has not been clinically reviewed." },
    { question: "Where can I check my dentist is registered?", answer: "On the General Dental Council (GDC) online register." },
  ],
  internalLinks: [{ href: "/editorial-policy", label: "Editorial Policy" }, L.disclosure, { href: "/about-us", label: "About Us" }],
  references: ["General Dental Council: register of dental professionals", "NHS: dental treatment information"],
});

const authors = page({
  slug: "authors",
  type: "policy",
  title: "Authors and Editorial Team",
  description: "Who publishes Dental Finance UK content: the DentalFinanceUK Editorial Team, and why pages are not attributed to named individuals.",
  answerBlock:
    "All Dental Finance UK pages are published by the DentalFinanceUK Editorial Team. We do not show individual author or reviewer names because we have not verified any individual credentials for the site and do not want to imply expertise we cannot evidence.",
  keyTakeaways: [
    "Pages are published by the Editorial Team.",
    "No named individual authors or clinical reviewers are shown.",
    "Credentials will be published only for real, verifiable contributors.",
  ],
  summaryRows: [
    ["Publisher", "DentalFinanceUK Editorial Team"],
    ["Named authors", "None"],
    ["Named reviewers", "None"],
  ],
  sections: [
    section("About the Editorial Team", [
      "The Editorial Team researches, drafts and updates the guides on this site following our editorial policy. It does not provide personal advice.",
    ]),
  ],
  faqs: [
    { question: "Why are there no author names?", answer: "We only attribute content to people whose identity and credentials can be verified. Until then, pages are published by the Editorial Team." },
  ],
  internalLinks: [{ href: "/editorial-policy", label: "Editorial Policy" }, { href: "/medical-review-policy", label: "Medical Review Policy" }, { href: "/about-us", label: "About Us" }],
  references: policyReferences,
});



const insuranceVsPlans = page({
  slug: "dental-insurance-vs-dental-plans",
  title: "Dental Insurance vs Dental Plans: What Is the Difference?",
  description:
    "Dental insurance, dental membership (capitation) plans and paying as you go compared: how each works, what they usually cover and what to check before you sign up.",
  answerBlock:
    "Dental insurance pays towards treatment costs in return for a premium, usually with limits and exclusions. A dental membership plan spreads the cost of routine care with one practice through a monthly fee. Paying as you go means paying each bill when it arises. Which suits you depends on how often you need treatment and how predictable you want costs to be.",
  keyTakeaways: [
    "Insurance pays claims within limits; a membership plan prices routine care with one practice.",
    "Pre-existing conditions and waiting periods often limit what insurance pays at first.",
    "Some membership plans include a small insurance element for accidents or emergencies.",
    "Neither replaces finance for a large, one-off treatment such as implants.",
  ],
  summaryRows: [
    ["Dental insurance", "Premium paid; claims reimbursed within annual and per-treatment limits"],
    ["Membership (capitation) plan", "Monthly fee to one practice for agreed routine care, often with discounts on extra treatment"],
    ["Pay as you go", "No ongoing fee; pay each bill in full"],
    ["Dental finance", "Spreads the cost of a specific treatment; see our payment plans guide"],
  ],
  featureTable: {
    title: "How the options compare",
    description: "General features only; every policy and plan has its own terms.",
    headers: ["", "Dental insurance", "Membership plan", "Pay as you go"],
    rows: [
      ["How you pay", "Monthly or annual premium", "Monthly fee to your practice", "Per treatment"],
      ["Which dentist", "Often any, sometimes a network", "The practice running the plan", "Any"],
      ["Routine check-ups", "Often partly covered", "Usually included", "Paid each time"],
      ["Major treatment", "Covered up to limits, often after waiting periods", "Often discounted, not included", "Full cost"],
      ["Pre-existing problems", "Often excluded", "Assessed by the practice when you join", "Not relevant"],
      ["Main risk", "Paying premiums for limited cover", "Paying for care you do not use", "Unexpected large bills"],
    ],
  },
  sections: [
    section("What to check before choosing", null, [
      "Annual limits, per-treatment limits and any excess.",
      "Waiting periods and exclusions for existing conditions.",
      "Whether you can use your current dentist.",
      "What happens if you leave the plan or change practice.",
      "Whether a plan includes insurance, and who the insurer is.",
    ]),
    section("Regulation in brief", [
      "Dental insurance is a regulated insurance product, so the insurer and anyone selling it must meet UK insurance rules. A practice membership plan that only covers routine care may not be insurance, but many include an insurance element for accidents or emergencies. Ask who provides each part.",
    ]),
    section("If you need a large treatment now", [
      "Insurance and membership plans rarely cover large, planned treatments in full, especially soon after joining. For those, compare paying in stages, a practice payment plan or finance.",
    ], [
      { text: "Dental payment plans compared", href: "/dental-payment-plans" },
      { text: "Dental treatment finance", href: "/dental-treatment-finance" },
    ]),
  ],
  faqs: [
    { question: "Is a dental plan the same as dental insurance?", answer: "No. A membership plan spreads the cost of routine care with one practice. Insurance pays claims within limits. Some plans include a small insurance element." },
    { question: "Will dental insurance pay for treatment I already need?", answer: "Often not straight away. Many policies exclude existing problems or apply waiting periods. Check the policy terms." },
    { question: "Do you sell dental insurance?", answer: "No. We are an information website and do not sell or arrange insurance." },
  ],
  internalLinks: [L.plans, L.treatment, L.home, L.monthly],
});

const clearAlignersFinance = page({
  slug: "clear-aligners-finance",
  title: "Clear Aligners Finance UK: Costs and Monthly Payments",
  description:
    "Paying for clear aligners in the UK: how in-practice and direct-to-consumer aligner costs differ, what a quote should include and illustrative monthly payments.",
  answerBlock:
    "Clear aligners straighten teeth with a series of removable trays. They are usually private, cosmetic treatment, so payment is up front, through a practice payment plan or through finance. Costs depend on how complex the case is and how much in-person care is included, so compare what each quote covers, not just the monthly price.",
  keyTakeaways: [
    "Aligners are usually private treatment and not available on the NHS for adults.",
    "In-practice treatment includes examinations and check-ups; remote models include fewer.",
    "Retainers after treatment are often extra; ask before you commit.",
    "Figures here are illustrative; get a written quote.",
  ],
  summaryRows: [
    ["Treatment type", "Removable clear trays, usually cosmetic"],
    ["Payment routes", "Up front, practice plan or lender finance"],
    ["Example", `${formatGbp(3000, 0)} with a ${formatGbp(300, 0)} deposit over 18 months at 0%: ${formatGbp(monthly(3000, 18, 0, 300))} a month`],
    ["Key check", "What in-person care and retainers are included"],
  ],
  costTable: {
    title: "Illustrative aligner repayments",
    description: "Example treatment costs with a deposit, at 0% and an example 9.9% APR. Not prices or quotes.",
    headers: ["Example cost", "Deposit", "12 months at 0%", "24 months at 0%", "24 months at 9.9%"],
    rows: [
      [1800, 200],
      [3000, 300],
      [4500, 500],
    ].map(([total, deposit]) => [formatGbp(total, 0), formatGbp(deposit, 0), formatGbp(monthly(total, 12, 0, deposit)), formatGbp(monthly(total, 24, 0, deposit)), formatGbp(monthly(total, 24, 9.9, deposit))]),
  },
  sections: [
    section("In-practice versus remote treatment", [
      "With in-practice treatment, a dentist or orthodontist examines you, takes scans and reviews progress in person. Some providers run treatment mainly remotely, with fewer in-person checks. Costs differ partly because of this, so compare what level of supervision each option includes and who is clinically responsible.",
    ]),
    section("What a quote should include", null, [
      "Examination, scans and treatment planning",
      "Number of aligners and any refinement stages",
      "In-person or remote review appointments",
      "Retainers after treatment and how long they last",
      "What happens, and what it costs, if treatment does not go to plan",
    ]),
    section("Paying monthly", [
      "Some aligner providers advertise a monthly price. That is a form of credit or instalment plan, so check who provides it, the total repayable, the APR and whether a credit search is used. Compare it with a practice plan or paying up front.",
    ], [
      { text: "Dental payment plans compared", href: "/dental-payment-plans" },
      { text: "0% dental finance: what to check", href: "/0-percent-dental-finance" },
      { text: "Soft and hard credit checks explained", href: "/no-credit-check-dental-finance" },
    ]),
  ],
  faqs: [
    { question: "Can I get clear aligners on finance?", answer: "Many practices and some aligner providers offer monthly payments. These are credit or instalment arrangements, so compare the total repayable and terms." },
    { question: "Are clear aligners available on the NHS?", answer: "Adult orthodontic treatment for cosmetic reasons is not usually available on the NHS. Check the NHS website for eligibility." },
    { question: "Are retainers included in the price?", answer: "Not always. Ask whether retainers are included and what replacements cost." },
  ],
  internalLinks: [L.cosmetic, L.plans, L.treatment, L.zero, L.monthly, L.calcHub],
});

export const corePageEntries = [
  dentalFinanceUk,
  dentalPaymentPlans,
  dentalMonthlyPayments,
  dentalFinanceCalculator,
  zeroPercent,
  treatmentFinance,
  implantsFinance,
  veneersFinance,
  cosmeticFinance,
  insuranceVsPlans,
  clearAlignersFinance,
  medicalReviewPolicy,
  authors,
];

// Replaces the generic base page of the same slug (no FAQ merge: the generic FAQs
// were identical boilerplate on every page).
export function applyCorePages(pageMap) {
  const next = { ...pageMap };
  for (const [slug, corePage] of corePageEntries) {
    next[slug] = corePage;
  }
  return next;
}
