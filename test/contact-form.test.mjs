import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { pageMap } from "../src/lib/siteData.js";

test("contact page exists so the Formspree contact form is rendered", () => {
  assert.ok(pageMap.contact);
  assert.equal(pageMap.contact.slug, "contact");
});

test("contact form posts to the Formspree form and has a honeypot", () => {
  const source = readFileSync(new URL("../src/components/ContactForm.js", import.meta.url), "utf8");
  assert.match(source, /useForm\(FORMSPREE_FORM_ID\)/);
  assert.match(source, /FORMSPREE_FORM_ID = "meaevwyv"/);
  assert.match(source, /name="_gotcha"/);
  assert.match(source, /name="compliance_ack"[^>]*required/);
});
