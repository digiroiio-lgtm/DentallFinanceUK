import { notFound } from "next/navigation";
import PageTemplate from "@/components/PageTemplate";
import CityPageTemplate from "@/components/CityPageTemplate";
import CalculatorHubTemplate from "@/components/CalculatorHubTemplate";
import { getPageBySlug, getPageUrl } from "@/lib/siteData";
import { getStaticSlugParams } from "@/lib/slugRoutes";

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

  return {
    title: page.title,
    description: page.description,
    alternates: {
      canonical: `/${page.slug}`,
    },
    openGraph: {
      title: page.title,
      description: page.description,
      url: getPageUrl(`/${page.slug}`),
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
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
