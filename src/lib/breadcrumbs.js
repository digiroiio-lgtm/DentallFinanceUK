import { getPageUrl, pageMap } from "./siteData.js";

// Parent hub for each page, used for visible breadcrumbs and BreadcrumbList schema.
// Rules run in order; the first match wins. A page is never its own parent.
const PROVIDER_PATTERN =
  /kandoo|tabeo|v12|chrysalis|medenta|practi|ideal4finance|dental-finance-companies|best-dental-finance-provider|compare-dental-finance-providers/;
const CREDIT_PATTERN = /bad-credit|credit-score|declined|eligib|missed-payments|defaults|approval/;

const PARENT_RULES = [
  { test: (page) => page.type === "city", parent: "dental-finance-uk" },
  { test: (page) => page.type === "calculator", parent: "finance-calculator" },
  { test: (page) => PROVIDER_PATTERN.test(page.slug), parent: "finance-providers" },
  { test: (page) => /turkey|hollywood-smile/.test(page.slug), parent: "turkey-teeth-finance" },
  { test: (page) => CREDIT_PATTERN.test(page.slug), parent: "bad-credit-dental-finance" },
  { test: (page) => /crown/.test(page.slug), parent: "dental-payment-plans" },
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
