import test from "node:test";
import assert from "node:assert/strict";
import { pageMap } from "../src/lib/siteData.js";
import {
  buildMetaDescription,
  buildMetaTitle,
  MAX_DESCRIPTION_LENGTH,
  MAX_TITLE_LENGTH,
} from "../src/lib/seoMeta.js";

test("every page gets a title within the search-result limit", () => {
  for (const page of Object.values(pageMap)) {
    const title = buildMetaTitle(page);
    assert.ok(title.length <= MAX_TITLE_LENGTH, `${page.slug}: ${title.length} chars "${title}"`);
    assert.ok(title.length >= 20, `${page.slug}: title too short`);
  }
});

test("every page gets a description within the search-result limit", () => {
  for (const page of Object.values(pageMap)) {
    const description = buildMetaDescription(page);
    assert.ok(description.length <= MAX_DESCRIPTION_LENGTH, `${page.slug}: ${description.length} chars`);
    assert.ok(description.length >= 70, `${page.slug}: description too short`);
  }
});

test("short titles keep the site name suffix and explicit overrides win", () => {
  assert.equal(buildMetaTitle({ title: "Dental Payment Plans" }), "Dental Payment Plans | Dental Finance UK");
  assert.equal(buildMetaTitle({ title: "x".repeat(90), metaTitle: "Custom" }), "Custom");
  assert.equal(buildMetaDescription({ description: "Short", metaDescription: "Override" }), "Override");
});

test("titles are unique after shortening", () => {
  const seen = new Map();
  for (const page of Object.values(pageMap)) {
    const title = buildMetaTitle(page);
    assert.ok(!seen.has(title), `${page.slug} duplicates ${seen.get(title)}: ${title}`);
    seen.set(title, page.slug);
  }
});
