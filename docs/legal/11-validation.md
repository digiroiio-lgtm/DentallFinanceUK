# 11. Technical validation results

Run on branch `claude/v5-compliance-multiligo`.

| Check | Result |
|---|---|
| `npm test` | 55 pass, 0 fail (new `test/compliance-v5.test.mjs`) |
| `npm run lint` | Clean |
| `npm run build` | OK; 135 static routes |
| Legal pages present and linked from the footer | 13 legal/trust pages plus medical review policy, all linked (tested) |
| Operator details consistency | Legal name, email and MERSİS identical across pages, footer and schema (tested) |
| Unverified identifiers | ICO number, VKN and tax office absent from all pages and components (tested) |
| WhatsApp payloads in built HTML | No link contains APR, payment or £ figures (scanned `.next/server/app/*.html`) |
| Promotional approval language | None in components (tested); "guaranteed" only in debunking context |
| FCA claims | No "authorised and regulated", "FCA approved" or "FCA regulated" claims (tested) |
| Schema | `WebSite.publisher` and `Article.publisher` are the Multiligo Organization; no `FinancialService`, no `sameAs` |
| Comparison disclosure | Rendered on the providers hub and provider pages (e.g. `/kandoo-finance`) |
| Cookies | No cookies or storage written by site code; analytics helper remains consent-gated and inert |

Not done here: structured-data validation in Google's Rich Results Test, Lighthouse/accessibility audit and external link checks. These need network access or the deployed preview.
