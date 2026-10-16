# Analytics and attribution reporting plan

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
