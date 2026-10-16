// Content clusters ported from the Astro prototype (digiroiio-lgtm/dental-finance-uk):
// bad-credit, full-mouth calculator, payment schedules, example scenarios and
// the cost methodology page. Astro's nested routes are flattened to single slugs.
import { calculateMonthlyPayment, calculationAssumptions, formatGbp } from "./financeCalc.js";

const LAST_UPDATED = "2026-10-16";

const COMMON_REFERENCES = [
  "Financial Conduct Authority (FCA) Consumer Credit rules",
  "MoneyHelper borrowing and credit information",
];

const COMMON_DISCLAIMER =
  "We are not a lender and do not make lending decisions. Figures and guidance are educational and illustrative only. Finance is subject to status, eligibility, affordability and lender approval.";

const METHODOLOGY_LINK = { href: "/cost-and-calculator-methodology", label: "Cost and Calculator Methodology" };
const SHARED_LINKS = {
  calculator: { href: "/finance-calculator", label: "Finance Calculator" },
  plans: { href: "/dental-payment-plans", label: "Dental Payment Plans" },
  disclosure: { href: "/financial-disclosure", label: "Financial Disclosure" },
  contact: { href: "/contact", label: "Contact" },
  implants: { href: "/dental-implants-finance", label: "Dental Implants Finance" },
  veneers: { href: "/veneers-finance", label: "Veneers Finance" },
  badCredit: { href: "/bad-credit-dental-finance", label: "Bad Credit Dental Finance" },
  eligibility: { href: "/dental-finance-eligibility", label: "Dental Finance Eligibility" },
  declined: { href: "/dental-finance-declined", label: "Dental Finance Declined" },
  lowScore: { href: "/dental-finance-low-credit-score", label: "Low Credit Score Dental Finance" },
};

function toSection({ title, paragraphs = [], bullets = [] }) {
  return {
    heading: title,
    ...(paragraphs.length ? { paragraphs } : {}),
    ...(bullets.length ? { items: bullets } : {}),
  };
}

function buildTextPage(config) {
  return [
    config.slug,
    {
      slug: config.slug,
      title: config.title,
      type: "article",
      description: config.description,
      answerBlock: config.answerBlock,
      keyTakeaways: config.keyTakeaways,
      summaryRows: config.summaryRows,
      sections: [
        ...(config.alert ? [{ heading: "Important", body: config.alert }] : []),
        ...config.sections.map(toSection),
      ],
      faqs: config.faqs,
      internalLinks: config.internalLinks,
      references: COMMON_REFERENCES,
      disclaimer: config.alert ? `${config.alert} ${COMMON_DISCLAIMER}` : COMMON_DISCLAIMER,
      lastUpdated: LAST_UPDATED,
    },
  ];
}

const badCreditEntries = [
  buildTextPage({
    slug: "bad-credit-dental-finance",
    title: "Dental Finance With Bad Credit UK | What to Check Before Applying",
    description:
      "Considering dental finance with bad credit in the UK? Understand realistically what affects approval, what to check before applying, and what your options may be.",
    answerBlock:
      "If you have a poor or limited credit history, it is fair to ask whether dental finance is realistically available to you. The honest answer is that it depends on the lender, the size of the loan and your wider financial circumstances, not just a single credit score.",
    alert:
      "No dental finance provider can guarantee acceptance regardless of credit history. Be cautious of any offer that claims 'guaranteed approval' or 'no credit checks', since UK consumer credit rules require affordability checks before lending.",
    keyTakeaways: [
      "Approval depends on income, existing debt, loan size and recent credit history, not a single score.",
      "A larger deposit and shorter term can make an application easier to approve.",
      "Avoid applying to several lenders at once, as multiple applications can affect your credit file.",
      "Treat any 'guaranteed approval' or 'no credit checks' offer with real caution.",
    ],
    summaryRows: [
      ["Guaranteed acceptance", "Never. Subject to status, eligibility, affordability and lender approval"],
      ["What lenders weigh", "Income, existing debt, loan size, recent credit history"],
      ["What can help", "Larger deposit, shorter term, checking your credit report first"],
      ["Red flag", "Offers claiming guaranteed approval or no credit checks"],
    ],
    sections: [
      {
        title: "What actually affects approval",
        paragraphs: [
          "Lenders look at more than a single credit score: income, existing debt, the size of the treatment cost relative to your income, and your recent credit history all play a part.",
          "A smaller deposit and shorter term can sometimes make an application easier to approve than a larger, longer one, because the overall risk to the lender is lower.",
        ],
        bullets: [
          "Some lenders specialise in applicants with a limited or imperfect credit history, though rates may be higher",
          "A larger deposit can improve the chance of approval by reducing the amount borrowed",
          "Multiple credit applications in a short period can itself affect your credit file, so avoid applying to several lenders at once",
        ],
      },
      {
        title: "Before you apply",
        paragraphs: [
          "It is worth checking your own credit report for errors, understanding your realistic budget, and asking the clinic directly which lenders they work with and whether any of them consider applicants with a poor credit history.",
          "Any provider claiming to guarantee approval regardless of credit history, or offering finance with no credit checks at all, should be treated with real caution.",
        ],
      },
    ],
    faqs: [
      {
        question: "Can I get dental finance with bad credit?",
        answer:
          "It is possible with some lenders, but never guaranteed. Approval depends on status, eligibility, affordability and lender approval, and options may come with a higher rate or require a larger deposit.",
      },
      {
        question: "Is there such a thing as guaranteed dental finance with no credit checks?",
        answer:
          "No responsible UK lender can lawfully guarantee approval without any affordability or credit assessment. Treat any offer claiming this with caution.",
      },
    ],
    internalLinks: [
      SHARED_LINKS.eligibility,
      SHARED_LINKS.declined,
      SHARED_LINKS.lowScore,
      SHARED_LINKS.plans,
      SHARED_LINKS.disclosure,
    ],
  }),
  buildTextPage({
    slug: "dental-finance-eligibility",
    title: "Dental Finance Eligibility | What UK Lenders Typically Check",
    description:
      "Understand dental finance eligibility in the UK: what lenders typically assess, what documents may be needed, and how to check before you apply.",
    answerBlock:
      "Before applying for dental finance, it helps to understand roughly what a lender will look at, so you can check your own position first rather than being surprised by a decision.",
    keyTakeaways: [
      "Lenders typically check age, residency, income, existing credit commitments and credit history.",
      "The size of the loan relative to your income matters.",
      "Criteria vary by lender, so one decline does not mean every provider would decline.",
      "Checking your own credit report and budget first can make an application smoother.",
    ],
    summaryRows: [
      ["Typical checks", "Age, UK residency, income, existing credit, credit history"],
      ["Loan size", "Assessed relative to your income"],
      ["Criteria", "Vary by lender"],
      ["Before applying", "Check your credit report and set a realistic budget"],
    ],
    sections: [
      {
        title: "What lenders typically check",
        bullets: [
          "Age and UK residency status",
          "Income and employment status",
          "Existing credit commitments and monthly outgoings",
          "Credit history, including any missed payments or defaults",
          "The size of the loan relative to your income",
        ],
      },
      {
        title: "Before you apply",
        paragraphs: [
          "Checking your own credit report, working out a realistic budget and being ready to explain any income changes can all help an application go more smoothly.",
          "Eligibility criteria vary by lender, so a decline from one provider does not necessarily mean every provider would decline the same application.",
        ],
      },
    ],
    faqs: [
      {
        question: "Do all dental finance lenders use the same eligibility criteria?",
        answer:
          "No. Criteria vary by lender, so it is worth understanding roughly where you stand before applying rather than assuming one decision applies everywhere.",
      },
    ],
    internalLinks: [
      SHARED_LINKS.badCredit,
      SHARED_LINKS.declined,
      { href: "/dental-finance-eligibility-what-lenders-check", label: "What Lenders Check: Full Guide" },
      SHARED_LINKS.plans,
      SHARED_LINKS.disclosure,
    ],
  }),
  buildTextPage({
    slug: "dental-finance-declined",
    title: "Dental Finance Declined | What to Check and What to Do Next",
    description:
      "Been declined for dental finance? Understand common reasons UK applications are declined, what to check, and what your realistic next steps are.",
    answerBlock:
      "Being declined for dental finance can feel discouraging, especially if treatment feels urgent. A decline from one lender is common and does not necessarily mean every option is closed to you.",
    keyTakeaways: [
      "A decline from one lender does not mean every option is closed.",
      "Common causes include existing commitments, recent missed payments and loan size relative to income.",
      "Check your credit report for errors before reapplying.",
      "Be selective: many applications in a short period can affect your credit file further.",
    ],
    summaryRows: [
      ["Common reasons", "Existing commitments, missed payment or default, loan size, incomplete information"],
      ["First step", "Check your credit report for errors"],
      ["Reapplying", "Be selective rather than applying everywhere at once"],
      ["Other levers", "Smaller deposit request, shorter term, a lender with different criteria"],
    ],
    sections: [
      {
        title: "Common reasons applications are declined",
        bullets: [
          "Existing credit commitments relative to income",
          "A recent missed payment or default on your credit file",
          "The loan amount being large relative to your income",
          "Incomplete or inconsistent information on the application",
          "A limited credit history, especially for younger applicants",
        ],
      },
      {
        title: "What to do next",
        paragraphs: [
          "It is worth checking your credit report for errors before reapplying anywhere, since a mistake on your file can sometimes be the reason. A smaller deposit request, shorter term, or a different lender with different criteria may also produce a different outcome.",
          "Repeatedly applying to many lenders in a short space of time can affect your credit file further, so it is worth being selective rather than applying everywhere at once.",
        ],
      },
    ],
    faqs: [
      {
        question: "Why would I be declined for dental finance?",
        answer:
          "Common reasons include existing credit commitments, a recent missed payment or default, the loan size relative to income, or incomplete application information. Criteria vary by lender.",
      },
      {
        question: "Can I apply again after being declined?",
        answer:
          "Yes, but consider checking your credit report first and being selective about where you reapply, since multiple applications in a short period can itself affect your credit file.",
      },
    ],
    internalLinks: [SHARED_LINKS.eligibility, SHARED_LINKS.lowScore, SHARED_LINKS.badCredit, SHARED_LINKS.disclosure],
  }),
  buildTextPage({
    slug: "dental-finance-low-credit-score",
    title: "Dental Finance With a Low Credit Score | Your Realistic Options",
    description:
      "Have a low credit score? See what that realistically means for dental finance in the UK, and what to check before you apply.",
    answerBlock:
      "A low credit score affects the finance options realistically available to you, but it is only one factor lenders consider, alongside income, existing debt and the size of the loan.",
    keyTakeaways: [
      "A low score can mean fewer lenders, a higher rate or a larger deposit request.",
      "It does not automatically rule out every finance option.",
      "Lenders differ in how much weight they place on score versus other factors.",
      "Ask the clinic which lenders they work with, since criteria vary.",
    ],
    summaryRows: [
      ["Possible effects", "Fewer lenders, higher rate, larger deposit request"],
      ["Not automatic", "A low score does not rule out every option"],
      ["What can help", "Credit report check, larger deposit, realistic term"],
      ["Approval", "Always subject to status, eligibility, affordability and lender approval"],
    ],
    sections: [
      {
        title: "What a low credit score changes",
        paragraphs: [
          "A lower score can mean fewer lenders are willing to offer finance, a higher interest rate where finance is offered, or a request for a larger deposit to reduce the lender's risk.",
          "It does not automatically rule out every finance option, since lenders differ in how much weight they place on score versus other factors.",
        ],
      },
      {
        title: "What can help",
        bullets: [
          "Checking your credit report for errors before applying",
          "Considering a larger deposit to reduce the amount borrowed",
          "Being realistic about the term and monthly amount you can sustain",
          "Asking the clinic which lenders they work with, since criteria vary",
        ],
      },
    ],
    faqs: [
      {
        question: "Can I still get dental finance with a low credit score?",
        answer:
          "It is possible with some lenders, though options may be more limited or come at a higher rate. Approval is always subject to status, eligibility, affordability and lender approval.",
      },
    ],
    internalLinks: [SHARED_LINKS.badCredit, SHARED_LINKS.eligibility, SHARED_LINKS.declined, SHARED_LINKS.disclosure],
  }),
];

// Payment schedules ---------------------------------------------------------

const PAYMENT_SCHEDULE_TERMS = [12, 24, 36, 48];

const paymentScheduleConfigs = [
  {
    slug: "dental-implants-monthly-payments",
    treatment: "Dental Implants",
    h1: "Dental Implants Monthly Payments",
    primaryKeyword: "dental implants monthly payments UK",
    intro:
      "See illustrative monthly payment examples for different implant treatment scopes, from a single implant to a full mouth, across a few common repayment terms.",
    tiers: [
      { label: "Single implant", totalCost: 2800, depositAmount: 500 },
      { label: "4 implants", totalCost: 11000, depositAmount: 1500 },
      { label: "Full mouth (implant-supported)", totalCost: 16000, depositAmount: 3000 },
    ],
    parent: SHARED_LINKS.implants,
    caseSlug: "dental-implants-finance-example-scenarios",
  },
  {
    slug: "veneers-monthly-payments",
    treatment: "Veneers",
    h1: "Veneers Monthly Payments",
    primaryKeyword: "veneers monthly payments UK",
    intro:
      "See illustrative monthly payment examples for different veneer treatment scopes, from a small number of teeth to a full smile, across a few common repayment terms.",
    tiers: [
      { label: "4 veneers", totalCost: 1800, depositAmount: 300 },
      { label: "8 veneers", totalCost: 3600, depositAmount: 500 },
      { label: "Full smile (10-12 veneers)", totalCost: 5400, depositAmount: 750 },
    ],
    parent: SHARED_LINKS.veneers,
    caseSlug: "veneers-finance-example-scenarios",
  },
  {
    slug: "dental-crowns-monthly-payments",
    treatment: "Crowns",
    h1: "Dental Crowns Monthly Payments",
    primaryKeyword: "dental crowns monthly payments UK",
    intro:
      "See illustrative monthly payment examples for different crown treatment scopes, from a single crown to a full arch, across a few common repayment terms.",
    tiers: [
      { label: "Single crown", totalCost: 900, depositAmount: 150 },
      { label: "3 crowns", totalCost: 2700, depositAmount: 400 },
      { label: "Full arch (8 crowns)", totalCost: 6400, depositAmount: 800 },
    ],
    parent: SHARED_LINKS.plans,
    caseSlug: "crowns-finance-example-scenarios",
  },
];

function buildPaymentSchedulePage(config) {
  const rows = config.tiers.map((tier) => [
    tier.label,
    formatGbp(tier.totalCost, 0),
    formatGbp(tier.depositAmount, 0),
    ...PAYMENT_SCHEDULE_TERMS.map(
      (termMonths) => formatGbp(calculateMonthlyPayment({ ...tier, termMonths, apr: 0 }).monthlyPayment)
    ),
  ]);
  const lowest = config.tiers[0];
  const lowestAt48 = calculateMonthlyPayment({ ...lowest, termMonths: 48, apr: 0 }).monthlyPayment;

  return [
    config.slug,
    {
      slug: config.slug,
      title: `${config.h1} | Illustrative Payment Schedules`,
      type: "article",
      description: `${config.intro} Figures are illustrative examples, not a real quote.`,
      answerBlock: config.intro,
      keyTakeaways: [
        "Figures use an illustrative 0% representative example so the effect of term length is clear.",
        "Longer terms lower the monthly figure; real finance may add interest.",
        "Use the calculator to test your own deposit, term and rate.",
        "These are not offers from a lender or clinic. Always get a written, itemised quote.",
      ],
      summaryRows: [
        ["Treatment", config.treatment],
        ["Terms shown", PAYMENT_SCHEDULE_TERMS.map((t) => `${t} months`).join(", ")],
        ["Illustrative rate", "0% APR"],
        [`${lowest.label} over 48 months`, `${formatGbp(lowestAt48)} per month after a ${formatGbp(lowest.depositAmount, 0)} deposit`],
      ],
      costTable: {
        title: "Illustrative payment schedule",
        description:
          "Monthly payment after deposit, shown at a 0% representative APR across common repayment terms. Illustrative only.",
        headers: [
          "Treatment scope",
          "Total cost",
          "Deposit",
          ...PAYMENT_SCHEDULE_TERMS.map((t) => `${t} months`),
        ],
        rows,
      },
      sections: [
        {
          heading: "Reading this table",
          paragraphs: [
            "Figures below use an illustrative 0% representative example, the way many in-practice payment plans are structured, so you can see the effect of term length on its own before adding interest.",
            "Real finance may include interest depending on the provider and your circumstances. Use the calculator link below to test your own figures at a different rate.",
          ],
        },
      ],
      faqs: [
        {
          question: "Are these payment schedules real offers?",
          answer:
            "No. They are illustrative examples to show how term length changes a monthly figure, not offers from a specific lender or clinic. Always get a written, itemised quote before deciding.",
        },
        {
          question: `Can I get a different repayment term for ${config.treatment.toLowerCase()}?`,
          answer:
            "Many providers offer terms outside the examples shown here. Use the calculator to test any deposit, term or rate combination for your own figures.",
        },
      ],
      internalLinks: [
        config.parent,
        { href: `/${config.caseSlug}`, label: `${config.treatment} Finance: Example Scenarios` },
        SHARED_LINKS.calculator,
        SHARED_LINKS.plans,
        METHODOLOGY_LINK,
        SHARED_LINKS.contact,
      ],
      references: COMMON_REFERENCES,
      disclaimer: COMMON_DISCLAIMER,
      lastUpdated: LAST_UPDATED,
    },
  ];
}

// Example scenarios ---------------------------------------------------------

const caseStudyConfigs = [
  {
    slug: "dental-implants-finance-example-scenarios",
    paymentSlug: "dental-implants-monthly-payments",
    treatment: "Dental Implants",
    primaryKeyword: "dental implant finance example",
    scenario: {
      label: "Illustrative scenario: replacing several missing back teeth",
      situation:
        "A patient is missing several back teeth and wants a fixed solution rather than a removable denture, but wants to understand the realistic monthly cost before committing.",
      recommendation: "4 implants with supporting crowns, staged over two visits with a healing period in between.",
      totalCost: 8200,
      depositAmount: 1200,
      terms: [24, 36],
    },
    parent: SHARED_LINKS.implants,
  },
  {
    slug: "veneers-finance-example-scenarios",
    paymentSlug: "veneers-monthly-payments",
    treatment: "Veneers",
    primaryKeyword: "veneers finance example",
    scenario: {
      label: "Illustrative scenario: a full smile cosmetic case",
      situation:
        "A patient wants a broader cosmetic change across the visible smile zone and is comparing porcelain against composite before deciding on a budget.",
      recommendation:
        "10 porcelain veneers across the upper visible teeth, following a mock-up stage to agree shade and shape.",
      totalCost: 5400,
      depositAmount: 750,
      terms: [18, 36],
    },
    parent: SHARED_LINKS.veneers,
  },
  {
    slug: "crowns-finance-example-scenarios",
    paymentSlug: "dental-crowns-monthly-payments",
    treatment: "Crowns",
    primaryKeyword: "dental crown finance example",
    scenario: {
      label: "Illustrative scenario: restorative work after root canal treatment",
      situation:
        "A patient needs crowns on three back teeth following root canal treatment and wants to know how the combined cost could be spread out.",
      recommendation:
        "3 crowns fitted after root canal treatment has settled, with temporary crowns worn in between visits.",
      totalCost: 2700,
      depositAmount: 400,
      terms: [12, 24],
    },
    parent: SHARED_LINKS.plans,
  },
];

const CASE_ALERT =
  "This is a hypothetical example scenario for illustration only. It is not a real patient case, testimonial or review, and no such patient exists.";

function buildCaseStudyPage(config) {
  const { scenario } = config;
  const financeAmount = scenario.totalCost - scenario.depositAmount;
  const termRows = scenario.terms.map((termMonths) => {
    const result = calculateMonthlyPayment({
      totalCost: scenario.totalCost,
      depositAmount: scenario.depositAmount,
      termMonths,
      apr: 0,
    });
    return [`${termMonths} months`, formatGbp(result.monthlyPayment), formatGbp(result.totalRepayable, 0)];
  });
  const intro =
    "The scenario below is a hypothetical, illustrative example written to show how a treatment plan, cost, deposit and repayment term can fit together. It does not describe a real patient, and no such patient exists.";

  return [
    config.slug,
    {
      slug: config.slug,
      title: `${config.treatment} Finance: Illustrative Example Scenarios`,
      type: "article",
      description: `Illustrative, hypothetical example scenarios showing how ${config.treatment.toLowerCase()} treatment cost, deposit and repayment term can work together. Not real patient stories.`,
      answerBlock: intro,
      keyTakeaways: [
        "This is a hypothetical scenario, not a real patient, testimonial or review.",
        `Total cost ${formatGbp(scenario.totalCost, 0)}, deposit ${formatGbp(scenario.depositAmount, 0)}, financed amount ${formatGbp(financeAmount, 0)}.`,
        "Figures use an illustrative 0% representative example.",
        "Real offers depend on the lender, your circumstances and a written, itemised quote.",
      ],
      summaryRows: [
        ["Scenario", scenario.label],
        ["Total cost", formatGbp(scenario.totalCost, 0)],
        ["Deposit", formatGbp(scenario.depositAmount, 0)],
        ["Amount financed", formatGbp(financeAmount, 0)],
      ],
      costTable: {
        title: "Repayment by term",
        description: "Illustrative monthly payment after deposit at a 0% representative APR.",
        headers: ["Term", "Monthly payment", "Total repayable (incl. deposit)"],
        rows: termRows,
      },
      sections: [
        { heading: "Important", body: CASE_ALERT },
        { heading: scenario.label, body: scenario.situation },
        { heading: "Illustrative treatment plan", body: scenario.recommendation },
      ],
      faqs: [
        {
          question: "Is this a real patient?",
          answer:
            "No. This is a hypothetical, illustrative scenario written to demonstrate how treatment cost, deposit and repayment terms interact. It is not a testimonial, review or real case.",
        },
        {
          question: "Will real patient examples be added here?",
          answer:
            "If we publish genuine, consented, anonymised patient examples in future, they will be clearly identified as real cases, separate from the illustrative scenario above.",
        },
      ],
      internalLinks: [
        config.parent,
        { href: `/${config.paymentSlug}`, label: `${config.treatment} Monthly Payments` },
        SHARED_LINKS.calculator,
        METHODOLOGY_LINK,
        SHARED_LINKS.contact,
      ],
      references: COMMON_REFERENCES,
      disclaimer: `${CASE_ALERT} ${COMMON_DISCLAIMER}`,
      lastUpdated: LAST_UPDATED,
    },
  ];
}

// Full mouth implants calculator ---------------------------------------------

const fullMouthCalculatorEntry = [
  "full-mouth-implants-finance-calculator",
  {
    slug: "full-mouth-implants-finance-calculator",
    title: "Full Mouth Implants Finance Calculator | Illustrative Monthly Payment Tool",
    type: "calculator",
    description:
      "Use this free full mouth implants finance calculator to see an illustrative monthly payment, total repayable and total interest before you enquire.",
    answerBlock:
      "Enter an example full mouth implants cost, deposit and term to see an illustrative monthly payment. This tool is for planning only, not a real quote.",
    keyTakeaways: [
      "The calculator is pre-set to a £14,500 financed amount (a £16,000 example cost less a £1,500 deposit) over 48 months at an illustrative 9.9% APR.",
      "Enter the amount you would finance after any deposit.",
      "Full mouth treatment is usually priced as a package, so confirm what the quote includes.",
      "All results are indicative. Always get a written, itemised quote.",
    ],
    summaryRows: [
      ["Example cost", "£16,000"],
      ["Example deposit", "£1,500"],
      ["Amount financed", "£14,500"],
      ["Default term and APR", "48 months at 9.9% (illustrative)"],
    ],
    calculatorConfig: { defaultAmount: 14500, defaultApr: 9.9, defaultTerm: 48 },
    scenarios: [],
    aprExamples: [0, 6.9, 9.9, 12.9].map((apr) => {
      const result = calculateMonthlyPayment({ totalCost: 14500, termMonths: 48, apr });
      return {
        apr: `${apr}% APR`,
        monthly: formatGbp(result.monthlyPayment),
        total: formatGbp(result.totalRepayable),
        interest: formatGbp(result.totalInterest),
      };
    }),
    savingsExample: null,
    sections: [
      {
        heading: "How to use this calculator",
        body: "Enter the amount you expect to finance after any deposit, choose a term and set an APR to see an illustrative monthly payment.",
      },
      {
        heading: "What full mouth implant quotes usually involve",
        items: [
          "Rehabilitating a full arch or full mouth usually needs several implants per jaw, priced as a package rather than per tooth.",
          "Provisional teeth are normally fitted first, with the final fixed bridge made once the implants have healed.",
          "Sedation, extractions and extensive diagnostics are more likely to be needed than with single-tooth implants.",
        ],
      },
      {
        heading: "What this estimate includes",
        body: "Calculator outputs are indicative and do not replace lender-specific illustrations or representative examples.",
      },
    ],
    faqs: [
      {
        question: "Is this a real quote for full mouth implants?",
        answer:
          "No. Every figure is illustrative and for planning only. See our cost and calculator methodology for how the defaults are set, then get a written quote from a clinic before deciding.",
      },
      {
        question: "Can I get full mouth dental implants on finance in the UK?",
        answer:
          "Some clinics offer finance for full mouth implant rehabilitation, but because of the higher total cost, approval is subject to a fuller status, eligibility, affordability and lender approval check.",
      },
    ],
    internalLinks: [
      SHARED_LINKS.calculator,
      SHARED_LINKS.implants,
      { href: "/dental-implants-monthly-payments", label: "Dental Implants Monthly Payments" },
      METHODOLOGY_LINK,
      SHARED_LINKS.contact,
    ],
    references: COMMON_REFERENCES,
    disclaimer: COMMON_DISCLAIMER,
    lastUpdated: LAST_UPDATED,
  },
];

// Methodology ---------------------------------------------------------------

const methodologyEntry = [
  "cost-and-calculator-methodology",
  {
    slug: "cost-and-calculator-methodology",
    title: "Cost and Calculator Methodology",
    type: "policy",
    description:
      "How the figures on Dental Finance UK are calculated: formula, default APR assumption, Turkey comparison assumptions, source and last review date.",
    answerBlock:
      "All figures on this site are illustrative examples for planning purposes only, not a live pricing feed and not quotes from a specific lender or clinic. This page explains how they are worked out.",
    keyTakeaways: [
      "No figure on this site should be read as a real quote from a named clinic or lender.",
      "Always request a written, itemised quote before making a decision.",
      "Use the calculators to compare structures (deposit, term, rate), not to predict your exact price.",
      `Last reviewed: ${calculationAssumptions.lastReviewed}.`,
    ],
    summaryRows: [
      ["Formula", "Standard reducing-balance loan calculation"],
      ["Default illustrative APR", "9.9%"],
      ["Real rate range (indicative)", "Roughly 0%-14.9%"],
      ["Last reviewed", calculationAssumptions.lastReviewed],
    ],
    sections: [
      { heading: "Source", body: calculationAssumptions.source },
      {
        heading: "Calculation method",
        body: calculationAssumptions.methodology,
      },
      { heading: "Rate assumption", body: calculationAssumptions.aprAssumption },
      { heading: "Turkey comparison assumption", body: calculationAssumptions.turkeyAssumption },
      {
        heading: "How to use the figures",
        items: [
          "No figure on this site should be read as a real quote from a named clinic or lender",
          "Always request a written, itemised quote before making a decision",
          "Use the calculators to compare structures (deposit, term, rate), not to predict your exact price",
        ],
      },
    ],
    faqs: [
      {
        question: "Are the figures on this site real prices?",
        answer:
          "No. They are illustrative planning figures set by the editorial team, not live prices or quotes from a specific clinic or lender.",
      },
      {
        question: "What APR do the calculators assume?",
        answer:
          "Unless you change it, an illustrative 9.9% APR representing a mid-range third-party dental finance rate. Real rates range roughly 0%-14.9% depending on the lender, term and your credit profile.",
      },
    ],
    internalLinks: [SHARED_LINKS.calculator, SHARED_LINKS.disclosure, SHARED_LINKS.plans],
    references: COMMON_REFERENCES,
    disclaimer: COMMON_DISCLAIMER,
    lastUpdated: LAST_UPDATED,
  },
];

export const clusterPageEntries = [
  ...badCreditEntries,
  fullMouthCalculatorEntry,
  ...paymentScheduleConfigs.map(buildPaymentSchedulePage),
  ...caseStudyConfigs.map(buildCaseStudyPage),
  methodologyEntry,
];

export const clusterCalculatorHubLinks = [
  {
    href: "/full-mouth-implants-finance-calculator",
    label: "Full Mouth Implants Finance Calculator",
    description: "Estimate monthly repayments for full mouth implant rehabilitation across longer term lengths.",
  },
];

// Pages here that replace an existing slug keep the existing FAQs and references
// instead of discarding them.
export function mergeClusterPages(pageMap) {
  const merged = { ...pageMap };
  for (const [slug, page] of clusterPageEntries) {
    const existing = merged[slug];
    if (!existing) {
      merged[slug] = page;
      continue;
    }
    const seen = new Set(page.faqs.map((faq) => faq.question));
    merged[slug] = {
      ...page,
      faqs: [...page.faqs, ...(existing.faqs ?? []).filter((faq) => !seen.has(faq.question))],
      references: [...new Set([...(page.references ?? []), ...(existing.references ?? [])])],
    };
  }
  return merged;
}
