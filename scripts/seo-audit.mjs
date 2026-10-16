// Deterministic, offline SEO inventory of every indexable page in pageMap.
// Usage:
//   node scripts/seo-audit.mjs            print a summary
//   node scripts/seo-audit.mjs --write    also write docs/seo/01-url-audit.csv and .md
// Classifications are heuristics to prioritise human review, not decisions.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { SITE_URL, calculatorHubLinks, pageMap, pageSlugs, primaryNav } from "../src/lib/siteData.js";
import { getParentSlug, getRelatedLinks } from "../src/lib/breadcrumbs.js";
import { buildMetaDescription, buildMetaTitle } from "../src/lib/seoMeta.js";
import sitemap from "../src/app/sitemap.js";

const footerHrefs = [...readFileSync(new URL("../src/components/SiteFooter.js", import.meta.url), "utf8").matchAll(/href:\s*"(\/[^"#?]*)"/g)].map((match) => match[1]);

const SKIP_KEYS = new Set(["slug", "type", "lastUpdated", "disclaimer", "references", "author", "internalLinks"]);
const GENERIC_DESCRIPTION = /^UK-focused guidance on /;
const THIN_WORDS = 250;

// Groups of pages that compete for overlapping intent. They are flagged for
// human review (merge, differentiate or cross-link), never merged automatically.
const INTENT_GROUPS = {
  "bad-credit family": ["bad-credit-dental-finance", "bad-credit-dental-finance-options", "bad-credit-dental-loans-vs-clinic-finance", "improve-dental-finance-approval-with-bad-credit", "dental-finance-low-credit-score", "dental-finance-declined", "dental-finance-after-missed-payments-or-defaults"],
  "eligibility pair": ["dental-finance-eligibility", "dental-finance-eligibility-what-lenders-check"],
  "0% finance": ["0-percent-dental-finance", "how-0-percent-dental-finance-works", "0-percent-finance-calculator"],
  "provider comparison": ["finance-providers", "dental-finance-companies-uk", "dental-finance-companies-ranked", "best-dental-finance-provider-uk", "how-to-compare-dental-finance-providers"],
  "monthly payments": ["dental-monthly-payments", "dental-payment-plans", "monthly-payment-calculator", "how-much-does-dental-finance-cost-per-month-uk"],
  "implant calculators": ["implant-cost-calculator", "implant-finance-calculator"],
  "veneer calculators": ["veneer-cost-calculator", "veneer-finance-calculator"],
};

function collectText(value, out = []) {
  if (typeof value === "string") out.push(value);
  else if (Array.isArray(value)) value.forEach((item) => collectText(item, out));
  else if (value && typeof value === "object") {
    for (const [key, item] of Object.entries(value)) if (!SKIP_KEYS.has(key)) collectText(item, out);
  }
  return out;
}

function countWords(page) {
  return collectText(page).join(" ").split(/\s+/).filter(Boolean).length;
}

function schemaTypes(page) {
  if (page.type === "calculator" || page.type === "calculator-hub") return "SoftwareApplication|FAQPage|BreadcrumbList";
  return "Article|FAQPage|BreadcrumbList";
}

function isPolicyPlaceholder(page) {
  return page.type === "policy" && GENERIC_DESCRIPTION.test(page.description ?? "");
}

export function buildAudit() {
  const inSitemap = new Set(sitemap().map((entry) => entry.url));
  const inbound = Object.fromEntries(pageSlugs.map((slug) => [slug, { explicit: 0, nav: 0, breadcrumb: 0 }]));
  const bump = (slug, kind) => {
    if (inbound[slug]) inbound[slug][kind] += 1;
  };

  for (const href of new Set([...primaryNav.map((link) => link.href), ...footerHrefs])) bump(href.replace(/^\//, ""), "nav");
  const outbound = {};
  for (const page of Object.values(pageMap)) {
    // Links a visitor sees: related-links block (own or derived) plus links written inside sections.
    const hrefs = new Set(getRelatedLinks(page).map((link) => link.href));
    for (const sectionItem of page.sections ?? []) for (const item of sectionItem.items ?? []) if (item?.href) hrefs.add(item.href);
    if (page.type === "calculator-hub") for (const link of calculatorHubLinks) hrefs.add(link.href);
    hrefs.delete(`/${page.slug}`);
    outbound[page.slug] = hrefs.size;
    for (const href of hrefs) bump(href.replace(/^\//, ""), "explicit");
    const parent = getParentSlug(page);
    if (parent) bump(parent, "breadcrumb");
  }

  const groupBySlug = {};
  for (const [group, slugs] of Object.entries(INTENT_GROUPS)) for (const slug of slugs) if (pageMap[slug]) (groupBySlug[slug] ??= []).push(group);

  return pageSlugs.map((slug) => {
    const page = pageMap[slug];
    const words = countWords(page);
    const generic = GENERIC_DESCRIPTION.test(page.description ?? "");
    const links = inbound[slug];
    const groups = groupBySlug[slug] ?? [];
    const flags = [];
    if (generic) flags.push("generic-template");
    if (words < THIN_WORDS) flags.push("thin");
    if (!page.internalLinks?.length) flags.push("derived-links-only");
    if (links.explicit + links.nav === 0) flags.push("no-contextual-inbound");
    if (groups.length) flags.push(`intent-overlap:${groups.join("+")}`);
    if (isPolicyPlaceholder(page)) flags.push("policy-needs-real-facts");

    let classification = "KEEP";
    if (groups.length) classification = "OPTIMISE";
    if (generic || flags.includes("no-contextual-inbound")) classification = "OPTIMISE";
    if (words < THIN_WORDS) classification = "EXPAND";
    if (isPolicyPlaceholder(page)) classification = "OPTIMISE";

    return {
      slug,
      url: `${SITE_URL}/${slug}`,
      type: page.type,
      title: page.title,
      meta_title_length: buildMetaTitle(page).length,
      meta_description_length: buildMetaDescription(page).length,
      words,
      faqs: page.faqs?.length ?? 0,
      parent_hub: getParentSlug(page) ?? "",
      inbound_explicit: links.explicit,
      inbound_nav: links.nav,
      inbound_breadcrumb: links.breadcrumb,
      outbound: outbound[slug],
      canonical: `/${slug}`,
      in_sitemap: inSitemap.has(`${SITE_URL}/${slug}`),
      schema: schemaTypes(page),
      last_updated: page.lastUpdated ?? "",
      suggested: classification,
      flags: flags.join(";"),
    };
  });
}

function toCsv(rows) {
  const headers = Object.keys(rows[0]);
  const escape = (value) => `"${String(value).replace(/"/g, '""')}"`;
  return [headers.join(","), ...rows.map((row) => headers.map((header) => escape(row[header])).join(","))].join("\n") + "\n";
}

export function summarise(rows) {
  const count = (fn) => rows.filter(fn).length;
  const byType = rows.reduce((acc, row) => ({ ...acc, [row.type]: (acc[row.type] ?? 0) + 1 }), {});
  const bySuggested = rows.reduce((acc, row) => ({ ...acc, [row.suggested]: (acc[row.suggested] ?? 0) + 1 }), {});
  const sorted = [...rows].sort((a, b) => a.words - b.words);
  return {
    total: rows.length,
    byType,
    bySuggested,
    notInSitemap: count((row) => !row.in_sitemap),
    genericTemplate: count((row) => row.flags.includes("generic-template")),
    thin: count((row) => row.flags.includes("thin")),
    defaultLinksOnly: count((row) => row.flags.includes("derived-links-only")),
    noContextualInbound: count((row) => row.flags.includes("no-contextual-inbound")),
    intentOverlap: count((row) => row.flags.includes("intent-overlap")),
    medianWords: sorted[Math.floor(sorted.length / 2)].words,
    thinnest: sorted.slice(0, 8).map((row) => `${row.slug} (${row.words})`),
  };
}

function toMarkdown(rows, summary) {
  const table = (header, items) => `| ${header.join(" | ")} |\n|${header.map(() => "---").join("|")}|\n${items.map((item) => `| ${item.join(" | ")} |`).join("\n")}\n`;
  const flagged = rows.filter((row) => row.suggested !== "KEEP");
  return `# 01. URL audit

Generated by \`npm run audit:seo -- --write\` from \`src/lib/siteData.js\`. Offline and deterministic: it inspects the site's own data, not live rankings or Search Console. Full per-URL data: \`01-url-audit.csv\`.
Suggested classifications are **heuristics for prioritising review**, not decisions.

## Summary
- Pages: **${summary.total}** (${Object.entries(summary.byType).map(([type, n]) => `${type} ${n}`).join(", ")})
- In sitemap: ${summary.total - summary.notInSitemap}/${summary.total}
- Generic base-template pages: ${summary.genericTemplate}
- Pages under ${THIN_WORDS} words: ${summary.thin} (median page: ${summary.medianWords} words)
- Pages with only the 7 default outbound links: ${summary.defaultLinksOnly}
- Pages with no contextual or sitewide (header/footer) inbound link: ${summary.noContextualInbound}
- Pages in an intent-overlap group: ${summary.intentOverlap}
- Suggested: ${Object.entries(summary.bySuggested).map(([label, n]) => `${label} ${n}`).join(", ")}
- Thinnest: ${summary.thinnest.join(", ")}

## Pages needing attention (${flagged.length})
${table(["URL", "Type", "Words", "Suggested", "Flags"], flagged.map((row) => [`\`/${row.slug}\``, row.type, row.words, row.suggested, row.flags.replace(/;/g, "; ") || "-"]))}`;
}

if (process.argv[1] && import.meta.url === new URL(`file://${process.argv[1]}`).href) {
  const rows = buildAudit();
  const summary = summarise(rows);
  console.log(JSON.stringify(summary, null, 2));
  if (process.argv.includes("--write")) {
    mkdirSync("docs/seo", { recursive: true });
    writeFileSync("docs/seo/01-url-audit.csv", toCsv(rows));
    writeFileSync("docs/seo/01-url-audit.md", toMarkdown(rows, summary));
    console.log("Wrote docs/seo/01-url-audit.csv and docs/seo/01-url-audit.md");
  }
}
