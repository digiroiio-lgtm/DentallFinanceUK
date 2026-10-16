# 08. UK financial compliance issue register

This is an engineering and content review, **not legal advice**. Items marked Blocked must not be published or relied on until the owner or a compliance adviser approves.

Confirmed by owner: the operator is **not FCA-authorised** and the site is information-only.

| ID | Issue | Where | Severity | Status |
|---|---|---|---|---|
| C1 | Fabricated named authors and reviewers (finance writer, credit specialist, dentist with BDS/GDC credentials), plus `Person`/`reviewedBy` schema | `siteData.js` defaults, 3 templates | High (false expertise claims) | **Fixed in Round 1**: replaced by "DentalFinanceUK Editorial Team" Organization |
| C2 | "5.0/5 content quality rating" with star icons (self-assessed, looks like a review score) | `TrustBadges.js` (component currently unused) | High | **Fixed**: removed |
| C3 | Turkey pages claimed content "has been reviewed for clinical suitability" | `turkeyMedicalReview` in `siteData.js` | High | **Fixed**: now an Editorial Notice saying it is not clinically reviewed |
| C4 | "No impact soft-check information available" (ambiguous credit-check statement) | `TrustStrip.js` | Medium | **Fixed**: replaced with a neutral guide statement |
| C5 | No operator legal name, address, registered status or complaints route stated; commission/referral relationships not disclosed | footer, `/about-us`, `/financial-disclosure` | High | **Resolved in v5 PR** with operator-attested Multiligo details; registry verification pending (docs/legal/03) |
| C6 | Policy pages (about, privacy, terms, cookies, contact…) use generic placeholder text | 10 policy pages | High | **Replaced in v5 PR**; open items (retention, transfers, art 27, governing law) in docs/legal/10 |
| C7 | Lead and contact forms collect personal data without a privacy notice link or stated purpose/retention; contact form posts to Formspree (third-party processor) | `LeadCtaSection`, `ContactForm` | High | Open: add privacy notice, name Formspree as processor |
| C8 | Lead form opens WhatsApp with a Turkey phone number; users may assume UK-regulated handling | `LeadCtaSection`, `CalculatorWidget` | Medium | Open: disclose who answers and where data goes |
| C9 | Provider pages and "ranked" comparisons of named third parties without sources or dates | provider/comparison pages | High | Open: verify or remove claims before expanding |
| C10 | Calculator/scenario figures are illustrative; some pages state typical APR ranges and 0% examples without a source | calculators, payment pages | Medium | Partly mitigated by methodology page; add dated sources |
| C11 | No cookie consent mechanism; analytics helper is inert until consent exists | site-wide | Medium | **Built**: consent banner and Cookie settings ship dormant; they activate with `NEXT_PUBLIC_GA_ID` |
| C12 | Any "guaranteed approval" or "no credit check" content | none published | n/a | Rule: never advertise; educational debunking only, after review |
| C13 | Cost figures for implants/veneers/Turkey savings without cited sources | treatment and Turkey pages | Medium | Open |
| C15 | Homepage provider table asserted "Soft Check: Yes" and APR/"Best for" for named lenders without sources; "Used by patients researching" label | `src/app/page.js` | High | **Fixed in Sprint 2**: replaced by neutral profile links |
| C16 | Commercial relationships (lenders, clinics, WhatsApp "treatment team") are undisclosed | `/financial-disclosure`, `/about-us` | High | **Resolved in v5 PR**: marketing fees from clinics disclosed at the point of contact and on `/affiliate-disclosure`; no lender payments |
| C17 | New credit-law statements (soft vs hard search, CCJ six-year record and one-month removal, FCA Register checks, scam warnings) are general and unreviewed by a compliance professional | `bad-credit-dental-finance`, `dental-finance-with-ccj`, `no-credit-check-dental-finance`, `dental-finance-low-credit-score` | High | **Needs compliance/legal review before the pages are relied on** |
| C14 | Programmatic city pages (18) are templated from a base cost and may read as doorway pages | `city` type | Medium (SEO and accuracy) | Open: review value per page; consider noindex or consolidation |

Because the operator is not authorised, do not build or imply: application journeys, eligibility checkers, approval simulations, lender-specific offers or "apply now" CTAs.

See `docs/legal/` for the v5.0 regulatory perimeter assessment, risk matrix and solicitor review list.
