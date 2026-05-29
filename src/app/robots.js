import { SITE_URL } from "../lib/siteData.js";

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
