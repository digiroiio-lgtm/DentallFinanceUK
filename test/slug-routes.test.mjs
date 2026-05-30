import test from "node:test";
import assert from "node:assert/strict";
import { primaryNav, pageMap } from "../src/lib/siteData.js";
import { requiredProductionRoutePaths } from "../src/lib/routeAuditPaths.js";
import { getStaticSlugParams } from "../src/lib/slugRoutes.js";

test("primary navigation slugs exist in pageMap", () => {
  for (const { href } of primaryNav.filter((item) => item.href !== "/")) {
    const slug = href.slice(1);

    assert.ok(pageMap[slug], `Missing pageMap entry for ${href}`);
  }
});

test("generateStaticParams includes required navigation slugs", () => {
  const params = getStaticSlugParams();
  const generatedSlugs = new Set(params.map(({ slug }) => slug));

  for (const href of requiredProductionRoutePaths) {
    const slug = href.slice(1);

    assert.ok(generatedSlugs.has(slug), `Missing generated slug for ${href}`);
  }
});
