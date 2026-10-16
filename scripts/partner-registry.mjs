// Writes docs/affiliate/03-programme-registry.md from src/lib/partners.js.
// Usage: npm run registry:partners
import { writeFileSync } from "node:fs";
import { PARTNER_CATEGORIES, partners } from "../src/lib/partners.js";

const rows = partners
  .map((p) => `| ${p.name} | ${PARTNER_CATEGORIES[p.category]} | ${p.network} | ${p.ukEligibility} | ${p.legalReview} | ${p.commercialApproval} | **${p.status}** | ${p.reason} | ${p.sources.map((url, i) => `[${i + 1}](${url})`).join(" ") || "none"} |`)
  .join("\n");

writeFileSync(
  "docs/affiliate/03-programme-registry.md",
  `# 03. Partner programme registry

Generated from \`src/lib/partners.js\` by \`npm run registry:partners\`. Source of truth is the code; edit there.

**All programme facts are UNVERIFIED.** They come from third-party listings found by web search (last checked ${partners[0].lastChecked}), not from programme agreements. No application has been submitted. No partner is APPROVED or ACTIVE, and no tracking ID exists.

| Programme | Category | Network | UK eligibility | Legal review | Commercial approval | Status | Reason | Sources |
|---|---|---|---|---|---|---|---|---|
${rows}

## To move a partner forward
1. Confirm on the official programme or network page that UK publishers and UK customers are accepted. Record the URL and date.
2. Read the programme terms (commission, cookie window, brand rules, prohibited claims). Store the terms, not blog summaries.
3. Run the regulatory review (docs/affiliate/02). Finance and insurance stay BLOCKED until the operator has the required permission or approval route.
4. Get written commercial approval from Multiligo. Apply only after explicit approval.
5. Only then add \`approvedDestination\`, set both reviews to \`approved\` and the status to \`ACTIVE\`. \`AffiliateCTA\` will start rendering automatically, with labels.
`
);
console.log("Wrote docs/affiliate/03-programme-registry.md");
