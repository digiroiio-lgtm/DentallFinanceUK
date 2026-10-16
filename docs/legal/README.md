# Legal and compliance pack (master prompt v5.0)

**Status: internal working documents for review by a UK-qualified solicitor and compliance specialist. Not legal advice and not a legal certification.**

## Important limits of this pack
- **No live legal research.** This environment's network policy blocked `legislation.gov.uk`, `handbook.fca.org.uk` and `ico.org.uk`. Turkish registries were not reachable either. The legal analysis is based on general knowledge of UK law up to mid-2026. Every provision cited must be checked against the current consolidated text, including amendments and anything still only at FCA consultation stage.
- **No independent corporate verification.** Multiligo details are published as **operator-attested**. The ICO number, VKN and tax office are not published.

| # | File |
|---|---|
| 01 | `01-regulatory-perimeter.md` |
| 02 | `02-risk-matrix.md` |
| 03 | `03-corporate-verification.md` |
| 04 | `04-fca-and-financial-promotion-status.md` |
| 05 | `05-claim-audit.md` |
| 06 | `06-high-risk-journeys.md` |
| 07 | `07-eeat-report.md` |
| 08 | `08-affiliate-controls.md` |
| 09 | `09-legal-readiness-scorecard.md` |
| 10 | `10-solicitor-review-list.md` |
| 11 | `11-validation.md` |

The draft legal pages (deliverables 7 to 18) are implemented as site pages in `src/lib/legalPages.js`, so the drafts and the live text cannot diverge. Operator data lives in `src/lib/operator.js`.
