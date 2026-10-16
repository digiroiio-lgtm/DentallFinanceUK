// Credit cluster: bad-credit pillar, low credit score, CCJ and the "no credit check"
// explainer. Each page answers a different question; the pillar links to the others.
// Operator is an information site (not FCA-authorised): nothing here simulates an
// eligibility decision, promises approval or recommends a lender.
// Money figures are computed with calculateMonthlyPayment() and are illustrative.
import { calculateMonthlyPayment, formatGbp } from "./financeCalc.js";

const LAST_UPDATED = "2026-10-16";

const REFERENCES = [
  "Financial Conduct Authority: consumer credit rules (CONC), including creditworthiness and affordability assessments",
  "FCA Register: check whether a firm is authorised",
  "MoneyHelper: guides to credit scores, credit reports and borrowing with a poor credit history",
  "Credit reference agencies (Experian, Equifax, TransUnion): how credit reports, scores and searches work",
  "Financial Ombudsman Service: consumer credit complaints",
];

const DISCLAIMER =
  "General information only, not financial or legal advice. Dental Finance UK is not a lender or credit broker and is not authorised by the FCA. No lender can responsibly guarantee approval, and finance is subject to status, eligibility, affordability and lender approval.";

const L = {
  pillar: { href: "/bad-credit-dental-finance", label: "Dental Finance With Bad Credit" },
  lowScore: { href: "/dental-finance-low-credit-score", label: "Dental Finance With a Low Credit Score" },
  ccj: { href: "/dental-finance-with-ccj", label: "Dental Finance With a CCJ" },
  noCheck: { href: "/no-credit-check-dental-finance", label: "No Credit Check Dental Finance Explained" },
  declined: { href: "/dental-finance-declined", label: "Dental Finance Declined" },
  defaults: { href: "/dental-finance-after-missed-payments-or-defaults", label: "Dental Finance After Missed Payments or Defaults" },
  eligibility: { href: "/dental-finance-eligibility", label: "Dental Finance Eligibility" },
  lendersCheck: { href: "/dental-finance-eligibility-what-lenders-check", label: "What UK Lenders Usually Check" },
  options: { href: "/bad-credit-dental-finance-options", label: "Bad Credit Dental Finance Options" },
  loansVsClinic: { href: "/bad-credit-dental-loans-vs-clinic-finance", label: "Bad Credit Loans vs Clinic Finance" },
  improve: { href: "/improve-dental-finance-approval-with-bad-credit", label: "Improve Your Chances of Approval" },
  plans: { href: "/dental-payment-plans", label: "Dental Payment Plans" },
  home: { href: "/dental-finance-uk", label: "Dental Finance UK Overview" },
  calc: { href: "/finance-calculator", label: "Finance Calculator" },
  disclosure: { href: "/financial-disclosure", label: "Financial Disclosure" },
  method: { href: "/cost-and-calculator-methodology", label: "Cost and Calculator Methodology" },
};

function monthly(amount, term, apr) {
  return calculateMonthlyPayment({ totalCost: amount, termMonths: term, apr }).monthlyPayment;
}

function interest(amount, term, apr) {
  return calculateMonthlyPayment({ totalCost: amount, termMonths: term, apr }).totalInterest;
}

function section(heading, paragraphs, items) {
  return { heading, ...(paragraphs?.length ? { paragraphs } : {}), ...(items?.length ? { items } : {}) };
}

function page(config) {
  return [
    config.slug,
    { type: "article", references: REFERENCES, disclaimer: DISCLAIMER, lastUpdated: LAST_UPDATED, ...config },
  ];
}

const pillar = page({
  slug: "bad-credit-dental-finance",
  title: "Dental Finance With Bad Credit UK: Your Options and What to Check",
  description:
    "Can you get dental finance with bad credit in the UK? What lenders look at, realistic options, what higher rates look like and how to avoid misleading offers.",
  answerBlock:
    "Some UK lenders and practices do consider applicants with bad credit, but approval is never guaranteed and the rate, deposit or term may be less favourable. Lenders look at your whole profile, not one score. Check your credit reports first and avoid any offer that promises guaranteed approval.",
  keyTakeaways: [
    "There is no single \"bad credit\" cut-off: each lender uses its own criteria.",
    "A larger deposit, shorter term or smaller loan can improve your chances.",
    "Higher-risk applicants are more likely to be offered a higher APR.",
    "Be cautious of \"guaranteed approval\" claims and of anyone asking for a fee up front.",
  ],
  summaryRows: [
    ["Approval", "Never guaranteed; decided by the lender"],
    ["What lenders weigh", "Income, outgoings, existing debt, credit history, loan size"],
    ["What can help", "Larger deposit, shorter term, correcting report errors, applying selectively"],
    ["Cost effect", `£3,000 over 24 months: ${formatGbp(monthly(3000, 24, 9.9))} a month at 9.9% APR, ${formatGbp(monthly(3000, 24, 29.9))} at 29.9% (example rates)`],
  ],
  featureTable: {
    title: "Realistic routes if your credit history is poor",
    description: "General patterns; each provider sets its own criteria.",
    headers: ["Route", "How it works", "Credit search?", "Things to check"],
    rows: [
      ["Practice payment plan", "Instalments agreed with the practice", "Varies by practice", "Term, deposit, what happens if treatment changes"],
      ["Lender finance for dental treatment", "Regulated lender funds the treatment", "Yes; some offer a soft search first", "Representative APR, total repayable, early repayment"],
      ["Personal loan from a lender that considers lower credit scores", "You borrow and pay the clinic", "Yes", "Higher APRs are common; compare total cost"],
      ["Credit union loan", "Member-owned lender, often with capped rates", "Yes, but approach can be more flexible", "Membership rules, how long it takes"],
      ["Wait, save and improve your profile", "Build a deposit and strengthen your file", "No", "Whether treatment can safely wait"],
    ],
  },
  costTable: {
    title: "What a higher rate does to the cost",
    description: "£3,000 over 24 months at example rates. Illustrative only: your rate is set by the lender.",
    headers: ["Example APR", "Monthly payment", "Total repayable", "Interest"],
    rows: [9.9, 19.9, 29.9].map((apr) => [`${apr}%`, formatGbp(monthly(3000, 24, apr)), formatGbp(monthly(3000, 24, apr) * 24), formatGbp(interest(3000, 24, apr))]),
  },
  sections: [
    section("What \"bad credit\" means to a lender", [
      "Credit reference agencies hold your credit report and each uses its own score scale, so a score from one agency is not what a lender sees. Lenders usually apply their own scorecard to the report plus the information you provide.",
      "Things that commonly count against an application include missed or late payments, defaults, County Court Judgments, a high level of existing debt or a thin credit history. None of these automatically rules you out with every lender.",
    ]),
    section("What can improve your position", null, [
      "Get your credit reports from all three agencies and correct errors before applying.",
      "Make sure you are on the electoral roll at your current address.",
      "Pay existing bills on time and reduce balances where you can.",
      "Consider a larger deposit or a smaller treatment plan to reduce the amount borrowed.",
      "Apply selectively: several hard searches in a short time can themselves count against you.",
    ]),
    section("Protect yourself from misleading offers", [
      "Responsible regulated lenders assess affordability before lending, so a firm promising guaranteed approval or \"no checks\" should be treated with caution. Be especially wary of anyone asking for a fee before you get a loan, or lenders you cannot find on the FCA Register.",
    ], [
      { text: "No credit check dental finance explained", href: "/no-credit-check-dental-finance" },
    ]),
    section("Go deeper", null, [
      { text: "Dental finance with a low credit score", href: "/dental-finance-low-credit-score" },
      { text: "Dental finance with a CCJ", href: "/dental-finance-with-ccj" },
      { text: "Dental finance declined: what to do next", href: "/dental-finance-declined" },
      { text: "After missed payments or defaults", href: "/dental-finance-after-missed-payments-or-defaults" },
      { text: "What lenders check for eligibility", href: "/dental-finance-eligibility" },
      { text: "Bad credit dental finance options", href: "/bad-credit-dental-finance-options" },
      { text: "Bad credit loans vs clinic finance", href: "/bad-credit-dental-loans-vs-clinic-finance" },
      { text: "How to improve your chances of approval", href: "/improve-dental-finance-approval-with-bad-credit" },
    ]),
  ],
  faqs: [
    { question: "Can I get dental finance with bad credit?", answer: "It is possible with some lenders and practices, but never guaranteed. Approval depends on your whole profile, and the rate, deposit or term may be less favourable than for applicants with strong credit." },
    { question: "Is there guaranteed dental finance for bad credit?", answer: "No responsible regulated lender can promise approval before assessing affordability and your credit file. Treat guaranteed approval claims with caution." },
    { question: "Will applying for dental finance hurt my credit score?", answer: "A formal application usually leaves a hard search on your file, which other lenders can see. A soft search does not. Ask which type is used before you consent, and avoid applying to many lenders at once." },
    { question: "What is the cheapest option if my credit is poor?", answer: "It depends on your circumstances. Compare total repayable across a practice plan, a lender for lower credit scores and a credit union loan if you are eligible, and consider waiting while you build a deposit." },
    { question: "How can I check my credit report?", answer: "You can request your credit report from each of the three UK credit reference agencies. Check for errors, old addresses and accounts that are not yours." },
  ],
  internalLinks: [L.lowScore, L.ccj, L.noCheck, L.declined, L.defaults, L.eligibility, L.plans, L.calc],
});

const lowScore = page({
  slug: "dental-finance-low-credit-score",
  title: "Dental Finance With a Low Credit Score: What It Changes",
  description:
    "What a low credit score means for dental finance in the UK: why scores differ between agencies, what lenders actually use, and practical steps before you apply.",
  answerBlock:
    "A low credit score can mean fewer lenders, a higher APR or a request for a larger deposit, but it is only one input. Each credit reference agency scores differently and lenders apply their own rules, so check your reports and look at your overall profile rather than one number.",
  keyTakeaways: [
    "Scores differ between agencies and are not what a lender necessarily sees.",
    "A low score changes your options; it does not automatically close them all.",
    "Reports show the reasons behind a score; fix errors first.",
    "Compare total repayable, because a higher APR raises both payment and cost.",
  ],
  summaryRows: [
    ["Possible effects", "Fewer lenders, higher APR, larger deposit request"],
    ["Where scores come from", "Each credit reference agency uses its own scale"],
    ["First step", "Read your credit reports and correct errors"],
    ["Cost effect", `£3,000 over 24 months: ${formatGbp(monthly(3000, 24, 9.9))} at 9.9% APR vs ${formatGbp(monthly(3000, 24, 19.9))} at 19.9% (example rates)`],
  ],
  sections: [
    section("Scores versus what lenders use", [
      "A credit score is a summary calculated by a credit reference agency. Lenders typically use the underlying report with their own scorecard, plus your income and outgoings. That is why you can be accepted by one lender and declined by another with the same \"score\".",
    ]),
    section("What a low score can change", [
      "A lower score can mean fewer lenders are willing to offer finance, a higher interest rate where it is offered, or a request for a larger deposit to reduce the lender's risk. It does not automatically rule out every option, since lenders differ in how much weight they give to the score compared with other factors.",
    ]),
    section("What can help", null, [
      "Check all three credit reports for errors before applying.",
      "Register on the electoral roll at your current address.",
      "Pay bills on time and avoid taking on new credit just before applying.",
      "Consider a larger deposit to reduce the amount borrowed.",
      "Be realistic about the term and monthly amount you can sustain.",
      "Ask the clinic which lenders it works with, since criteria vary.",
    ]),
    section("Related guides", null, [
      { text: "Dental finance with bad credit: the full guide", href: "/bad-credit-dental-finance" },
      { text: "Dental finance with a CCJ", href: "/dental-finance-with-ccj" },
      { text: "What lenders check", href: "/dental-finance-eligibility" },
      { text: "If you have been declined", href: "/dental-finance-declined" },
    ]),
  ],
  faqs: [
    { question: "What credit score do I need for dental finance?", answer: "There is no single minimum. Each lender sets its own criteria and each agency scores on a different scale, so look at your overall report and ask about the lender's requirements." },
    { question: "Can I still get dental finance with a low credit score?", answer: "It is possible with some lenders, though options may be more limited or come at a higher rate. Approval is always subject to status, eligibility, affordability and lender approval." },
    { question: "Why do I have different scores from different agencies?", answer: "Each agency has its own scoring method and may hold slightly different data. Differences are normal." },
  ],
  internalLinks: [L.pillar, L.ccj, L.noCheck, L.eligibility, L.declined, L.calc],
});

const ccj = page({
  slug: "dental-finance-with-ccj",
  title: "Dental Finance With a CCJ: What It Means and What to Do",
  description:
    "Can you get dental finance with a CCJ? What a County Court Judgment is, how long it stays on your record, how satisfied and unsatisfied CCJs differ and your realistic options.",
  answerBlock:
    "A County Court Judgment (CCJ) is a court order to repay a debt and is visible to lenders, so it can limit your dental finance options. Some lenders may still consider you, especially if the CCJ is satisfied and some time has passed, but approval is never guaranteed and the cost may be higher.",
  keyTakeaways: [
    "In England and Wales a CCJ stays on the public register for six years from the judgment date.",
    "Paying in full within one month of the judgment removes it from the register.",
    "A satisfied CCJ is generally viewed less negatively than an unsatisfied one, but remains on your record.",
    "Speak to a free debt advice service before borrowing more if you are struggling with payments.",
  ],
  summaryRows: [
    ["Applies to", "England and Wales (Scotland and Northern Ireland use different systems)"],
    ["Time on record", "Six years from the date of judgment"],
    ["Removal", "Paid in full within one month of judgment"],
    ["Effect on finance", "Many lenders take it into account; approval never guaranteed"],
  ],
  featureTable: {
    title: "CCJ status and what it can mean for an application",
    description: "General guide only; each lender decides for itself.",
    headers: ["Status", "What lenders can see", "Practical implication"],
    rows: [
      ["Unsatisfied (not yet paid)", "An outstanding judgment on your file", "Often the hardest position; paying it off and getting it marked satisfied is usually a priority"],
      ["Satisfied (paid after one month)", "The judgment, marked as satisfied", "Still on your record for six years but some lenders view it more favourably"],
      ["Paid in full within one month", "Removed from the register", "Check your reports to confirm it no longer appears"],
      ["Set aside by the court", "Removed from the register", "Applies where a judgment was wrongly issued; seek advice"],
    ],
  },
  sections: [
    section("What a CCJ is", [
      "A County Court Judgment is issued in England and Wales when a court decides you owe money and have not paid. It is recorded on a public register that credit reference agencies use. Scotland and Northern Ireland have their own systems for court decisions about debt, so check what applies where you live.",
    ]),
    section("How a CCJ affects dental finance", [
      "Lenders see CCJs when they search your credit file. Many treat an unsatisfied CCJ as a significant concern; a satisfied CCJ that is some years old may carry less weight. Some lenders will not lend to applicants with a CCJ at all, while others consider it alongside income, affordability and the size of the loan.",
      "Because the risk is higher, any offer may carry a higher APR or require a larger deposit. A higher rate raises both the monthly payment and the total cost.",
    ]),
    section("What you can do", null, [
      "Check your credit reports to see exactly how the CCJ appears and whether the dates and amounts are right.",
      "If you can, pay the CCJ and make sure it is marked as satisfied; ask the creditor and confirm with the agencies.",
      "If you think the CCJ was issued in error, seek advice on whether it can be set aside.",
      "Consider whether treatment can wait while you build a deposit and improve your file.",
      "If you are struggling with debts, contact a free, regulated debt advice service before taking on more credit.",
    ]),
    section("Related guides", null, [
      { text: "Dental finance with bad credit: the full guide", href: "/bad-credit-dental-finance" },
      { text: "Dental finance with a low credit score", href: "/dental-finance-low-credit-score" },
      { text: "Dental finance after missed payments or defaults", href: "/dental-finance-after-missed-payments-or-defaults" },
      { text: "Dental finance declined", href: "/dental-finance-declined" },
    ]),
  ],
  faqs: [
    { question: "Can I get dental finance with a CCJ?", answer: "It is possible with some lenders, but never guaranteed. An unsatisfied CCJ makes approval harder, and any offer may come with a higher rate or larger deposit." },
    { question: "How long does a CCJ stay on my credit file?", answer: "In England and Wales it stays on the register for six years from the date of judgment, whether or not it is later paid." },
    { question: "Does paying a CCJ remove it?", answer: "Paying in full within one month of the judgment removes it from the register. Paying later marks it as satisfied but it remains on your record for the six years." },
    { question: "What if I have a CCJ and need urgent dental treatment?", answer: "Speak to your dentist about phasing treatment and payment options, and consider NHS treatment where it applies. Seek free debt advice before taking on credit you may struggle to repay." },
  ],
  internalLinks: [L.pillar, L.lowScore, L.defaults, L.declined, L.eligibility, L.noCheck],
});

const noCheck = page({
  slug: "no-credit-check-dental-finance",
  title: "No Credit Check Dental Finance: What It Really Means",
  description:
    "Is there dental finance with no credit check in the UK? How soft and hard searches differ, what \"no credit check\" offers can really mean and the red flags to avoid.",
  answerBlock:
    "Regulated UK lenders are expected to assess whether you can afford a loan, which normally involves checking your credit file, so genuine \"no credit check\" lending is rare. Some providers offer a soft search that does not affect your score, and some practices run instalment plans themselves. Treat \"guaranteed\" or \"no checks\" claims with caution.",
  keyTakeaways: [
    "A soft search is not the same as no check, and does not leave a mark other lenders can see.",
    "A hard search is recorded on your file and can affect your score.",
    "Offers claiming no checks and guaranteed approval are a warning sign.",
    "Check any lender on the FCA Register, and never pay a fee to get a loan.",
  ],
  summaryRows: [
    ["Soft search", "Visible to you; not to other lenders; no effect on score"],
    ["Hard search", "Recorded on your file; visible to other lenders"],
    ["Affordability check", "Looks at income and outgoings; required for regulated lending"],
    ["Guaranteed approval", "Cannot responsibly be promised before assessment"],
  ],
  featureTable: {
    title: "Types of check you may meet",
    description: "Providers use different processes; ask which applies before you consent.",
    headers: ["Check", "What it does", "Effect on your file"],
    rows: [
      ["Soft search (quotation or eligibility search)", "Gives an indication of whether you may be accepted", "Not visible to other lenders; no effect on score"],
      ["Hard search (application search)", "Used for a formal credit decision", "Recorded and visible to other lenders; may lower your score"],
      ["Affordability assessment", "Reviews income, outgoings and existing commitments", "Not itself a search, but may use data from your file"],
      ["Identity and fraud check", "Confirms who you are", "May leave a search record; practice varies"],
    ],
  },
  sections: [
    section("What \"no credit check\" can actually mean", null, [
      "A soft search first: the provider checks eligibility without leaving a visible mark, but a formal application may still use a hard search.",
      "A practice instalment plan the clinic runs itself, which may not involve a lender or a credit file search. Terms vary and may require a deposit or payment before treatment.",
      "A high-cost or unauthorised lender that skips proper checks. This is where the risk is highest.",
      "A scam: a fee demanded up front, with the loan never arriving.",
    ]),
    section("Red flags", null, [
      "Guaranteed approval or \"no checks\" promises, especially with high upfront fees.",
      "A lender you cannot find on the FCA Register, or who is vague about who they are.",
      "Pressure to decide quickly or to pay a fee before receiving funds.",
      "No clear statement of the APR, total repayable or your right to withdraw.",
    ]),
    section("Safer ways to approach it", [
      "Ask any provider whether they use a soft search before a hard search and what is visible on your file. Check they are authorised on the FCA Register. Use a quote or eligibility search where available, and apply formally to only one lender at a time.",
      "If your main aim is to avoid a credit search altogether, consider alternatives such as paying in stages with the practice, saving for a deposit, or phasing treatment, and compare these honestly against the cost of borrowing.",
    ], [
      { text: "Dental finance with bad credit", href: "/bad-credit-dental-finance" },
      { text: "What lenders check", href: "/dental-finance-eligibility" },
      { text: "Dental payment plans compared", href: "/dental-payment-plans" },
    ]),
  ],
  faqs: [
    { question: "Is there dental finance with no credit check in the UK?", answer: "Genuine no-check lending from regulated lenders is rare, because lenders must assess affordability. Some providers use a soft search first, and some practices run their own instalment plans. Always check who the creditor is and whether they are FCA-authorised." },
    { question: "What is the difference between a soft and a hard credit search?", answer: "A soft search is visible only to you and does not affect your score. A hard search is recorded on your credit file, can be seen by other lenders and may lower your score." },
    { question: "Is guaranteed dental finance legitimate?", answer: "Be cautious. A regulated lender cannot responsibly promise approval before assessing you. Guaranteed approval claims are a common sign of a misleading or unauthorised offer." },
    { question: "How do I check a lender is genuine?", answer: "Search for the firm on the Financial Conduct Authority's Register and make sure the details match. Never pay a fee before receiving a loan." },
  ],
  internalLinks: [L.pillar, L.lowScore, L.eligibility, L.lendersCheck, L.plans, L.disclosure],
});

export const creditPageEntries = [pillar, lowScore, ccj, noCheck];

// Applied last so these pages replace both the generic base page and the earlier
// Astro-ported cluster page, while keeping the other cluster pages untouched.
export function applyCreditPages(pageMap) {
  const next = { ...pageMap };
  for (const [slug, creditPage] of creditPageEntries) next[slug] = creditPage;
  return next;
}
