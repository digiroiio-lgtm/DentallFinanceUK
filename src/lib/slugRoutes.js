import { pageSlugs } from "./siteData.js";

export function getStaticSlugParams() {
  return pageSlugs.map((slug) => ({ slug }));
}
