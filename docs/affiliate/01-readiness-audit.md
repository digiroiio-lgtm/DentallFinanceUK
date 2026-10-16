# 01. Affiliate readiness audit

What an affiliate network compliance reviewer will look for, and where the site stands.

| Area | Status | Evidence |
|---|---|---|
| Identifiable operator | Ready (attested) | Footer, `/about-us`, `/legal-notice`, schema publisher |
| Contact routes | Ready | `/contact` (email, phone, WhatsApp, form); partnership option in form |
| Affiliate disclosure page | Ready | `/affiliate-disclosure`: truthful (no active links), how links would be labelled |
| Disclosure at placement | Built, inactive | `AffiliateCTA` label and `AffiliateDisclosureBanner`; renders only for ACTIVE partners |
| `rel="sponsored"` and no cloaking | Built | `AffiliateCTA` links directly to `approvedDestination` |
| Comparison methodology | Ready | `/how-we-compare`, `ComparisonDisclosure` on provider pages |
| Editorial policy and safeguards | Ready | `/editorial-policy` (sponsored content, affiliate influence) |
| Privacy and cookie notices | Ready, with open items | Affiliate tracking documented as not active; retention, transfers and art 27 open |
| Partnerships page | Ready | `/partners`, no third-party brands |
| No fake trust signals | Ready | Tests block persona names, ratings and FCA claims |
| Partner registry and gating | Ready | `src/lib/partners.js`, tests: nothing ACTIVE, finance and insurance blocked |
| Analytics | Built, inert | Events defined; needs a GA4 ID and consent banner |
| Content quality | Good | 132 pages, 0 generic-template, 0 orphans (`npm run audit:seo`) |
| Domain | **Open** | Confirm `dentalfinanceuk.co.uk` resolves to this deployment (canonical host) |
| Traffic data | **Open** | No Search Console or GA4 access; networks may ask for traffic figures |
