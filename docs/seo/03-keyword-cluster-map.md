# 03. Keyword cluster map (A to H)

**Search volume, difficulty and CPC: not measured** (Semrush returned `no_api_units`; no Search Console data for this domain). Priority below is therefore based on intent fit, existing coverage and compliance, not demand. Re-score when data is available.

Operator status (confirmed by site owner): **not FCA-authorised, information-only site.** Any "apply", "eligibility checker", "soft-search" or approval tool is **BLOCKED**. Educational explainers are allowed.

Legend. Action: KEEP, OPTIMISE, EXPAND (turn into Power Page), MERGE (review), CREATE (new URL), BLOCKED.

## A. Core dental finance
| Keywords | Intent | URL | Action | Notes |
|---|---|---|---|---|
| dental finance UK, dental financing UK, finance for dental treatment | Commercial investigation | `/` and `/dental-finance-uk` | OPTIMISE | Two near-identical targets. Decide one canonical target (recommend `/`); differentiate or fold `/dental-finance-uk` (generic template) |
| dental payment plans UK, monthly dental payments | Commercial | `/dental-payment-plans`, `/dental-monthly-payments` | EXPAND + MERGE review | Both on the generic template and overlapping |
| dental loans UK, private dental finance, dental treatment finance options | Commercial / informational | `/dental-treatment-finance` | OPTIMISE | Generic template |

## B. Application and eligibility
| Keywords | Intent | URL | Action | Notes |
|---|---|---|---|---|
| dental finance eligibility, requirements UK | Informational | `/dental-finance-eligibility`, `/dental-finance-eligibility-what-lenders-check` | MERGE review | Two pages, one intent. Differentiate (checklist vs deep guide) or consolidate with approval |
| apply for dental finance online, application UK, loan application | Transactional | none | **BLOCKED** | Operator not authorised |
| eligibility checker, soft credit check, approval process | Tool / transactional | none | **BLOCKED** | Never simulate an eligibility decision. Explain the process in guides instead |
| how does dental finance work | Informational | `/dental-finance-explained-uk-guide-paying-monthly` | EXPAND | Use existing URL instead of a new `/how-dental-finance-works` |

## C. Bad credit and low credit score
| Keywords | URL | Action | Notes |
|---|---|---|---|
| dental finance bad credit UK, poor credit, dental loans bad credit | `/bad-credit-dental-finance` (pillar) | EXPAND | Merged Astro content in PR #7 |
| low credit score dental finance | `/dental-finance-low-credit-score` | KEEP | Supporting page |
| after rejection | `/dental-finance-declined` | KEEP | |
| defaults / missed payments | `/dental-finance-after-missed-payments-or-defaults` | KEEP | |
| other bad-credit pages | `/bad-credit-dental-finance-options`, `/bad-credit-dental-loans-vs-clinic-finance`, `/improve-dental-finance-approval-with-bad-credit` | MERGE review | Check overlap with the pillar before adding pages |
| dental finance with CCJ | none | CREATE (conditional) | Only if intent is distinct from the pillar; needs compliance review |
| no credit history | none | Fold into `/dental-finance-low-credit-score` | Not enough distinct intent for a page |

## D. No credit check and guaranteed approval
| Keywords | URL | Action | Notes |
|---|---|---|---|
| no credit check dental finance UK, without credit check | none | CREATE `/no-credit-check-dental-finance` (educational only) | Explain soft vs hard searches, affordability assessments and why "guaranteed approval" claims are unreliable. Compliance review before publishing |
| soft search, soft credit check | none | Cover inside the page above | Not a separate URL |
| guaranteed approval | none | **Never advertise** | Only debunk |

## E. Treatment-specific
| Keywords | URL | Action |
|---|---|---|
| dental implants finance UK | `/dental-implants-finance` (generic template) | EXPAND |
| full mouth dental implants finance | `/single-implant-finance-vs-full-mouth-finance`, `/full-mouth-implants-finance-calculator` | CREATE `/full-mouth-dental-implants-finance` only if it cannot be served by the guide |
| veneers finance UK | `/veneers-finance` (generic template) | EXPAND |
| cosmetic dentistry finance | `/cosmetic-dentistry-finance` | OPTIMISE |
| Invisalign, dentures, bridges, zirconia crowns, emergency | none (crowns payment pages exist) | CREATE one at a time, evidence-led |

## F. Calculators and comparisons
| Keywords | URL | Action |
|---|---|---|
| dental finance / loan calculator, monthly repayments, APR calculator, 12/24/36 months | `/finance-calculator` hub + 11 calculator pages | KEEP, differentiate overlapping pairs (`implant-cost` vs `implant-finance`, `veneer-cost` vs `veneer-finance`) |
| dental finance comparison UK | `/finance-providers`, `/dental-finance-companies-uk`, `/best-dental-finance-provider-uk`, `/dental-finance-companies-ranked` | MERGE review (four pages, one intent) |
| APR explained | none | CREATE `/apr-explained` (educational) |

## G. Educational guides
The editorial roadmap in `siteData.js` already lists most of these (self-employed, deposit, settle early, credit-score impact, red flags). Published: 25 articles. Remaining topics (benefits, CCJ, alternatives) should be scheduled from the roadmap rather than as new URL types. Each must cite UK sources (MoneyHelper, FCA, NHS).

## H. Treatment abroad
24 Turkey URLs exist. Action: audit for overlap and keep the "finance abroad is not a given" framing. No new Turkey pages until existing ones are reviewed; do not imply UK finance products can be used overseas.
