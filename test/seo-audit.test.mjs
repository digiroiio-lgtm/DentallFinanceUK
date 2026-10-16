import test from "node:test";
import assert from "node:assert/strict";
import { pageSlugs } from "../src/lib/siteData.js";
import { buildAudit, summarise } from "../scripts/seo-audit.mjs";
import { getBreadcrumbTrail, getParentSlug } from "../src/lib/breadcrumbs.js";
import { pageMap } from "../src/lib/siteData.js";

test("audit covers every page exactly once and everything is in the sitemap", () => {
  const rows = buildAudit();
  assert.equal(rows.length, pageSlugs.length);
  assert.deepEqual(rows.map((row) => row.slug).sort(), [...pageSlugs].sort());
  assert.ok(rows.every((row) => row.in_sitemap));
  assert.ok(rows.every((row) => row.meta_title_length <= 60 && row.meta_description_length <= 160));
  const summary = summarise(rows);
  assert.equal(summary.total, pageSlugs.length);
});

test("breadcrumb parents are real pages and never self-referencing", () => {
  for (const page of Object.values(pageMap)) {
    const parent = getParentSlug(page);
    if (parent) {
      assert.ok(pageMap[parent], `${page.slug} has unknown parent ${parent}`);
      assert.notEqual(parent, page.slug);
    }
    const trail = getBreadcrumbTrail(page);
    assert.equal(trail[0].href, "/");
    assert.equal(trail.at(-1).href, `/${page.slug}`);
  }
});

test("no fabricated author or reviewer personas remain in page data", () => {
  const serialised = JSON.stringify(pageMap);
  for (const name of ["James Walker", "Michael Brown", "Sarah Thompson", "Emily Carter"]) {
    assert.ok(!serialised.includes(name), `${name} still present`);
  }
  for (const page of Object.values(pageMap)) {
    assert.equal(page.author, "DentalFinanceUK Editorial Team");
    assert.equal(page.financeReviewer, undefined);
    assert.equal(page.dentalReviewer, undefined);
  }
});
