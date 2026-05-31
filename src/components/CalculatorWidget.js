"use client";
import { useReducer, useState, useEffect, useRef } from "react";
import {
  coerceCalculatorInputs,
  DECIMAL_INPUT_PATTERN,
  normalizeAmountInputOnBlur,
  normalizeAprInputOnBlur,
  parseNumberOrFallback,
} from "@/lib/calculatorInputs";

const TERM_OPTIONS = [6, 12, 18, 24, 36, 48, 60];

function calcMonthly(principal, aprPct, months) {
  if (aprPct === 0) return principal / months;
  const r = aprPct / 1200;
  return (principal * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
}

function formatCurrency(n) {
  return "£" + Math.abs(n).toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function loanReducer(state, action) {
  switch (action.type) {
    case "INIT":
      return { ...state, ...action.payload };
    case "SET_AMOUNT_INPUT":
      return { ...state, amountInput: action.payload };
    case "SET_APR_INPUT":
      return { ...state, aprInput: action.payload };
    case "SET_TERM":
      return { ...state, term: action.payload };
    default:
      return state;
  }
}

export default function CalculatorWidget({ config, treatmentType = "Dental treatment" }) {
  const defaults = config ?? { defaultAmount: 3000, defaultApr: 0, defaultTerm: 24 };
  const [loan, dispatch] = useReducer(loanReducer, {
    amountInput: String(defaults.defaultAmount),
    aprInput: String(defaults.defaultApr),
    term: defaults.defaultTerm,
  });
  const { amountInput, aprInput, term } = loan;
  const [copied, setCopied] = useState(false);
  const skipUrlWrite = useRef(true);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const pAmount = parseFloat(params.get("amount"));
    const pApr = parseFloat(params.get("apr"));
    const pTerm = parseInt(params.get("term"), 10);
    const update = {};
    if (!isNaN(pAmount) && pAmount > 0) update.amountInput = String(params.get("amount"));
    if (!isNaN(pApr) && pApr >= 0) update.aprInput = String(params.get("apr"));
    if (!isNaN(pTerm) && pTerm > 0) update.term = pTerm;
    if (Object.keys(update).length > 0) dispatch({ type: "INIT", payload: update });
  }, []);

  useEffect(() => {
    if (skipUrlWrite.current) {
      skipUrlWrite.current = false;
      return;
    }
    const params = new URLSearchParams();
    if (amountInput !== "") params.set("amount", amountInput);
    if (aprInput !== "") params.set("apr", aprInput);
    params.set("term", term);
    window.history.replaceState(null, "", "?" + params.toString());
  }, [amountInput, aprInput, term]);

  const { amount, apr } = coerceCalculatorInputs({
    amountInput,
    aprInput,
    fallbackAmount: 0,
    fallbackApr: 0,
  });

  const monthly = calcMonthly(amount, apr, term);
  const total = monthly * term;
  const interest = total - amount;

  function handleShare() {
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      })
      .catch(() => {});
  }

  const whatsappMessage = [
    "Hello,",
    "",
    "I used the Dental Finance UK calculator.",
    "",
    `Treatment: ${treatmentType}`,
    `Budget: ${formatCurrency(amount)}`,
    `APR: ${apr}%`,
    `Term: ${term} months`,
    `Estimated Monthly Payment: ${formatCurrency(monthly)}`,
    "",
    "I would like to discuss suitable treatment options.",
  ].join("\n");

  const whatsappHref = `https://wa.me/905353998999?text=${encodeURIComponent(whatsappMessage)}`;
  const monthlyGuidance =
    monthly < 100
      ? "This repayment range is commonly used for veneers and smaller treatment plans."
      : monthly < 150
        ? "Many patients choose treatment plans within this monthly budget."
        : null;

  function handleAmountChange(event) {
    dispatch({ type: "SET_AMOUNT_INPUT", payload: event.target.value });
  }

  return (
    <div className="surface-card p-5">
      <div className="grid gap-4 md:grid-cols-3">
        <label className="block">
          <span className="text-sm font-semibold text-[#2f1f75]">Loan Amount (£)</span>
          <input
            type="text"
            inputMode="decimal"
            pattern={DECIMAL_INPUT_PATTERN}
            autoComplete="off"
            value={amountInput}
            onChange={handleAmountChange}
            onBlur={(event) =>
              dispatch({
                type: "SET_AMOUNT_INPUT",
                payload: normalizeAmountInputOnBlur(event.target.value, {
                  defaultAmount: defaults.defaultAmount,
                  minAmount: 100,
                  maxAmount: 100000,
                }),
              })
            }
            className="mt-2 w-full rounded-xl border border-[#cabcf0] bg-[#fbf8ff] p-2.5 text-base outline-none focus:border-[#6d4fe0]"
            aria-label="Loan amount in pounds"
          />
        </label>
        <label className="block">
          <span className="text-sm font-semibold text-[#2f1f75]">APR (%)</span>
          <input
            type="text"
            inputMode="decimal"
            pattern={DECIMAL_INPUT_PATTERN}
            autoComplete="off"
            value={aprInput}
            onChange={(event) => dispatch({ type: "SET_APR_INPUT", payload: event.target.value })}
            onBlur={(event) =>
              dispatch({
                type: "SET_APR_INPUT",
                payload: normalizeAprInputOnBlur(event.target.value, {
                  defaultApr: parseNumberOrFallback(defaults.defaultApr, 0),
                  minApr: 0,
                  maxApr: 50,
                }),
              })
            }
            className="mt-2 w-full rounded-xl border border-[#cabcf0] bg-[#fbf8ff] p-2.5 text-base outline-none focus:border-[#6d4fe0]"
            aria-label="Annual percentage rate"
          />
        </label>
        <label className="block">
          <span className="text-sm font-semibold text-[#2f1f75]">Term (months)</span>
          <select
            value={term}
            onChange={(e) => dispatch({ type: "SET_TERM", payload: parseInt(e.target.value, 10) })}
            className="mt-2 w-full rounded-xl border border-[#cabcf0] bg-[#fbf8ff] p-2.5 text-base outline-none focus:border-[#6d4fe0]"
            aria-label="Repayment term in months"
          >
            {TERM_OPTIONS.map((t) => (
              <option key={t} value={t}>
                {t} months
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <div className="rounded-2xl border border-[#c9baf1] bg-[#eee5ff] p-4 text-center">
          <p className="text-xs uppercase tracking-wide text-[#65579a]">Monthly Repayment</p>
          <p className="mt-1 text-2xl font-extrabold text-[#2f1f75]">{formatCurrency(monthly)}</p>
        </div>
        <div className="subtle-card p-4 text-center">
          <p className="text-xs uppercase tracking-wide text-[#65579a]">Total Repayable</p>
          <p className="mt-1 text-2xl font-bold text-[#2f1f75]">{formatCurrency(total)}</p>
        </div>
        <div className="subtle-card p-4 text-center">
          <p className="text-xs uppercase tracking-wide text-[#65579a]">Total Interest</p>
          <p className="mt-1 text-2xl font-bold text-[#2f1f75]">{formatCurrency(interest >= 0 ? interest : 0)}</p>
        </div>
      </div>

      {monthlyGuidance ? (
        <p className="mt-4 rounded-xl border border-[#d4c7f5] bg-[#f8f4ff] p-3 text-xs text-[#65579a]">
          <span className="font-semibold">Informational guidance:</span> {monthlyGuidance}
        </p>
      ) : null}

      <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
        <button
          onClick={handleShare}
          className="btn btn-secondary w-full text-sm"
          type="button"
          aria-label="Copy shareable link to clipboard"
        >
          {copied ? "✓ Link copied!" : "Copy shareable link"}
        </button>
        <a
          className="btn btn-secondary w-full text-sm"
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Speak with treatment team on WhatsApp"
        >
          Speak With Treatment Team
        </a>
      </div>

      <p className="mt-4 rounded-xl border border-[#d4c7f5] bg-[#f3edff] p-3 text-xs text-[#65579a]">
        Disclaimer: Indicative estimate only. Figures are based on standard loan amortisation and do not represent a formal credit offer.
      </p>
    </div>
  );
}
