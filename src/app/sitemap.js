import { SITE_URL, pageMap, pageSlugs } from "../lib/siteData.js";

export const dynamic = "force-static";

function toDate(value) {
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? undefined : parsed;
}

export default function sitemap() {
  const pageDates = pageSlugs.map((slug) => toDate(pageMap[slug].lastUpdated)).filter(Boolean);
  const latest = pageDates.length ? new Date(Math.max(...pageDates.map((date) => date.getTime()))) : undefined;

  return [
    {
      url: SITE_URL,
      lastModified: latest,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...pageSlugs.map((slug) => ({
      url: `${SITE_URL}/${slug}`,
      lastModified: toDate(pageMap[slug].lastUpdated),
      changeFrequency: "weekly",
      priority: slug === "dental-finance-uk" ? 0.95 : 0.8,
    })),
  ];
}
