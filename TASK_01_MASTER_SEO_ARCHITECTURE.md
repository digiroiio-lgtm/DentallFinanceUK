# TASK 01 — MASTER SEO ARCHITECTURE

## Scope
Expand DentalFinanceUK into a scalable topical-authority SEO system across:
1. Dental Finance
2. Monthly Payments
3. Dental Implants Finance
4. Veneers Finance
5. Turkey Dental Finance
6. Dental Cost Comparisons
7. Finance Calculators
8. Finance Providers

---

## 1) URL Architecture (Programmatic-Ready)

### Core rules
- Lowercase kebab-case slugs only.
- One canonical URL per intent page.
- Cluster-first pathing for future scale.
- Template-based generation using slug + cluster + intent + modifier.

### URL templates
- **Cluster hubs:** `/{cluster}/`
- **Core guides:** `/{cluster}/{topic}/`
- **Comparisons:** `/{cluster}/{a}-vs-{b}/`
- **Location pages:** `/{cluster}/{topic}-in-{city}/`
- **Calculator pages:** `/calculators/{calculator-type}/`
- **Provider pages:** `/providers/{provider-name}/`
- **Policy/trust pages:** `/trust/{policy-type}/`

### Cluster path proposals
- `/dental-finance/`
- `/monthly-payments/`
- `/implants-finance/`
- `/veneers-finance/`
- `/turkey-dental-finance/`
- `/cost-comparisons/`
- `/calculators/`
- `/providers/`

---

## 2) Content Silo Architecture

Each silo follows the same hierarchy for programmatic expansion:
- **Hub page** (commercial + informational summary)
- **Subtopic pages** (intent-specific)
- **Comparison pages**
- **FAQ/eligibility pages**
- **City pages** (where relevant)
- **Calculator/support pages** (where relevant)

### Standard page types per silo
- `hub`
- `guide`
- `comparison`
- `eligibility`
- `calculator`
- `provider`
- `location`

---

## 3) Internal Linking Map

### Linking layers
1. **Global navigation:** links to all 8 cluster hubs.
2. **Hub-level links:** hub → all subtopics in same cluster.
3. **Contextual links:** guide ↔ comparison ↔ calculator ↔ provider.
4. **Cross-cluster bridges:** implants/veneers/turkey pages → finance, monthly payments, comparisons.
5. **Conversion links:** all BOFU pages → calculator + provider + lead CTA.

### Programmatic linking rules
- Every page must include:
  - 1 parent-hub link
  - 3 sibling links (same cluster)
  - 2 cross-cluster links
  - 1 calculator or provider link
- Anchor text should match page intent (exact/partial variants).

---

## 4) Breadcrumb Strategy

### Breadcrumb pattern
- `Home > Cluster Hub > Subtopic > Modifier (optional)`

Examples:
- `Home > Implants Finance > Dental Implants Finance`
- `Home > Cost Comparisons > Dental Finance vs Credit Card`
- `Home > Providers > [Provider Name]`

### Requirements
- Visible HTML breadcrumb on every indexable page.
- Matching `BreadcrumbList` schema on every page.
- Final crumb must match canonical page title.

---

## 5) Canonical Strategy

- Self-referencing canonical on all indexable pages.
- No canonical chains.
- Comparison pages canonicalize to full comparison URL (not hub).
- Location/variant pages canonicalize to themselves when content is unique.
- Parameterized URLs canonicalize to clean base URL.

---

## 6) Metadata Strategy

Each page requires:
- Unique `<title>` with intent + UK qualifier where relevant.
- Unique meta description with value proposition + action language.
- Open Graph + Twitter cards aligned to canonical.
- `robots` meta directives controlled by page type (index/follow for core pages).

### Metadata formula
- **Title:** `{Primary Intent} | Dental Finance UK`
- **Description:** `{User problem + UK context + decision help + CTA hint}`

---

## 7) Structured Data Strategy

### By page type
- `hub/guide`: `Article`, `FAQPage`, `BreadcrumbList`
- `comparison`: `Article`, `FAQPage`, `BreadcrumbList`
- `calculator`: `SoftwareApplication`, `FAQPage`, `BreadcrumbList`
- `provider`: `FinancialService` (or Organization fallback), `FAQPage`, `BreadcrumbList`
- sitewide: `Organization`, `WebSite`

### Validation requirements
- Required properties populated for all schemas.
- Schema type must match page intent.
- No conflicting entity declarations between page and site-level markup.

---

## 8) Visual Content Map (Markdown)

```text
/
├── /dental-finance/
│   ├── /dental-finance/dental-finance-uk/
│   ├── /dental-finance/0-percent-dental-finance/
│   ├── /dental-finance/bad-credit-dental-finance/
│   └── /dental-finance/{topic}-in-{city}/
├── /monthly-payments/
│   ├── /monthly-payments/dental-monthly-payments/
│   ├── /monthly-payments/dental-payment-plans/
│   └── /monthly-payments/{topic}-in-{city}/
├── /implants-finance/
│   ├── /implants-finance/dental-implants-finance/
│   ├── /implants-finance/implant-finance-calculator/
│   └── /implants-finance/{topic}-in-{city}/
├── /veneers-finance/
│   ├── /veneers-finance/veneers-finance/
│   ├── /veneers-finance/veneer-finance-calculator/
│   └── /veneers-finance/{topic}-in-{city}/
├── /turkey-dental-finance/
│   ├── /turkey-dental-finance/turkey-teeth-finance/
│   ├── /turkey-dental-finance/dental-treatment-turkey-finance/
│   └── /turkey-dental-finance/uk-vs-turkey-dental-costs/
├── /cost-comparisons/
│   ├── /cost-comparisons/dental-finance-vs-credit-card/
│   ├── /cost-comparisons/dental-finance-vs-personal-loan/
│   └── /cost-comparisons/{topic}-vs-{topic}/
├── /calculators/
│   ├── /calculators/finance-calculator/
│   ├── /calculators/implant-finance-calculator/
│   └── /calculators/veneer-finance-calculator/
├── /providers/
│   ├── /providers/{provider-name}/
│   ├── /providers/{provider-name}-reviews/
│   └── /providers/{provider-name}-eligibility/
└── /trust/
    ├── /trust/editorial-policy/
    ├── /trust/medical-review-policy/
    ├── /trust/authors/
    └── /trust/contact/
```

---

## 9) Validation Checklist

- [x] URL architecture defined for all 8 target clusters
- [x] Silo model defined with reusable page types
- [x] Internal linking rules defined for crawl + conversion flow
- [x] Breadcrumb pattern and schema requirements defined
- [x] Canonical rules defined for standard and variant pages
- [x] Metadata rules defined with reusable formulas
- [x] Structured data matrix defined by page type
- [x] Visual markdown content map added
- [x] Programmatic expansion compatibility defined (templates + page-type model)
