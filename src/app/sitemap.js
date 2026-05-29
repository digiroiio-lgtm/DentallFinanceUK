import { SITE_URL, pageSlugs } from "../lib/siteData.js";

export default function sitemap() {
  const now = new Date();
  return [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...pageSlugs.map((slug) => ({
      url: `${SITE_URL}/${slug}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: slug === "dental-finance-uk" ? 0.95 : 0.8,
    })),
  ];
}
