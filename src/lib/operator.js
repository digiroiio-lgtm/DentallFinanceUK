// Single source of truth for who operates this website. Used by the footer, schema
// and every legal page so the details can never diverge.
//
// Verification status (see docs/legal/03-corporate-verification.md):
//   "operator-attested" = supplied and confirmed by the operator, official registry check pending.
//   "unverified"        = held for reference only and never rendered on the site.

export const OPERATOR = {
  legalName: "Multiligo Reklam Bilişim Pazarlama ve Danışmanlık Ltd. Şti.",
  shortName: "Multiligo",
  siteName: "Dental Finance UK",
  country: "Türkiye",
  address: {
    streetAddress: "Acıbadem Mah. Çeçen Sokak, Akasya Evleri Sitesi, A Blok, Kat: 26, Daire: 150",
    addressLocality: "Üsküdar",
    addressRegion: "İstanbul",
    addressCountry: "TR",
  },
  email: "info@multiligo.com",
  phone: "+90 216 709 74 68",
  mersis: "0623-1624-2800-0001",
  foundingYear: "2019",
  whatsappNumber: "905353998999",
  whatsappDisplay: "+90 535 399 89 99",
};

export const OPERATOR_VERIFICATION = {
  legalName: "operator-attested",
  address: "operator-attested",
  email: "operator-attested",
  phone: "operator-attested",
  mersis: "operator-attested",
  foundingYear: "operator-attested",
  // Never rendered until checked on the official registers:
  taxNumber: "unverified",
  taxOffice: "unverified",
  icoRegistration: "unverified",
};

export function formatOperatorAddress() {
  const { streetAddress, addressLocality, addressRegion } = OPERATOR.address;
  return `${streetAddress}, ${addressLocality} / ${addressRegion}, ${OPERATOR.country}`;
}

// Short statements reused wherever a user is asked to get in touch.
export const OPERATOR_STATUS =
  "Dental Finance UK is an educational website operated by Multiligo, a digital publishing and marketing company based in Türkiye. We are not a lender, credit broker or financial adviser, we are not authorised by the FCA, and we do not arrange finance.";

export const COMMERCIAL_DISCLOSURE =
  "Messages are answered by Multiligo, which operates this website and receives paid marketing service fees from some dental clinics, including clinics in Türkiye. We do not receive payments from lenders or credit brokers.";

// WhatsApp links never carry finance details (amount, APR, term or payment).
export function whatsappHref(text = "Hello, I have a question about dental treatment costs.") {
  return `https://wa.me/${OPERATOR.whatsappNumber}?text=${encodeURIComponent(text)}`;
}

export function organizationSchema(getPageUrl) {
  return {
    "@type": "Organization",
    "@id": `${getPageUrl("/")}#operator`,
    name: OPERATOR.shortName,
    legalName: OPERATOR.legalName,
    email: OPERATOR.email,
    telephone: OPERATOR.phone,
    foundingDate: OPERATOR.foundingYear,
    address: { "@type": "PostalAddress", ...OPERATOR.address },
  };
}
