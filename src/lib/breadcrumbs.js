import { getInternalLinks, getPageUrl, pageMap, pageSlugs } from "./siteData.js";

// Parent hub for each page, used for visible breadcrumbs and BreadcrumbList schema.
// Rules run in order; the first match wins. A page is never its own parent.
const PROVIDER_PATTERN =
  /kandoo|tabeo|v12|chrysalis|medenta|practi|ideal4finance|dental-finance-companies|best-dental-finance-provider|compare-dental-finance-providers/;
const CREDIT_PATTERN = /bad-credit|credit-score|declined|eligib|missed-payments|defaults|approval|ccj|no-credit-check/;

const PARENT_RULES = [
  { test: (page) => page.type === "city" && page.slug.startsWith("dental-implants-finance-"), parent: "dental-implants-finance" },
  { test: (page) => page.type === "city" && page.slug.startsWith("veneers-finance-"), parent: "veneers-finance" },
  { test: (page) => page.type === "city", parent: "dental-finance-uk" },
  { test: (page) => page.type === "calculator", parent: "finance-calculator" },
  { test: (page) => PROVIDER_PATTERN.test(page.slug), parent: "finance-providers" },
  { test: (page) => /turkey|hollywood-smile/.test(page.slug), parent: "turkey-teeth-finance" },
  { test: (page) => CREDIT_PATTERN.test(page.slug), parent: "bad-credit-dental-finance" },
  { test: (page) => /crown|insurance-vs-dental-plans/.test(page.slug), parent: "dental-payment-plans" },
  { test: (page) => /aligner/.test(page.slug), parent: "cosmetic-dentistry-finance" },
  { test: (page) => /implant|all-on/.test(page.slug), parent: "dental-implants-finance" },
  { test: (page) => /veneer|cosmetic/.test(page.slug), parent: "veneers-finance" },
  { test: (page) => /calculator|methodology/.test(page.slug), parent: "finance-calculator" },
  { test: (page) => page.type === "policy", parent: null },
  { test: (page) => page.type === "article", parent: "dental-finance-uk" },
];

export function getParentSlug(page) {
  for (const rule of PARENT_RULES) {
    if (!rule.test(page)) continue;
    if (rule.parent && rule.parent !== page.slug && pageMap[rule.parent]) return rule.parent;
    if (rule.parent === null) return null;
  }
  return null;
}

export function getBreadcrumbTrail(page) {
  const trail = [{ name: "Home", href: "/" }];
  const parentSlug = getParentSlug(page);
  if (parentSlug) {
    trail.push({ name: pageMap[parentSlug].title, href: `/${parentSlug}` });
  }
  trail.push({ name: page.title, href: `/${page.slug}` });
  return trail;
}

export function buildBreadcrumbSchema(page) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: getBreadcrumbTrail(page).map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: getPageUrl(item.href),
    })),
  };
}

// Related links ---------------------------------------------------------------------
// Pages with their own `internalLinks` keep them. Others get topic links: parent hub,
// closest siblings and the calculator hub, instead of the same seven links everywhere.
// Hubs also link down to their key spokes, and a few priority cluster siblings are
// appended so new guides are reachable from the pages people already read.

const PRIORITY_SIBLINGS = [
  "bad-credit-dental-finance",
  "dental-finance-with-ccj",
  "no-credit-check-dental-finance",
  "dental-finance-low-credit-score",
];
const MAX_LINKS = 10;

function shortLabel(page) {
  const [head] = page.title.split(/:| \| /);
  return head.trim().length >= 15 ? head.trim() : page.title;
}

function toLink(slug) {
  return { href: `/${slug}`, label: shortLabel(pageMap[slug]) };
}

export function getChildren(slug) {
  return pageSlugs.filter((candidate) => candidate !== slug && getParentSlug(pageMap[candidate]) === slug);
}

export function getRelatedLinks(page) {
  const parentSlug = getParentSlug(page);
  const seen = new Set([`/${page.slug}`]);
  const links = [];
  const add = (link, { force = false } = {}) => {
    if (!link || seen.has(link.href) || (!force && links.length >= MAX_LINKS)) return;
    seen.add(link.href);
    links.push(link);
  };

  if (page.internalLinks?.length) {
    // Hand-written lists are never truncated.
    page.internalLinks.forEach((link) => add(link, { force: true }));
  } else if (parentSlug) {
    add(toLink(parentSlug));
    getChildren(parentSlug)
      .filter((slug) => slug !== page.slug && pageMap[slug].type !== "city")
      .slice(0, 3)
      .forEach((slug) => add(toLink(slug)));
    if (page.type !== "calculator" && pageMap["finance-calculator"]) add(toLink("finance-calculator"));
    add(toLink("dental-finance-uk"));
  } else {
    getInternalLinks(page.slug).forEach(add);
  }

  // Priority siblings: reach the credit guides from the rest of their cluster.
  if (parentSlug === "bad-credit-dental-finance") {
    PRIORITY_SIBLINGS.filter((slug) => pageMap[slug]).forEach((slug) => add(toLink(slug)));
  }

  // Hubs link down to their spokes (cities are linked from dedicated local sections).
  const children = getChildren(page.slug).filter((slug) => pageMap[slug].type !== "city");
  if (children.length >= 3) {
    const prioritised = [...children].sort((a, b) => Number(PRIORITY_SIBLINGS.includes(b)) - Number(PRIORITY_SIBLINGS.includes(a)));
    prioritised.slice(0, 6).forEach((slug) => add(toLink(slug)));
  }

  return links;
}
