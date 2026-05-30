import { SITE_URL } from "../lib/siteData.js";

export const dynamic = "force-static";

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/api/", "/private/"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
