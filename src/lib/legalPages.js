// Legal and trust pages. Operator details come only from operator.js.
// Rules followed here:
//  - Only facts the operator has confirmed, or that are true of the code as built.
//  - Unknowns (retention periods, transfer safeguards, UK representative, governing law)
//    are stated as open, never invented. See docs/legal/10-solicitor-review-list.md.
//  - No claim of FCA authorisation, exemption, clinical review or whole-of-market coverage.
import { COMMERCIAL_DISCLOSURE, OPERATOR, OPERATOR_STATUS, formatOperatorAddress } from "./operator.js";

const LAST_UPDATED = "2026-10-16";
const ADDRESS = formatOperatorAddress();

const REFS = {
  fca: "Financial Conduct Authority: the FCA Register and guidance for consumers",
  moneyHelper: "MoneyHelper: free, impartial guidance on borrowing and credit",
  ico: "Information Commissioner's Office (ICO): your data protection rights and how to complain",
  ukGdpr: "UK GDPR and the Data Protection Act 2018",
  pecr: "Privacy and Electronic Communications Regulations (PECR): cookies and similar technologies",
  asa: "Advertising Standards Authority / CAP Code: recognising advertising",
  wcag: "W3C Web Content Accessibility Guidelines (WCAG) 2.2",
};

const DISCLAIMER = `${OPERATOR_STATUS} Information on this site is general and is not personal financial, legal or clinical advice.`;

const LINK = {
  about: { href: "/about-us", label: "About Us" },
  legal: { href: "/legal-notice", label: "Legal Notice" },
  terms: { href: "/terms", label: "Terms" },
  privacy: { href: "/privacy-policy", label: "Privacy Policy" },
  cookies: { href: "/cookie-policy", label: "Cookie Policy" },
  affiliate: { href: "/affiliate-disclosure", label: "Affiliate Disclosure" },
  editorial: { href: "/editorial-policy", label: "Editorial Policy" },
  disclaimer: { href: "/disclaimer", label: "Disclaimer" },
  contact: { href: "/contact", label: "Contact" },
  complaints: { href: "/complaints-and-corrections", label: "Complaints and Corrections" },
  accessibility: { href: "/accessibility", label: "Accessibility" },
  compare: { href: "/how-we-compare", label: "How We Compare" },
  disclosure: { href: "/financial-disclosure", label: "Financial Disclosure" },
  medical: { href: "/medical-review-policy", label: "Medical Review Policy" },
  method: { href: "/cost-and-calculator-methodology", label: "Cost and Calculator Methodology" },
  providers: { href: "/finance-providers", label: "Finance Providers Hub" },
};

const operatorRows = [
  ["Website", OPERATOR.siteName],
  ["Operator", OPERATOR.legalName],
  ["Registered address", ADDRESS],
  ["MERSİS number", OPERATOR.mersis],
  ["Email", OPERATOR.email],
  ["Telephone", OPERATOR.phone],
  ["FCA status", "Not authorised by the FCA"],
];

function section(heading, paragraphs, items) {
  return { heading, ...(paragraphs?.length ? { paragraphs } : {}), ...(items?.length ? { items } : {}) };
}

function page(config) {
  return [
    config.slug,
    {
      type: "policy",
      references: [REFS.fca, REFS.moneyHelper],
      disclaimer: DISCLAIMER,
      lastUpdated: LAST_UPDATED,
      ...config,
    },
  ];
}

const aboutUs = page({
  slug: "about-us",
  title: "About Dental Finance UK",
  description: `About Dental Finance UK: an educational website about paying for dental treatment in the UK, operated by ${OPERATOR.shortName}. We are not a lender or credit broker.`,
  answerBlock: `Dental Finance UK publishes educational guides and illustrative calculators about the cost of dental treatment and ways to pay for it in the UK. The website is operated by ${OPERATOR.legalName}, a digital publishing and marketing company based in ${OPERATOR.country}. We are not a lender, credit broker or financial adviser, we are not authorised by the FCA, and we do not arrange or approve credit.`,
  keyTakeaways: [
    "We publish general information and illustrative tools only.",
    "We do not lend, broker, arrange or approve finance, and we are not authorised by the FCA.",
    "We do not provide dental treatment or clinical advice.",
    "Multiligo receives paid marketing service fees from some dental clinics; see our Affiliate Disclosure.",
  ],
  summaryRows: operatorRows,
  sections: [
    section("What we do", [
      "We explain how dental payment plans and finance generally work, what affects the cost, how credit checks work and what to ask before signing anything. Our calculators estimate repayments from figures you enter, using a published method.",
    ]),
    section("What we do not do", null, [
      "We do not make lending decisions, assess eligibility or recommend a specific loan or plan.",
      "We do not introduce you to lenders or credit brokers or pass your details to them.",
      "We do not provide dental treatment, diagnosis or clinical advice.",
      "We do not give personal financial, legal or tax advice.",
    ]),
    section("Who runs the site", [
      `${OPERATOR.legalName} (${OPERATOR.shortName}) operates this website. ${OPERATOR.shortName} is a digital publishing, technology and marketing company established in ${OPERATOR.foundingYear} and based in ${OPERATOR.country}. Content is published by the DentalFinanceUK Editorial Team under our editorial policy.`,
      "Being based outside the UK does not change the UK rules that apply to content aimed at UK readers. We keep the site educational and do not carry out regulated credit activity.",
    ]),
    section("Commercial relationships", [COMMERCIAL_DISCLOSURE, "These relationships do not change how we describe finance options. Read the full Affiliate Disclosure for details."], [
      { text: "Affiliate Disclosure", href: "/affiliate-disclosure" },
      { text: "How We Compare", href: "/how-we-compare" },
    ]),
  ],
  faqs: [
    { question: "Are you a lender or a broker?", answer: "No. We are an educational website. We do not provide, arrange or broker credit and we are not authorised by the FCA." },
    { question: "Who answers WhatsApp messages?", answer: `The ${OPERATOR.shortName} team. Messages are not passed to lenders or credit brokers.` },
  ],
  internalLinks: [LINK.legal, LINK.editorial, LINK.affiliate, LINK.compare, LINK.contact, LINK.disclosure],
});

const legalNotice = page({
  slug: "legal-notice",
  title: "Legal Notice",
  description: `Legal notice for Dental Finance UK: operator identity, registered details, contact routes and responsibility for content. Operated by ${OPERATOR.shortName}.`,
  answerBlock: `This website, ${OPERATOR.siteName}, is operated and published by ${OPERATOR.legalName}, registered in ${OPERATOR.country}. The details below identify who is responsible for the site and how to contact us.`,
  keyTakeaways: [
    `Operator and publisher: ${OPERATOR.legalName}.`,
    "Not authorised by the FCA; no regulated credit activity is carried out on this site.",
    `Contact: ${OPERATOR.email}.`,
    "Content is protected by copyright; see Terms for permitted use.",
  ],
  summaryRows: operatorRows,
  sections: [
    section("Responsibility for content", [
      `${OPERATOR.shortName} is responsible for the content published on this website. Content is prepared by the DentalFinanceUK Editorial Team. If you believe something is inaccurate, please use our complaints and corrections process.`,
    ]),
    section("Regulatory status", [
      "We are not authorised or regulated by the Financial Conduct Authority. We do not carry out regulated credit activities such as lending or credit broking, and we do not approve financial promotions for others. You can check any firm's status on the FCA Register.",
    ]),
    section("Intellectual property", [
      "Text, tables, calculators and design on this site are owned by or licensed to the operator. You may view and print pages for personal, non-commercial use. Any other use needs our written permission, except where the law allows it.",
    ]),
    section("Liability", [
      "We take care to keep content accurate, but it is general information and may not suit your circumstances. Nothing in this notice limits any liability that cannot be limited by law or affects your statutory rights.",
    ]),
  ],
  faqs: [
    { question: "How do I contact the operator?", answer: `Email ${OPERATOR.email} or use the contact page. For corrections or complaints, see our complaints and corrections page.` },
  ],
  internalLinks: [LINK.about, LINK.terms, LINK.privacy, LINK.complaints, LINK.contact],
});

const terms = page({
  slug: "terms",
  title: "Terms of Use",
  description: "Terms of use for Dental Finance UK: what the site provides, calculator limits, external links, intellectual property and your statutory rights.",
  answerBlock: `These terms explain how you may use ${OPERATOR.siteName}, which is operated by ${OPERATOR.legalName}. The site provides general educational information and illustrative tools. It does not provide financial advice, credit or dental treatment, and nothing in these terms affects your statutory rights.`,
  keyTakeaways: [
    "The site is educational; it is not a lender, broker or adviser.",
    "Calculator results are illustrative estimates, not offers.",
    "External sites are not controlled by us.",
    "Your rights under UK consumer law are not affected.",
  ],
  summaryRows: [
    ["Operator", OPERATOR.legalName],
    ["Service", "Free educational content and illustrative calculators"],
    ["Advice", "None; general information only"],
    ["Your rights", "Statutory rights are not affected"],
  ],
  sections: [
    section("What the site provides", [
      "General information about the cost of dental treatment and ways to pay, and calculators that estimate repayments from figures you enter. We do not provide personalised recommendations, credit, credit broking, insurance or dental treatment, and we have no lender relationships.",
    ]),
    section("Calculators and figures", [
      "Calculator results and examples are illustrative, based on the inputs and assumptions shown. They are not quotes, offers or approvals. A lender will set its own rate and terms after assessing you. See our cost and calculator methodology.",
    ]),
    section("Using the site", null, [
      "Use the site lawfully and do not attempt to disrupt or misuse it.",
      "Do not copy content for commercial use without permission.",
      "Do not send us credit reports, bank statements, identity documents or medical records.",
    ]),
    section("External links", [
      "Links to other websites, including WhatsApp, are provided for convenience. We do not control those sites and are not responsible for their content or practices.",
    ]),
    section("Corrections and changes", [
      "We may update content and these terms. The date at the top of each page shows when it was last updated. Report errors through our complaints and corrections page.",
    ]),
    section("Your rights", [
      "Nothing in these terms excludes or limits liability that cannot be excluded or limited by law, or affects your rights under UK consumer protection law.",
    ]),
  ],
  faqs: [
    { question: "Is using the site free?", answer: "Yes. We do not charge you to read our guides or use our calculators." },
    { question: "Can I rely on the calculator result?", answer: "Only as an illustration. Your actual terms come from a lender after it assesses your application." },
  ],
  internalLinks: [LINK.legal, LINK.privacy, LINK.disclaimer, LINK.method, LINK.complaints],
});

const privacy = page({
  slug: "privacy-policy",
  title: "Privacy Policy",
  description: `How ${OPERATOR.shortName} collects and uses personal data on Dental Finance UK: contact form, WhatsApp, hosting logs, your UK GDPR rights and how to complain.`,
  answerBlock: `${OPERATOR.legalName} is the controller of personal data collected through this website. We collect only what you choose to send us, mainly through the contact form or WhatsApp, and use it to reply to you. We do not pass your details to lenders or credit brokers, and our calculators run in your browser without sending your figures to us.`,
  keyTakeaways: [
    `Controller: ${OPERATOR.legalName}, ${OPERATOR.email}.`,
    "Calculator inputs stay in your browser and are not sent to us.",
    "We do not share enquiries with lenders or credit brokers.",
    "You can complain to the ICO if you are unhappy with how we handle your data.",
  ],
  summaryRows: [
    ["Controller", OPERATOR.legalName],
    ["Contact", OPERATOR.email],
    ["Calculator data", "Processed in your browser only"],
    ["Analytics and advertising cookies", "None in use"],
    ["Data shared with lenders", "None"],
  ],
  sections: [
    section("What we collect and why", null, [
      "Contact form: your name, email, optional phone number, your answers to the form questions and your message. We use this to reply to your enquiry.",
      "WhatsApp: if you choose to message us, WhatsApp shares your phone number, profile name and messages with us. We use these to reply. Our WhatsApp links do not include your calculator figures. The \"find clinics within your budget\" form opens WhatsApp with only the budget and treatment type you typed, and nothing is sent until you press send in WhatsApp.",
      "Technical data: our hosting provider processes basic request data such as IP address and browser details to deliver and secure the site.",
    ]),
    section("Lawful basis", [
      "We rely on our legitimate interests in responding to enquiries you send us and in running a secure website. If we introduce analytics or other non-essential technologies, we will ask for your consent first.",
    ]),
    section("Who receives your data", null, [
      "Formspree, which processes contact form submissions on our behalf.",
      "WhatsApp (Meta), when you choose to contact us there; WhatsApp's own privacy terms apply to your use of WhatsApp.",
      "Vercel, which hosts the website.",
      "Our team in Türkiye, who read and answer enquiries.",
    ]),
    section("International transfers", [
      "Our team is based in Türkiye and some of our service providers operate outside the UK, including in the United States. This means your data may be processed outside the UK. We are confirming the safeguards that apply to each transfer and will set them out here.",
    ]),
    section("How long we keep data", [
      "We keep enquiries for as long as needed to deal with them. We are finalising specific retention periods and will publish them here. You can ask us to delete your data at any time.",
    ]),
    section("Your rights", [
      "Under UK data protection law you can ask to access, correct or delete your data, restrict or object to processing, and ask for data portability where it applies. Email us to make a request.",
      "You can complain to the Information Commissioner's Office (ICO). We would appreciate the chance to deal with your concern first.",
    ]),
    section("UK representative", [
      "We are an organisation based outside the UK. We are reviewing whether we need to appoint a UK representative under UK data protection law and will publish their details here if one is appointed.",
    ]),
  ],
  faqs: [
    { question: "Do you share my details with lenders?", answer: "No. We do not pass your details to lenders or credit brokers." },
    { question: "Do your calculators store my figures?", answer: "No. Calculations run in your browser. If you use a shareable link, your figures appear in the link you copy, so share it with care." },
  ],
  internalLinks: [LINK.cookies, LINK.contact, LINK.legal, LINK.terms, LINK.complaints],
  references: [REFS.ukGdpr, REFS.ico],
});

const cookies = page({
  slug: "cookie-policy",
  title: "Cookie Policy",
  description: "Which cookies and similar technologies Dental Finance UK uses. We do not currently use analytics, advertising or affiliate cookies.",
  answerBlock: "Dental Finance UK does not currently set analytics, advertising or affiliate tracking cookies. If we add any non-essential cookies or similar technologies in future, we will ask for your consent first and explain them here.",
  keyTakeaways: [
    "No analytics, advertising or affiliate cookies are in use.",
    "Non-essential technologies will only be used with your consent.",
    "External services you choose to use, such as WhatsApp, have their own policies.",
  ],
  summaryRows: [
    ["Essential cookies", "None set by this site"],
    ["Analytics cookies", "None"],
    ["Advertising or affiliate cookies", "None"],
    ["Consent", "Will be requested before any non-essential use"],
  ],
  sections: [
    section("What we use today", [
      "Pages and calculators work without setting cookies. Calculator figures are kept in the page address while you use a calculator so that the result can be shared; they are not sent to us.",
    ]),
    section("Third-party services", [
      "If you choose to message us on WhatsApp or submit the contact form, those services may use their own cookies or similar technologies under their own policies.",
    ]),
    section("Changes", [
      "If we add analytics or other non-essential technologies, we will add a consent choice, list each technology, its purpose and duration here, and let you change your choice at any time.",
    ]),
  ],
  faqs: [{ question: "Do you track me with cookies?", answer: "No. We do not currently use analytics, advertising or affiliate cookies." }],
  internalLinks: [LINK.privacy, LINK.legal, LINK.terms],
  references: [REFS.pecr, REFS.ico],
});

const affiliate = page({
  slug: "affiliate-disclosure",
  title: "Affiliate Disclosure and Commercial Relationships",
  description: "How Dental Finance UK and its operator Multiligo make money, which commercial relationships exist, and how we keep them separate from our content.",
  answerBlock: `We do not use affiliate links and we do not receive payments from lenders, credit brokers or finance providers. ${OPERATOR.shortName}, which operates this website, receives paid marketing service fees from some dental clinics, including clinics in ${OPERATOR.country}. We tell you about this wherever we invite you to contact us.`,
  keyTakeaways: [
    "No affiliate links and no payments from lenders or credit brokers.",
    `${OPERATOR.shortName} is paid by some dental clinics for marketing services.`,
    "This is disclosed next to our WhatsApp and enquiry options.",
    "If we ever add affiliate or sponsored links, they will be labelled where they appear.",
  ],
  summaryRows: [
    ["Affiliate links", "None"],
    ["Payments from lenders or brokers", "None"],
    ["Payments from dental clinics", `Yes: paid marketing services provided by ${OPERATOR.shortName}`],
    ["Sponsored content", "None"],
  ],
  sections: [
    section("Why this matters", [
      "Some of our content discusses dental treatment abroad, including in Türkiye. Because our operator is paid by some dental clinics for marketing, we want you to be able to weigh our content with that in mind.",
    ]),
    section("How we manage the conflict", null, [
      "Guides describe risks, aftercare and total costs of treatment abroad, not only savings.",
      "We do not recommend a specific clinic in our guides.",
      "Finance content is written without reference to any clinic client.",
      "Enquiry options state who answers and that the operator is paid by some clinics.",
    ]),
    section("If this changes", [
      "If we add affiliate links, sponsored content or any arrangement with a finance or insurance provider, we will update this page first and label the relevant links where they appear. Finance-related arrangements would be reviewed for UK regulatory requirements before going live.",
    ]),
  ],
  faqs: [
    { question: "Do lenders pay you?", answer: "No. We have no payment arrangements with lenders, credit brokers or finance providers." },
    { question: "Do clinics pay you?", answer: `${OPERATOR.shortName}, the operator, provides paid marketing services to some dental clinics, including clinics in Türkiye.` },
  ],
  internalLinks: [LINK.compare, LINK.editorial, LINK.about, LINK.disclosure],
  references: [REFS.asa],
});

const editorial = page({
  slug: "editorial-policy",
  title: "Editorial Policy",
  description: "How Dental Finance UK researches, writes, sources, updates and corrects its guides, and how commercial interests are kept separate from editorial content.",
  answerBlock: `Our guides are written by the DentalFinanceUK Editorial Team and published by ${OPERATOR.shortName} as general information about paying for dental treatment in the UK. We use UK sources, show our calculation method, correct errors and keep commercial relationships out of editorial decisions.`,
  keyTakeaways: [
    "Published by the Editorial Team; no named individual experts or reviewers.",
    "UK primary sources preferred (FCA, MoneyHelper, NHS, ICO).",
    "Illustrative figures follow a published method.",
    "Commercial relationships are disclosed and do not decide content.",
  ],
  summaryRows: [
    ["Publisher", OPERATOR.legalName],
    ["Authors", "DentalFinanceUK Editorial Team"],
    ["Clinical or financial review", "None by named professionals"],
    ["Corrections", "Via our complaints and corrections page"],
  ],
  sections: [
    section("Sources and accuracy", [
      "We prefer official and primary UK sources, such as the FCA, MoneyHelper, the NHS and the ICO. Where sources conflict or rules change, we say so and update the page. We do not quote prices or rates as facts unless we can source and date them; examples are labelled as illustrative.",
    ]),
    section("Reviewers and credentials", [
      "We do not show named authors or reviewers, and we do not claim financial or clinical review, because none has been carried out by a named, verifiable professional. If that changes, the reviewer's name and credentials will be shown on the pages they reviewed.",
    ]),
    section("Commercial influence", [
      "Our operator is paid by some dental clinics for marketing services. Editorial content does not recommend specific clinics, and finance guides are written independently of any client. We do not publish sponsored content, testimonials, reviews or ratings we cannot substantiate.",
    ]),
    section("Updates and corrections", [
      "Pages show a last updated date, which changes when content changes. Report an error through our complaints and corrections page and we will review and correct it where appropriate.",
    ]),
  ],
  faqs: [
    { question: "Who writes the content?", answer: "The DentalFinanceUK Editorial Team, published by Multiligo." },
    { question: "Is your content advice?", answer: "No. It is general information. Speak to a regulated adviser, the lender or your dentist about your situation." },
  ],
  internalLinks: [LINK.affiliate, LINK.compare, LINK.complaints, LINK.medical, LINK.method, { href: "/authors", label: "Authors and Editorial Team" }],
});

const disclaimer = page({
  slug: "disclaimer",
  title: "Medical and Financial Information Disclaimer",
  description: "Our content is general information, not personal financial, credit or clinical advice. How to use our guides and calculators safely.",
  answerBlock: "Information on Dental Finance UK is general and educational. It is not personal financial advice, not a lending decision and not clinical advice. Calculator results are illustrations only. Speak to a lender, a regulated adviser or a registered dentist about your own situation.",
  keyTakeaways: [
    "General information is not personal advice.",
    "Only a lender can decide whether to lend and on what terms.",
    "Only a registered dentist can diagnose and recommend treatment.",
    "Calculator results are illustrative.",
  ],
  summaryRows: [
    ["General financial information", "What we provide"],
    ["Personal financial advice", "Not provided"],
    ["Lending decisions", "Made only by lenders"],
    ["Clinical advice", "Not provided; consult a registered dentist"],
  ],
  sections: [
    section("Financial information", [
      "We explain how finance generally works. We do not consider your circumstances, recommend products or tell you whether you will be approved. Free, impartial help is available from MoneyHelper.",
    ]),
    section("Clinical information", [
      "Treatment descriptions are general and help explain what a quote may include. They are not clinical advice and have not been clinically reviewed. Check a dentist's registration with the General Dental Council.",
    ]),
    section("Illustrative calculations", [
      "Examples and calculator results use the method on our methodology page and the figures you enter. Real offers can differ because of fees, rates and the lender's assessment.",
    ]),
    section("This disclaimer is not a substitute for regulation", [
      "This page explains the limits of our content. It does not change the legal nature of anything we do, and we keep the site educational rather than offering regulated services.",
    ]),
  ],
  faqs: [{ question: "Can I rely on your guides to choose a loan?", answer: "Use them to understand options and questions to ask. Decisions should be based on the lender's own documents and, if needed, regulated advice." }],
  internalLinks: [LINK.method, LINK.medical, LINK.terms, LINK.editorial],
  references: [REFS.moneyHelper, "General Dental Council: register of dental professionals"],
});

const contact = page({
  slug: "contact",
  title: "Contact Dental Finance UK",
  description: `Contact the Dental Finance UK team at ${OPERATOR.shortName}: email, phone, WhatsApp and our enquiry form. We are not a lender and cannot assess finance applications.`,
  answerBlock: `You can contact the ${OPERATOR.shortName} team, which operates Dental Finance UK, by email, phone, WhatsApp or the form below. We can answer questions about our content. We are not a lender or credit broker and cannot assess or arrange finance.`,
  keyTakeaways: [
    `Email: ${OPERATOR.email}`,
    `Phone: ${OPERATOR.phone}`,
    `WhatsApp: ${OPERATOR.whatsappDisplay}`,
    "Please do not send credit reports, bank statements, ID documents or medical records.",
  ],
  summaryRows: [
    ["Operator", OPERATOR.legalName],
    ["Email", OPERATOR.email],
    ["Telephone", OPERATOR.phone],
    ["WhatsApp", OPERATOR.whatsappDisplay],
    ["Address", ADDRESS],
  ],
  sections: [
    section("Before you contact us", [COMMERCIAL_DISCLOSURE, "To report an error or make a complaint about the website, see our complaints and corrections page. Read our privacy policy to see how we handle your message."], [
      { text: "Privacy Policy", href: "/privacy-policy" },
      { text: "Complaints and Corrections", href: "/complaints-and-corrections" },
    ]),
  ],
  faqs: [
    { question: "Can you tell me if I will be approved for finance?", answer: "No. Only a lender can decide that after assessing your application. We are an information website." },
    { question: "Who will reply?", answer: `The ${OPERATOR.shortName} team in ${OPERATOR.country}.` },
  ],
  internalLinks: [LINK.privacy, LINK.complaints, LINK.about, LINK.affiliate],
});

const complaints = page({
  slug: "complaints-and-corrections",
  title: "Complaints and Corrections",
  description: "How to report a factual error, raise an editorial or website concern, or make a privacy complaint about Dental Finance UK.",
  answerBlock: `To report an error or complain about this website, email ${OPERATOR.email} with the page address and what is wrong. This is an editorial and website process. It is not an FCA-regulated complaints process, because we do not provide regulated financial services.`,
  keyTakeaways: [
    "Report errors and concerns by email with the page link.",
    "We review, correct where appropriate and update the page date.",
    "Privacy complaints can also go to the ICO.",
    "Complaints about a lender or a loan should go to that lender, then the Financial Ombudsman Service.",
  ],
  summaryRows: [
    ["Corrections and editorial concerns", OPERATOR.email],
    ["Website operation", OPERATOR.email],
    ["Privacy concerns", `${OPERATOR.email}, or the ICO`],
    ["Complaints about a lender", "The lender, then the Financial Ombudsman Service"],
  ],
  sections: [
    section("How to raise a concern", null, [
      "Tell us the page address and what you think is wrong or what concerns you.",
      "Include any source that supports a correction.",
      "We will review it, reply, and correct the page where appropriate.",
    ]),
    section("What this process is not", [
      "We do not provide loans, credit broking or financial advice, so we are not covered by the Financial Ombudsman Service. If your complaint is about a lender, a loan or a dental practice, contact that business first. Unresolved complaints about regulated financial firms can go to the Financial Ombudsman Service.",
    ]),
  ],
  faqs: [{ question: "Do you correct mistakes?", answer: "Yes. If a page is wrong we correct it and update its last updated date." }],
  internalLinks: [LINK.editorial, LINK.privacy, LINK.contact, LINK.legal],
  references: [REFS.ico, "Financial Ombudsman Service: complaints about financial businesses"],
});

const accessibility = page({
  slug: "accessibility",
  title: "Accessibility Statement",
  description: "Accessibility of Dental Finance UK: the standard we aim for, known limitations and how to report a problem.",
  answerBlock: "We want Dental Finance UK to be usable by as many people as possible. We aim to meet WCAG 2.2 level AA. We have not yet completed a formal accessibility audit, so some parts may not fully meet the standard. Tell us about any problem and we will try to fix it.",
  keyTakeaways: [
    "Target: WCAG 2.2 level AA.",
    "No formal audit has been completed yet.",
    "Known limitations are listed below.",
    `Report problems to ${OPERATOR.email}.`,
  ],
  summaryRows: [
    ["Target standard", "WCAG 2.2 AA"],
    ["Formal audit", "Not yet carried out"],
    ["Report a problem", OPERATOR.email],
  ],
  sections: [
    section("What we have done", null, [
      "Pages use headings, landmarks and breadcrumbs to help navigation.",
      "Calculator inputs have labels and work with a keyboard.",
      "We have increased text contrast in key areas.",
    ]),
    section("Known limitations", null, [
      "Some wide tables need horizontal scrolling on small screens.",
      "WhatsApp and other external services are outside our control.",
      "Some decorative images may lack detailed descriptions.",
    ]),
  ],
  faqs: [{ question: "How do I report an accessibility problem?", answer: `Email ${OPERATOR.email} with the page address and a description of the problem.` }],
  internalLinks: [LINK.contact, LINK.legal],
  references: [REFS.wcag],
});

const howWeCompare = page({
  slug: "how-we-compare",
  title: "How We Compare Dental Finance Providers",
  description: "How Dental Finance UK selects and describes dental finance providers: inclusion rules, data sources, update frequency, limits and commercial relationships.",
  answerBlock: "Our provider pages describe some companies that offer finance through UK dental practices, using information they publish. They are not a whole-of-market comparison, they do not rank providers for your circumstances, and we receive no payment from any provider.",
  keyTakeaways: [
    "Not whole of market: only some providers are covered.",
    "No payments from any provider; no affiliate links.",
    "Information comes from providers' own public materials and may change.",
    "Always check current terms directly with the provider.",
  ],
  summaryRows: [
    ["Coverage", "Selected providers; not whole of market"],
    ["Data sources", "Providers' own public information"],
    ["Ranking", "No ranking of named providers for individuals"],
    ["Payments from providers", "None"],
    ["Update frequency", "No fixed schedule; see each page's date"],
  ],
  sections: [
    section("Which providers we include", [
      "We include providers that, from their public information, offer finance for dental treatment through UK practices. Inclusion is not a recommendation, and exclusion is not a judgement.",
    ]),
    section("How we describe them", [
      "Profiles summarise how a provider positions itself and what to check, such as representative APR, total repayable, search type and early repayment. We do not verify provider claims independently and do not show live rates.",
    ]),
    section("About our fit-based framework", [
      "Some pages explain how a clinic or patient could rank providers against their own criteria. These describe a method; they are not our ranking of named providers.",
    ]),
    section("Commercial relationships", [
      "We have no affiliate or payment arrangements with any finance provider. Our operator is paid by some dental clinics for marketing services; see our Affiliate Disclosure.",
    ]),
  ],
  faqs: [
    { question: "Is this a whole-of-market comparison?", answer: "No. We cover only some providers." },
    { question: "Are providers ranked?", answer: "No. We explain a method you can use to compare providers against your own needs; we do not rank named providers for you." },
  ],
  internalLinks: [LINK.providers, LINK.affiliate, LINK.editorial, LINK.disclosure],
});

const financialDisclosure = page({
  slug: "financial-disclosure",
  title: "Financial Disclosure",
  description: `Financial disclosure for Dental Finance UK: operated by ${OPERATOR.shortName}, not a lender or credit broker, not authorised by the FCA, no payments from lenders.`,
  answerBlock: `Dental Finance UK is an information website operated by ${OPERATOR.legalName}. We do not provide, arrange or approve credit, we are not authorised by the FCA, and nothing on this site is personal advice or an offer of credit. We receive no payments from lenders or credit brokers.`,
  keyTakeaways: [
    "We are not a lender or credit broker and are not authorised by the FCA.",
    "No payments from lenders, brokers or finance providers.",
    "Examples and calculators are illustrative, not offers.",
    "Third-party lenders set their own eligibility, rates and terms.",
  ],
  summaryRows: [
    ["Operator", OPERATOR.legalName],
    ["FCA status", "Not authorised by the FCA"],
    ["Credit activity", "None: we do not lend, broker or arrange credit"],
    ["Payments from lenders", "None"],
  ],
  sections: [
    section("What this means for you", [
      "We cannot assess your eligibility, tell you whether you will be approved or recommend a specific product. Use our guides to understand options, then speak to your dentist and to a lender. You can check any lender on the FCA Register.",
    ]),
    section("Commercial relationships", [COMMERCIAL_DISCLOSURE], [{ text: "Affiliate Disclosure", href: "/affiliate-disclosure" }]),
  ],
  faqs: [{ question: "Where can I check whether a lender is authorised?", answer: "On the FCA Register on the Financial Conduct Authority's website." }],
  internalLinks: [LINK.about, LINK.affiliate, LINK.disclaimer, LINK.method],
});

export const legalPageEntries = [
  aboutUs,
  legalNotice,
  terms,
  privacy,
  cookies,
  affiliate,
  editorial,
  disclaimer,
  contact,
  complaints,
  accessibility,
  howWeCompare,
  financialDisclosure,
];

export const LEGAL_SLUGS = legalPageEntries.map(([slug]) => slug);

// Applied last: replaces the generic or earlier versions of these pages.
export function applyLegalPages(pageMap) {
  const next = { ...pageMap };
  for (const [slug, legalPage] of legalPageEntries) next[slug] = legalPage;
  return next;
}
