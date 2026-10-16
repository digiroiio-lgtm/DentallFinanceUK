# 04. Affiliate-ready content architecture

Principle: commercial placements sit inside genuinely useful guides, never on thin landing pages.

| Candidate from prompt | Decision | Reason |
|---|---|---|
| `/dental-finance-comparison` | Not created | Served by `/finance-providers`, `/dental-finance-companies-uk` and the comparison pages |
| `/dental-insurance-vs-dental-plans` | **Created** | Distinct intent; generic, no products; parent `/dental-payment-plans` |
| `/dental-payment-plans` | Exists | Rewritten in Sprint 2 |
| `/clear-aligners-finance` | **Created** | Fills the aligner gap; illustrative repayments; parent `/cosmetic-dentistry-finance` |
| `/dental-treatment-cost-guide` | Not created | Served by `/dental-treatment-finance` and the per-treatment cost guides |
| `/guides/understanding-dental-finance` | Not created | Served by `/dental-finance-uk` and `/dental-finance-explained-uk-guide-paying-monthly`; nested URLs are not supported by the flat route |
| `/guides/soft-vs-hard-credit-check` | Not created | Served by `/no-credit-check-dental-finance` |

Where future placements would go (only for ACTIVE partners): aligner partners in `/clear-aligners-finance` and `/cosmetic-dentistry-finance` via `PartnerComparisonTable` or `AffiliateCTA`; B2B software in provider and clinic guides. Finance and insurance placements stay blocked.
