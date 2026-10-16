# 03. Partner programme registry

Generated from `src/lib/partners.js` by `npm run registry:partners`. Source of truth is the code; edit there.

**All programme facts are UNVERIFIED.** They come from third-party listings found by web search (last checked 2026-10-16), not from programme agreements. No application has been submitted. No partner is APPROVED or ACTIVE, and no tracking ID exists.

| Programme | Category | Network | UK eligibility | Legal review | Commercial approval | Status | Reason | Sources |
|---|---|---|---|---|---|---|---|---|
| DentalInsurance.com | Dental insurance | Unknown (no official programme page found) | likely-not | not-started | not-started | **BLOCKED** | Insurance distribution is a regulated activity; US insurance marketplace; no official affiliate page found. | [1](https://www.dentaly.org/us/?p=19584) |
| Avia Dental Plan | Dental plans and discount plans | Unknown (sold via DentalPlans.com) | likely-not | not-started | not-started | **BLOCKED** | US dental discount plan; not applicable to UK readers. Third-party blog cites a flat per-plan payout (unverified). | [1](https://www.webtonic.io/blog/dental-affiliate-and-partnership-marketing-statistics) [2](https://dentalplans.com/dentalplans/aviadentalplan) |
| DentalPlans.com | Dental plans and discount plans | CJ Affiliate / FlexOffers (per third-party listings) | likely-not | not-started | not-started | **BLOCKED** | US dental savings plans; not applicable to UK readers. Listings disagree on commission (flat fee vs percentage), so unverified. | [1](https://getlasso.co/affiliate/dentalplans-com/) [2](https://www.flexoffers.com/affiliate-programs/dentalplans-com-affiliate-program) |
| Dentulu (patient affiliates) | Dental services and teledentistry | Unknown | likely-not | not-started | not-started | **BLOCKED** | US teledentistry platform; patient financing offered via a US lender. Terms only from a third-party blog. | [1](https://www.webtonic.io/blog/dental-affiliate-and-partnership-marketing-statistics) |
| Dentulu (professional affiliates) | Dental software (B2B) | Unknown | unknown | not-started | not-started | **UNVERIFIED** | B2B practice software referral; custom payouts per third-party blog. UK availability unknown. | [1](https://www.webtonic.io/blog/dental-affiliate-and-partnership-marketing-statistics) |
| Opencare | Dental services and teledentistry | CJ Affiliate / PartnerStack (per third-party listings; country US) | likely-not | not-started | not-started | **BLOCKED** | Dentist booking platform listed for the US; conflicting cookie and payout data. | [1](https://affi.io/m/opencare) [2](https://www.flexoffers.com/affiliate-programs/opencare-affiliate-program/) |
| AlignerCo | Clear aligners | Awin (per third-party listings) | likely-not | not-started | not-started | **BLOCKED** | Listings describe a US and Canada business; no evidence of UK customer acceptance. | [1](https://www.flexoffers.com/affiliate-programs/alignerco-affiliate-program/) [2](https://ui.awin.com/merchant-profile/59167) |
| Smile Provide | Clear aligners | Not found | unknown | not-started | not-started | **RESEARCH** | No programme found by web search; confirm the correct company name. | none |
| SmileWhite | Clear aligners | Awin (UK) and own creator programme (per listings) | unknown | not-started | not-started | **COMPLIANCE_REVIEW** | UK aligner brand. Needs review of health-advertising rules and of any monthly-payment or finance messaging in its offers before promotion. | [1](https://ui.awin.com/merchant-profile/107205) [2](https://www.smilewhite.co.uk/pages/smile-nation) |
| Smile Aligners Ltd (UK) | Clear aligners | Awin (per listings) | unknown | not-started | not-started | **UNVERIFIED** | Awin profile reported by search; merchant ID and terms to confirm on Awin. | [1](https://ui.awin.com/merchant-profile/125074) |
| Straight My Teeth | Clear aligners | Awin (listed as closed) | unknown | not-started | not-started | **RESEARCH** | Programme reported closed; recheck on Awin. | [1](https://affi.io/m/straight-my-teeth) |
| Simplyhealth (incl. dental plans/insurance) | Dental insurance | Impact (open per directory listing; Awin listed as closed) | unknown | not-started | not-started | **BLOCKED** | Insurance products: insurance distribution rules apply. Blocked until a regulatory route exists. | [1](https://affi.io/m/simplyhealth) |

## To move a partner forward
1. Confirm on the official programme or network page that UK publishers and UK customers are accepted. Record the URL and date.
2. Read the programme terms (commission, cookie window, brand rules, prohibited claims). Store the terms, not blog summaries.
3. Run the regulatory review (docs/affiliate/02). Finance and insurance stay BLOCKED until the operator has the required permission or approval route.
4. Get written commercial approval from Multiligo. Apply only after explicit approval.
5. Only then add `approvedDestination`, set both reviews to `approved` and the status to `ACTIVE`. `AffiliateCTA` will start rendering automatically, with labels.
