# 10. Analytics and attribution plan

## Current state
- No GA4 or GTM loader exists. `LeadCtaSection` previously called `window.gtag`, which was never defined.
- No consent banner or cookie policy text beyond a placeholder page.
- Round 1 added `src/lib/analytics.js`: it sends nothing unless (a) a GA4/GTM snippet defines `gtag`/`dataLayer` **and** (b) `localStorage["dfuk_analytics_consent"] === "granted"`.

## Events
| Event | Fired from | Parameters (allow-listed only) |
|---|---|---|
| `calculator_start` | first input change in `CalculatorWidget` | `calculator_id`, `page_path` |
| `calculator_complete` | share-link copy or WhatsApp click after use | `calculator_id`, `term_months` |
| `finance_cta_click` | WhatsApp CTAs (calculator, lead form) | `placement`, `destination` |
| `finance_partner_outbound` | reserved for approved outbound partner links | `placement`, `destination` |
| `eligibility_cta_click`, `guide_to_application_click` | **not implemented**: no eligibility or application flow may exist while the operator is unauthorised | n/a |

Never sent: loan amount, APR, budget, treatment text, name, email, phone, credit information.

## To go live (needs owner decisions)
1. GA4 property and measurement ID (`NEXT_PUBLIC_GA_ID`).
2. A consent banner (CMP) that sets the consent key, or an equivalent Consent Mode setup.
3. Privacy and cookie policy text (08 C6, C7, C11).

## Baseline dashboard (when data exists)
Search Console: impressions, clicks, CTR, position, indexed pages, non-brand queries, top 3/10/20 coverage. GA4: organic and AI-referral sessions segmented separately, calculator events, WhatsApp/lead CTA clicks. AI visibility: benchmark results from 07. Do not conflate an AI citation with a referral visit.

Prerequisite: Search Console access for `dentalfinanceuk.co.uk` (the connected account has no property for it).
