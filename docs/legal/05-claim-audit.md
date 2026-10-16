# 05. Website claim audit

Method: search of `src/` for high-risk phrases, then manual context classification. Enforced by `test/compliance-v5.test.mjs`.

| Phrase family | Found where | Context | Action |
|---|---|---|---|
| "guaranteed" | Credit pages, Turkey pages | Educational negation ("cannot be guaranteed", "be cautious of guaranteed approval claims") | Kept: debunking context |
| "no credit check" | `/no-credit-check-dental-finance` title and body | Search-query framing, explains why genuine no-check lending is rare | Kept: educational |
| "Best Dental Finance Provider UK" (title and labels) | provider pages, footer | Unsupported superlative | **Changed** to "Choosing a Dental Finance Provider" |
| "Dental Finance Companies Ranked" | provider pages | Implied ranking of named firms | **Changed** to "How to Rank Dental Finance Companies: A Fit-Based Framework" |
| "WhatsApp A Treatment Advisor", "Speak With Treatment Team" | hero, calculators | Implies advice | **Changed** to "Ask Our Team on WhatsApp" with operator disclosure |
| "compare available lenders" | lead section | Implies lender comparison or introduction | **Removed** |
| "Independent UK resource for comparing … provider options" | footer | Implies UK establishment and comparison service | **Changed** to an educational description plus operator line |
| "FCA approved / regulated", "apply now", "get approved", "instant approval", "pre-approved", "we arrange your loan" | none | — | Test blocks reintroduction |
| Fabricated persons, self-ratings, "clinically reviewed" | removed in Round 1 (PR #9) | — | Test blocks reintroduction |
| "Find clinics within your budget / See Clinics & Prices" | lead form | Clinic matching while Multiligo is paid by some clinics | **Kept** with inline commercial disclosure (AMBER, solicitor) |
