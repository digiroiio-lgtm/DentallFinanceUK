import { SITE_URL } from "../lib/siteData.js";

export const dynamic = "force-static";

const DISALLOW = ["/admin/", "/api/", "/private/"];

// Search and answer-engine crawlers are listed explicitly so the policy is visible
// and survives any future change to the wildcard rule. Training-only crawlers
// (for example GPTBot, Google-Extended, CCBot) are deliberately not named here:
// whether to allow or block them is a business decision documented in docs/seo.
const SEARCH_CRAWLERS = ["Googlebot", "Bingbot", "OAI-SearchBot", "ChatGPT-User", "PerplexityBot"];

export default function robots() {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: DISALLOW },
      { userAgent: SEARCH_CRAWLERS, allow: "/", disallow: DISALLOW },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
