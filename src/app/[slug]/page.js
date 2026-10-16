import { notFound } from "next/navigation";
import PageTemplate from "@/components/PageTemplate";
import CityPageTemplate from "@/components/CityPageTemplate";
import CalculatorHubTemplate from "@/components/CalculatorHubTemplate";
import { getPageBySlug, getPageUrl } from "@/lib/siteData";
import { getStaticSlugParams } from "@/lib/slugRoutes";
import { buildMetaDescription, buildMetaTitle } from "@/lib/seoMeta";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return getStaticSlugParams();
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const page = getPageBySlug(slug);

  if (!page) {
    return {};
  }

  const metaTitle = buildMetaTitle(page);
  const metaDescription = buildMetaDescription(page);

  return {
    title: { absolute: metaTitle },
    description: metaDescription,
    alternates: {
      canonical: `/${page.slug}`,
    },
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      url: getPageUrl(`/${page.slug}`),
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDescription,
    },
  };
}

export default async function SlugPage({ params }) {
  const { slug } = await params;
  const page = getPageBySlug(slug);

  if (!page) {
    notFound();
  }

  if (page.type === "city") {
    return <CityPageTemplate page={page} />;
  }

  if (page.type === "calculator-hub") {
    return <CalculatorHubTemplate page={page} />;
  }

  return <PageTemplate page={page} />;
}
