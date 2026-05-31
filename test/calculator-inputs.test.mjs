import test from "node:test";
import assert from "node:assert/strict";
import {
  coerceCalculatorInputs,
  normalizeAmountInputOnBlur,
  normalizeAprInputOnBlur,
  parseNumberOrFallback,
} from "../src/lib/calculatorInputs.js";

function calcMonthly(principal, aprPct, months) {
  if (aprPct === 0) return principal / months;
  const rate = aprPct / 1200;
  return (principal * rate * Math.pow(1 + rate, months)) / (Math.pow(1 + rate, months) - 1);
}

test("allows loan amount to be cleared completely while typing", () => {
  assert.equal(parseNumberOrFallback("", 0), 0);
});

test("allows typing a new amount from empty input", () => {
  assert.equal(parseNumberOrFallback("4500", 0), 4500);
});

test("allows APR to be cleared completely while typing", () => {
  assert.equal(parseNumberOrFallback("", 0), 0);
});

test("parses decimal APR temporary states", () => {
  assert.equal(parseNumberOrFallback("9.", 0), 9);
  assert.equal(parseNumberOrFallback(".9", 0), 0.9);
});

test('normalizes APR "08.9" on blur', () => {
  assert.equal(normalizeAprInputOnBlur("08.9"), "8.9");
});

test("keeps calculation stable while amount is temporarily empty", () => {
  const { amount, apr } = coerceCalculatorInputs({
    amountInput: "",
    aprInput: "9.9",
    fallbackAmount: 0,
    fallbackApr: 0,
  });

  const monthly = calcMonthly(amount, apr, 24);
  assert.equal(amount, 0);
  assert.ok(Number.isFinite(monthly));
  assert.equal(monthly, 0);
});

test("normalizes amount on blur after temporary empty state", () => {
  assert.equal(normalizeAmountInputOnBlur("", { defaultAmount: 3000 }), "3000");
});
