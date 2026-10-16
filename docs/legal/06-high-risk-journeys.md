# 06. High-risk CTAs and journeys

| Journey | Before | After (this PR) | Residual risk |
|---|---|---|---|
| Calculator to WhatsApp | Message pre-filled with loan amount, APR, term and monthly payment | Neutral message; "Your calculator figures are not sent" plus commercial disclosure | AMBER (enquiry handling) |
| Homepage calculator to WhatsApp | Same as above, labelled "Treatment Advisor" | Same fix; "Ask Our Team on WhatsApp" | AMBER |
| Sitewide WhatsApp button | Unlabelled operator | aria-label names Multiligo; link built centrally (`whatsappHref`) | AMBER |
| Lead form "find clinics" | Budget and treatment to WhatsApp; "compare available lenders" copy | Same data only; lender wording removed; inline disclosure that Multiligo answers, is paid by some clinics, is not a lender or broker | AMBER: solicitor to review clinic-referral model |
| Contact form (Formspree) | No privacy notice | Privacy link, processor named, "do not send credit reports or medical records" | GREEN or AMBER (transfer safeguards open) |
| Provider pages | No limits stated | `ComparisonDisclosure` on hub and all provider pages, plus `/how-we-compare` | AMBER |
| Any lender application or eligibility journey | none | none; documented as BLOCKED | n/a |
