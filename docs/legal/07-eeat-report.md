# 07. E-E-A-T and transparency report

## In place
- Real operator identity, consistent across footer, About, Legal Notice, Contact, Privacy and schema (single source `src/lib/operator.js`, tested).
- `WebSite` schema with Multiligo as `publisher`; Article schema `publisher` set to the same Organization. No `FinancialService`, no unverified `sameAs`.
- Editorial policy covering sources, conflicts, corrections and commercial influence; complaints and corrections route; accessibility statement.
- Commercial relationships disclosed at the point of contact and on a dedicated page.
- No fabricated authors, reviewers, ratings or testimonials (removed in PR #9, test-enforced).

## Gaps (recorded, not filled with invented signals)
- No named, qualified financial or clinical reviewer. Add only when a real review happens, with name and credentials.
- No independent citations to primary-source URLs on pages (sources are named, not linked). Add dated links once the policy allows outbound links to official sites.
- Operator details are attested, not registry-verified.
- Multiligo's other properties are not referenced. Do not use them as expertise signals for finance.
