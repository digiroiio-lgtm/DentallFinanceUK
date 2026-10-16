# 09. Internal linking plan

## Target structure
- Homepage links to the primary hubs: payment plans, finance calculator, bad-credit pillar, implants finance, veneers finance, providers hub, Turkey hub.
- Each hub links down to its spokes; each spoke links back to its parent hub and to one relevant tool.
- Parent hubs are now encoded in `src/lib/breadcrumbs.js` and shown as visible breadcrumbs. This is the first step; contextual in-body links still need to be written.

| Hub | Spokes (current count) |
|---|---|
| `/dental-finance-uk` (and `/`) | 35 pages with it as parent |
| `/finance-calculator` | 12 calculators and tool pages |
| `/finance-providers` | 15 provider and comparison pages |
| `/turkey-teeth-finance` | 23 Turkey pages |
| `/bad-credit-dental-finance` | 8 credit pages |
| `/dental-implants-finance` | 9 implant pages |
| `/veneers-finance` | 8 veneer and cosmetic pages |

## Implemented in Sprint 3
- `getRelatedLinks()` (`src/lib/breadcrumbs.js`): hand-written link lists are kept; pages without one get parent hub + siblings + calculator hub + overview instead of the same seven links. Hubs link down to up to six spokes; the bad-credit cluster is cross-linked via priority siblings.
- City pages now sit under their service hub (implants, veneers, general) and each hub has a "by city" section linking all six.
- Result: pages with no contextual or sitewide inbound link 23 → 0; pages with only derived links 46 → 32 (the rest have hand-written lists).

## Opportunity report at the start of Round 1 (from `npm run audit:seo`)
- **46 pages** use only the 7 fixed default outbound links. Replace with 3 to 6 topic-specific links each (parent hub, sibling guide, one tool).
- **23 pages** have no contextual or sitewide (header/footer) inbound link:
  - Articles: `dental-monthly-payments`, `dental-finance-calculator`, `how-to-compare-dental-finance-providers`
  - Policy: `authors`
  - Calculator: `full-mouth-implants-finance-calculator` (linked from the calculator hub list, which the audit does not count)
  - 18 city pages (`dental-finance|veneers-finance|dental-implants-finance` × London, Manchester, Birmingham, Leeds, Liverpool, Glasgow). They need a city index or links from their service hub, or a decision on whether to keep them (08 C14).
- 25 pages sit in intent-overlap groups. Cross-link with descriptive anchors that state the difference ("what lenders check" vs "your eligibility checklist"), not repeated exact-match anchors.

## Rules
Descriptive contextual anchors, no sitewide keyword stuffing, no orphan pages, breadcrumb on every page, related-guides block limited to genuinely related pages.

## Limits of this audit
Counts come from page data (`internalLinks`, default links, header/footer, breadcrumb parents). Links written inside paragraph text are not parsed.
