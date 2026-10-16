# 07. GEO and AI visibility plan

No AI citation can be promised. This plan makes the site easy to understand and cite; measurement is separate from referral traffic.

## Principles
- **Answer-first**: a short, accurate answer directly under each question heading (the templates already render `answerBlock`).
- **Entity clarity**: this site is an independent information resource, not a lender or broker. Distinguish clearly from lenders, clinics and any referral partner. Facts pending from the owner (08).
- **Evidence**: cite MoneyHelper, FCA, NHS, credit reference agencies for consequential claims.
- **Information gain**: calculators, repayment tables and scenario pages are the differentiators; avoid repeating one explanation under many keywords.

## Crawler policy
| Class | Examples | Round 1 stance |
|---|---|---|
| Search/answer retrieval | Googlebot, Bingbot, OAI-SearchBot, ChatGPT-User, PerplexityBot | Explicitly allowed in `robots.js` |
| Training-only | GPTBot, Google-Extended, CCBot | **Owner decision.** Not named in robots. Blocking them does not affect Google Search; allowing may influence model training |
| Edge/WAF | Vercel Firewall | Verify in Vercel that no rule blocks the crawlers above. Not checkable from this repo |

## llms.txt
Optional discovery aid with no proven ranking effect. Not added. Revisit after the measurement baseline.

## AI-citation benchmark (to run manually, monthly)
Record per prompt: platform, date, domain cited (Y/N), cited URL, competitor citations, accuracy of the answer, observed referral sessions.

Prompt set (UK phrasing):
1. What is dental finance and how does it work in the UK?
2. Can I get dental finance with bad credit in the UK?
3. Can I get dental finance with a CCJ?
4. Is there dental finance with no credit check, and is it safe?
5. What credit score do I need for dental finance?
6. Does dental finance affect my credit score?
7. What is the difference between a soft search and a hard search for dental finance?
8. How much per month is a dental implant on finance?
9. How much per month are veneers on finance?
10. Is 0% dental finance available in the UK, and what are the catches?
11. What happens if my dental finance is declined?
12. Can self-employed people get dental finance?
13. What are the alternatives to dental finance?
14. Can I use UK dental finance for treatment in Turkey?

Platforms: Google AI Overviews / AI Mode, ChatGPT Search, Perplexity, Microsoft Copilot. Segment AI referrals in GA4 by source (e.g. `chatgpt.com`, `perplexity.ai`, `copilot.microsoft.com`) once GA4 is live.
