# SEO / GEO programme: Round 1 deliverables

Branch `claude/seo-sprint1-audit`. Audit and planning only; no new commercial content and no deployment.

| # | File | What it is |
|---|---|---|
| 01 | `01-url-audit.md` / `.csv` | Generated inventory of all 121 URLs (`npm run audit:seo -- --write`) |
| 02 | `02-competitor-gap-matrix.md` | Competitor method and **hypotheses** (no live UK SERP data available) |
| 03 | `03-keyword-cluster-map.md` | Clusters A to H mapped to existing URLs, with action and compliance status |
| 04 | `04-url-vs-power-page-matrix.md` | Existing URL versus proposed Power Page |
| 05 | `05-backlog.md` | Priority-scored backlog |
| 06 | `06-technical-seo.md` | Technical changes made and still open |
| 07 | `07-geo-ai-visibility.md` | GEO plan, crawler policy and AI-citation benchmark set |
| 08 | `08-compliance-register.md` | UK financial-promotion and trust issues |
| 09 | `09-internal-linking-plan.md` | Hub-and-spoke structure and link gaps |
| 10 | `10-analytics-attribution.md` | Events, consent and measurement baseline |

## Data availability in this round
- **Semrush**: connected but returned `no_api_units`. No search volumes, difficulty or competitor positions were obtained.
- **Google Search Console**: `dentalfinanceuk.co.uk` is not among the properties this account can read. No impressions, clicks or index data.
- **GA4**: not queried; the site has no GA4 loader (see 10).
- **Live web search**: available tool is US-only, so it cannot show UK SERPs. Not used for ranking claims.

Every ranking, volume, difficulty or citation statement is therefore either absent or marked **hypothesis**.
