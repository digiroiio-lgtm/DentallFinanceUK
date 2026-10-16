# 06. Technical SEO change list

## Done in Round 1
| Area | Change | Files |
|---|---|---|
| Metadata | Titles capped at 60 chars (site suffix kept when it fits), descriptions at 160, deterministic and unique; optional `metaTitle`/`metaDescription` overrides. H1/body untouched | `src/lib/seoMeta.js`, `src/app/[slug]/page.js`, `test/seo-meta.test.mjs` |
| Breadcrumbs | Visible breadcrumbs plus matching `BreadcrumbList` (Home > parent hub > page). City schema previously repeated one URL for two items | `src/lib/breadcrumbs.js`, `src/components/Breadcrumbs.js`, three templates |
| Sitemap | `lastModified` from each page's `lastUpdated` instead of build time | `src/app/sitemap.js` |
| robots | Search/answer crawlers listed explicitly (Googlebot, Bingbot, OAI-SearchBot, ChatGPT-User, PerplexityBot); training crawlers left to a decision (07) | `src/app/robots.js` |
| Schema | Article author is the Organization; `reviewedBy` Persons removed | templates |
| Analytics | Consent-gated, parameter-whitelisted event helper | `src/lib/analytics.js` |

## Open (needs data or owner input)
- **Domain**: `SITE_URL` is `https://dentalfinanceuk.co.uk`; confirm it resolves to this deployment, otherwise canonical, OG URLs and sitemap point at a non-resolving host.
- **Core Web Vitals / Lighthouse / INP**: not measured in Round 1. Run Lighthouse and CrUX on the production host.
- **Homepage metadata**: `layout.js` sets `canonical: "/"` as a default; each `[slug]` page overrides. Check pages outside `[slug]`.
- **Images**: `public/` holds three hashed `.webp` files and an unrelated `hearing-thumb.jpeg`; audit alt text and sizes when images are used.
- **Redirects/duplicates**: no redirects in `next.config.mjs`. `/` vs `/dental-finance-uk` overlap (03) needs an approved decision before any redirect.
- **Structured data validation**: run Google Rich Results Test / Schema validator on a sample per template. `FAQPage` is kept as markup but is not assumed to produce rich results.
- **`FinancialService` schema**: not added; only valid once the operator's regulated activity is confirmed.
