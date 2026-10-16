# Analytics and attribution reporting plan

## Activating Google Analytics and the cookie banner
The consent banner (`src/components/CookieConsent.js`) and Google Analytics stay **off** until a GA4 measurement ID is set:
1. In Vercel: Project → Settings → Environment Variables → add `NEXT_PUBLIC_GA_ID` = `G-XXXXXXXXXX` (Production, and Preview if wanted).
2. Redeploy. The banner then appears on first visit, with equal "Reject analytics" and "Accept analytics" buttons.
3. Google Analytics loads only after "Accept analytics". "Cookie settings" in the footer reopens the choice; rejecting disables GA and deletes GA cookies on this domain.
4. The cookie and privacy policies switch automatically to describe Google Analytics when the ID is set.
Malformed IDs are ignored (`isValidGaId` in `src/lib/consent.js`).

## Events (defined in `src/lib/analytics.js`; inert until GA4 and consent exist)
| Event | Trigger | Parameters |
|---|---|---|
| `affiliate_cta_click` | Click on an `AffiliateCTA` (ACTIVE partners only) | `partner_id`, `product_category`, `placement`, `traffic_source`, `page_path` |
| `affiliate_partner_outbound` | Same click (outbound record) | same |
| `ai_referral_affiliate_click` | Same click when the referrer is an AI assistant | same |
| `affiliate_comparison_view` | Reserved for a `PartnerComparisonTable` view | `product_category`, `page_path` |
| `partner_enquiry_submit` | Contact form submitted with "Partnership enquiry" | `placement` |

`traffic_source` comes from the referrer host only: `ai` (chatgpt.com, perplexity.ai, copilot.microsoft.com, gemini.google.com), `search`, `referral` or `direct`. Personal, financial or medical data is never sent; parameters are allow-listed.

## Reports (once data exists)
- Organic sessions vs AI-referral sessions (GA4 source/medium plus `traffic_source`).
- Partner outbound clicks by partner, page and placement.
- **Clicks are not conversions.** Qualified referrals, confirmed conversions, commission earned and commission received come from affiliate network reports, joined by date and partner.
- Revenue per 1,000 sessions = network-confirmed commission / sessions × 1,000, with organic and AI shown separately.
