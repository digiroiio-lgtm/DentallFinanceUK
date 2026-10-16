import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { ANALYTICS_CONFIGURED, CONSENT_KEY, getConsent, isValidGaId, setConsent } from "../src/lib/consent.js";
import { pageMap } from "../src/lib/siteData.js";

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");

function mockWindow() {
  const store = new Map();
  const events = [];
  globalThis.window = {
    localStorage: { getItem: (k) => (store.has(k) ? store.get(k) : null), setItem: (k, v) => store.set(k, String(v)) },
    dispatchEvent: (event) => events.push(event),
  };
  globalThis.CustomEvent ??= class extends Event {
    constructor(type, init) {
      super(type);
      this.detail = init?.detail;
    }
  };
  return { store, events };
}

test("consent round-trips and ignores invalid values", () => {
  const { store, events } = mockWindow();
  try {
    assert.equal(getConsent(), null);
    setConsent("granted");
    assert.equal(store.get(CONSENT_KEY), "granted");
    assert.equal(getConsent(), "granted");
    setConsent("denied");
    assert.equal(getConsent(), "denied");
    setConsent("yes please");
    assert.equal(getConsent(), "denied");
    assert.equal(events.length, 2);
  } finally {
    delete globalThis.window;
  }
});

test("only well-formed GA4 IDs are accepted", () => {
  assert.ok(isValidGaId("G-ABC1234XYZ"));
  for (const bad of ["", "UA-123456-1", "G-", "g-abc1234", 'G-ABC123"><script>', "G-ABC123&x=1", undefined, null]) {
    assert.equal(isValidGaId(bad), false, String(bad));
  }
});

test("without a GA4 ID nothing is configured and policies say no analytics cookies", () => {
  assert.equal(ANALYTICS_CONFIGURED, false);
  assert.match(pageMap["cookie-policy"].answerBlock, /does not currently set analytics/);
  assert.ok(!JSON.stringify(pageMap["privacy-policy"]).includes("Google Analytics"));
});

test("with a GA4 ID the policies describe consent-based Google Analytics", () => {
  const script = `
    const { pageMap } = await import(${JSON.stringify(new URL("../src/lib/siteData.js", import.meta.url).href)});
    const cookie = JSON.stringify(pageMap["cookie-policy"]);
    const privacy = JSON.stringify(pageMap["privacy-policy"]);
    console.log(JSON.stringify({
      cookieGa: cookie.includes("only if you accept"),
      gaCookie: cookie.includes("_ga"),
      privacyGa: privacy.includes("Google (Google Analytics), only if you accept"),
    }));`;
  const result = spawnSync(process.execPath, ["--input-type=module", "-e", script], {
    env: { ...process.env, NEXT_PUBLIC_GA_ID: "G-TEST12345" },
    encoding: "utf8",
  });
  const line = result.stdout.trim().split("\n").pop();
  assert.deepEqual(JSON.parse(line), { cookieGa: true, gaCookie: true, privacyGa: true });
});

test("banner loads Google Analytics only after consent and offers an equal reject choice", () => {
  const source = read("src/components/CookieConsent.js");
  assert.match(source, /if \(!ANALYTICS_CONFIGURED \|\| !open\) return null;/);
  const loadCalls = source.match(/(?<!function )loadGoogleAnalytics\(\)/g) ?? [];
  assert.equal(loadCalls.length, 2, "loaded only on stored consent and on accept");
  assert.match(source, /if \(current === "granted"\) loadGoogleAnalytics\(\);/);
  assert.match(source, /if \(value === "granted"\) loadGoogleAnalytics\(\);/);
  const buttons = [...source.matchAll(/<button type="button" className="([^"]+)" onClick=\{\(\) => choose\("(granted|denied)"\)\}/g)];
  assert.equal(buttons.length, 2);
  assert.equal(buttons[0][1], buttons[1][1], "accept and reject must look the same");
  assert.ok(!/checked|defaultChecked/.test(source), "no pre-ticked options");
  assert.match(read("src/components/LegalFooter.js"), /CookieSettingsButton/);
  assert.match(read("src/app/layout.js"), /<CookieConsent \/>/);
});
