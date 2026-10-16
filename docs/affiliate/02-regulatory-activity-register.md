# 02. Regulatory activity register (affiliate view)

Preliminary. Cross-reference `docs/legal/01` and `docs/legal/02`. Provisions to be checked against current text by a UK solicitor. **Default rule: if status is uncertain, build the infrastructure but keep the journey inactive.**

| # | Activity | Rating | Main issues | Current state |
|---|---|---|---|---|
| 1 | General dental finance education | GREEN | Accuracy (CAP 3 / DMCC) | Live |
| 2 | Editorial product information (naming providers) | AMBER | Possible financial promotion (FSMA s21 / FPO) if it invites or induces | Live with `ComparisonDisclosure`; solicitor review |
| 3 | Commercial product comparisons (with any payment) | AMBER or RED | s21; CAP comparison rules; ordering by commission | Not active |
| 4 | Affiliate advertising: non-regulated products (aligners, services, software) | AMBER | CAP 2.1 to 2.4 recognisability; health and medical device advertising rules (CAP 12); any monthly-payment messaging in partner offers can be a credit promotion | Infrastructure built; all partners inactive |
| 5 | Credit introductions (finance affiliates, lead passing) | **RED** | Credit broking (RAO art 36A) applies irrespective of disclaimers; s21 | BLOCKED in code (`isCommercialCategoryBlocked`) |
| 6 | Insurance introductions (insurance affiliates, plans with insurance) | **RED** | Insurance distribution (RAO art 39A and related), IDD-derived rules | BLOCKED in code |
| 7 | Dental treatment referrals | AMBER | Disclosure of clinic payments (CAP, DMCC); UK GDPR; healthcare advertising | Live with inline disclosure (v5) |
| 8 | Dental software affiliate marketing (B2B) | GREEN or AMBER | CAP recognisability; data protection if lead forms are used | Inactive |

Note: dental membership plans can include an insurance element (e.g. accident or emergency cover). Treat any plan affiliate as insurance (RED) until confirmed otherwise.
