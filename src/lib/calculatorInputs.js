export const DECIMAL_INPUT_PATTERN = "[0-9]*[.]?[0-9]*";

export function parseNumberOrFallback(value, fallback) {
  if (typeof value === "number") {
    return Number.isFinite(value) ? value : fallback;
  }

  if (typeof value !== "string") return fallback;

  const trimmed = value.trim();
  if (trimmed === "") return fallback;

  const parsed = Number.parseFloat(trimmed);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function clampNumber(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

export function normalizeAmountInputOnBlur(value, { defaultAmount = 100, minAmount = 100, maxAmount = 100000 } = {}) {
  if (typeof value === "string" && value.trim() === "") return String(defaultAmount);
  const parsed = parseNumberOrFallback(value, Number.NaN);
  if (!Number.isFinite(parsed)) return String(defaultAmount);
  return String(clampNumber(parsed, minAmount, maxAmount));
}

export function normalizeAprInputOnBlur(value, { defaultApr = 0, minApr = 0, maxApr = 50 } = {}) {
  if (typeof value === "string" && value.trim() === "") return String(defaultApr);
  const parsed = parseNumberOrFallback(value, Number.NaN);
  if (!Number.isFinite(parsed)) return String(defaultApr);
  return String(clampNumber(parsed, minApr, maxApr));
}

export function coerceCalculatorInputs({ amountInput, aprInput, fallbackAmount = 0, fallbackApr = 0 }) {
  return {
    amount: Math.max(0, parseNumberOrFallback(amountInput, fallbackAmount)),
    apr: Math.max(0, parseNumberOrFallback(aprInput, fallbackApr)),
  };
}
