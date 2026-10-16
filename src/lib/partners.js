// Partner and affiliate-link registry: the single place that decides whether any
// commercial link may appear on the site.
//
// Rules (see docs/affiliate/02-regulatory-activity-register.md):
//  - Nothing renders unless status is ACTIVE, both reviews are "approved" and an
//    approvedDestination has been supplied from a real, signed-up programme.
//  - Finance and insurance categories are hard-blocked while the operator is not
//    FCA-authorised and has no appointed-representative or s21 approval route.
//  - Programme facts below come from third-party listings found by web search on
//    2026-10-16. They are UNVERIFIED and are not contractual terms.
//  - Never invent tracking IDs. approvedDestination stays null until a partner is approved.

export const PARTNER_STATUSES = ["RESEARCH", "UNVERIFIED", "COMPLIANCE_REVIEW", "APPROVED", "ACTIVE", "BLOCKED"];

export const PARTNER_CATEGORIES = {
  finance: "Dental finance",
  insurance: "Dental insurance",
  "dental-plan": "Dental plans and discount plans",
  aligners: "Clear aligners",
  "dental-services": "Dental services and teledentistry",
  "b2b-software": "Dental software (B2B)",
};

// Categories that need regulatory permission before any promotion can go live.
const REGULATED_CATEGORIES = new Set(["finance", "insurance"]);
// Flip only after written regulatory clearance for the operator (authorisation, AR or approval route).
const REGULATORY_CLEARANCE = { finance: false, insurance: false };

const CHECKED = "2026-10-16";

export const partners = [
  {
    id: "dentalinsurance-com",
    name: "DentalInsurance.com",
    category: "insurance",
    network: "Unknown (no official programme page found)",
    programmeUrl: null,
    ukEligibility: "likely-not",
    legalReview: "not-started",
    commercialApproval: "not-started",
    approvedDestination: null,
    disclosureRequired: true,
    status: "BLOCKED",
    reason: "Insurance distribution is a regulated activity; US insurance marketplace; no official affiliate page found.",
    sources: ["https://www.dentaly.org/us/?p=19584"],
    lastChecked: CHECKED,
  },
  {
    id: "avia-dental-plan",
    name: "Avia Dental Plan",
    category: "dental-plan",
    network: "Unknown (sold via DentalPlans.com)",
    programmeUrl: null,
    ukEligibility: "likely-not",
    legalReview: "not-started",
    commercialApproval: "not-started",
    approvedDestination: null,
    disclosureRequired: true,
    status: "BLOCKED",
    reason: "US dental discount plan; not applicable to UK readers. Third-party blog cites a flat per-plan payout (unverified).",
    sources: ["https://www.webtonic.io/blog/dental-affiliate-and-partnership-marketing-statistics", "https://dentalplans.com/dentalplans/aviadentalplan"],
    lastChecked: CHECKED,
  },
  {
    id: "dentalplans-com",
    name: "DentalPlans.com",
    category: "dental-plan",
    network: "CJ Affiliate / FlexOffers (per third-party listings)",
    programmeUrl: null,
    ukEligibility: "likely-not",
    legalReview: "not-started",
    commercialApproval: "not-started",
    approvedDestination: null,
    disclosureRequired: true,
    status: "BLOCKED",
    reason: "US dental savings plans; not applicable to UK readers. Listings disagree on commission (flat fee vs percentage), so unverified.",
    sources: ["https://getlasso.co/affiliate/dentalplans-com/", "https://www.flexoffers.com/affiliate-programs/dentalplans-com-affiliate-program"],
    lastChecked: CHECKED,
  },
  {
    id: "dentulu-patients",
    name: "Dentulu (patient affiliates)",
    category: "dental-services",
    network: "Unknown",
    programmeUrl: null,
    ukEligibility: "likely-not",
    legalReview: "not-started",
    commercialApproval: "not-started",
    approvedDestination: null,
    disclosureRequired: true,
    status: "BLOCKED",
    reason: "US teledentistry platform; patient financing offered via a US lender. Terms only from a third-party blog.",
    sources: ["https://www.webtonic.io/blog/dental-affiliate-and-partnership-marketing-statistics"],
    lastChecked: CHECKED,
  },
  {
    id: "dentulu-professionals",
    name: "Dentulu (professional affiliates)",
    category: "b2b-software",
    network: "Unknown",
    programmeUrl: null,
    ukEligibility: "unknown",
    legalReview: "not-started",
    commercialApproval: "not-started",
    approvedDestination: null,
    disclosureRequired: true,
    status: "UNVERIFIED",
    reason: "B2B practice software referral; custom payouts per third-party blog. UK availability unknown.",
    sources: ["https://www.webtonic.io/blog/dental-affiliate-and-partnership-marketing-statistics"],
    lastChecked: CHECKED,
  },
  {
    id: "opencare",
    name: "Opencare",
    category: "dental-services",
    network: "CJ Affiliate / PartnerStack (per third-party listings; country US)",
    programmeUrl: null,
    ukEligibility: "likely-not",
    legalReview: "not-started",
    commercialApproval: "not-started",
    approvedDestination: null,
    disclosureRequired: true,
    status: "BLOCKED",
    reason: "Dentist booking platform listed for the US; conflicting cookie and payout data.",
    sources: ["https://affi.io/m/opencare", "https://www.flexoffers.com/affiliate-programs/opencare-affiliate-program/"],
    lastChecked: CHECKED,
  },
  {
    id: "alignerco",
    name: "AlignerCo",
    category: "aligners",
    network: "Awin (per third-party listings)",
    programmeUrl: null,
    ukEligibility: "likely-not",
    legalReview: "not-started",
    commercialApproval: "not-started",
    approvedDestination: null,
    disclosureRequired: true,
    status: "BLOCKED",
    reason: "Listings describe a US and Canada business; no evidence of UK customer acceptance.",
    sources: ["https://www.flexoffers.com/affiliate-programs/alignerco-affiliate-program/", "https://ui.awin.com/merchant-profile/59167"],
    lastChecked: CHECKED,
  },
  {
    id: "smile-provide",
    name: "Smile Provide",
    category: "aligners",
    network: "Not found",
    programmeUrl: null,
    ukEligibility: "unknown",
    legalReview: "not-started",
    commercialApproval: "not-started",
    approvedDestination: null,
    disclosureRequired: true,
    status: "RESEARCH",
    reason: "No programme found by web search; confirm the correct company name.",
    sources: [],
    lastChecked: CHECKED,
  },
  // UK-focused alternatives found by research.
  {
    id: "smilewhite",
    name: "SmileWhite",
    category: "aligners",
    network: "Awin (UK) and own creator programme (per listings)",
    programmeUrl: "https://ui.awin.com/merchant-profile/107205",
    ukEligibility: "unknown",
    legalReview: "not-started",
    commercialApproval: "not-started",
    approvedDestination: null,
    disclosureRequired: true,
    status: "COMPLIANCE_REVIEW",
    reason: "UK aligner brand. Needs review of health-advertising rules and of any monthly-payment or finance messaging in its offers before promotion.",
    sources: ["https://ui.awin.com/merchant-profile/107205", "https://www.smilewhite.co.uk/pages/smile-nation"],
    lastChecked: CHECKED,
  },
  {
    id: "smile-aligners-uk",
    name: "Smile Aligners Ltd (UK)",
    category: "aligners",
    network: "Awin (per listings)",
    programmeUrl: null,
    ukEligibility: "unknown",
    legalReview: "not-started",
    commercialApproval: "not-started",
    approvedDestination: null,
    disclosureRequired: true,
    status: "UNVERIFIED",
    reason: "Awin profile reported by search; merchant ID and terms to confirm on Awin.",
    sources: ["https://ui.awin.com/merchant-profile/125074"],
    lastChecked: CHECKED,
  },
  {
    id: "straight-my-teeth",
    name: "Straight My Teeth",
    category: "aligners",
    network: "Awin (listed as closed)",
    programmeUrl: null,
    ukEligibility: "unknown",
    legalReview: "not-started",
    commercialApproval: "not-started",
    approvedDestination: null,
    disclosureRequired: true,
    status: "RESEARCH",
    reason: "Programme reported closed; recheck on Awin.",
    sources: ["https://affi.io/m/straight-my-teeth"],
    lastChecked: CHECKED,
  },
  {
    id: "simplyhealth",
    name: "Simplyhealth (incl. dental plans/insurance)",
    category: "insurance",
    network: "Impact (open per directory listing; Awin listed as closed)",
    programmeUrl: null,
    ukEligibility: "unknown",
    legalReview: "not-started",
    commercialApproval: "not-started",
    approvedDestination: null,
    disclosureRequired: true,
    status: "BLOCKED",
    reason: "Insurance products: insurance distribution rules apply. Blocked until a regulatory route exists.",
    sources: ["https://affi.io/m/simplyhealth"],
    lastChecked: CHECKED,
  },
];

export function isCommercialCategoryBlocked(category) {
  return REGULATED_CATEGORIES.has(category) && !REGULATORY_CLEARANCE[category];
}

// The only gate commercial components use. Returns null unless every condition holds.
export function getActivePartner(id) {
  const partner = partners.find((candidate) => candidate.id === id);
  if (!partner) return null;
  if (partner.status !== "ACTIVE") return null;
  if (partner.legalReview !== "approved" || partner.commercialApproval !== "approved") return null;
  if (!partner.approvedDestination) return null;
  if (isCommercialCategoryBlocked(partner.category)) return null;
  return partner;
}

export function getActivePartners() {
  return partners.map((partner) => getActivePartner(partner.id)).filter(Boolean);
}
