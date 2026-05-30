"use client";
import { useReducer, useState, useEffect, useRef } from "react";

const TERM_OPTIONS = [6, 12, 18, 24, 36, 48, 60];

function calcMonthly(principal, aprPct, months) {
  if (aprPct === 0) return principal / months;
  const r = aprPct / 1200;
  return (principal * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
}

function fmt(n) {
  return "£" + Math.abs(n).toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function loanReducer(state, action) {
  switch (action.type) {
    case "INIT":
      return { ...state, ...action.payload };
    case "SET_AMOUNT":
      return { ...state, amount: action.payload };
    case "SET_APR":
      return { ...state, apr: action.payload };
    case "SET_TERM":
      return { ...state, term: action.payload };
    default:
      return state;
  }
}

export default function CalculatorWidget({ config }) {
  const defaults = config ?? { defaultAmount: 3000, defaultApr: 0, defaultTerm: 24 };
  const [loan, dispatch] = useReducer(loanReducer, {
    amount: defaults.defaultAmount,
    apr: defaults.defaultApr,
    term: defaults.defaultTerm,
  });
  const { amount, apr, term } = loan;
  const [copied, setCopied] = useState(false);
  const skipUrlWrite = useRef(true);

  // On mount: read URL params and initialise state from them
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const pAmount = parseFloat(params.get("amount"));
    const pApr = parseFloat(params.get("apr"));
    const pTerm = parseInt(params.get("term"), 10);
    const update = {};
    if (!isNaN(pAmount) && pAmount > 0) update.amount = pAmount;
    if (!isNaN(pApr) && pApr >= 0) update.apr = pApr;
    if (!isNaN(pTerm) && pTerm > 0) update.term = pTerm;
    if (Object.keys(update).length > 0) dispatch({ type: "INIT", payload: update });
  }, []);

  // After user changes state: write updated params back to the URL
  useEffect(() => {
    if (skipUrlWrite.current) {
      skipUrlWrite.current = false;
      return;
    }
    const params = new URLSearchParams();
    params.set("amount", amount);
    params.set("apr", apr);
    params.set("term", term);
    window.history.replaceState(null, "", "?" + params.toString());
  }, [amount, apr, term]);

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

  return (
    <div className="rounded border border-gray-200 p-4">
      <div className="grid gap-4 sm:grid-cols-3">
        <label className="block">
          <span className="text-sm font-medium">Loan Amount (£)</span>
          <input
            type="number"
            min="100"
            max="100000"
            step="100"
            value={amount}
            onChange={(e) => dispatch({ type: "SET_AMOUNT", payload: Math.max(0, parseFloat(e.target.value) || 0) })}
            className="mt-1 w-full rounded border border-gray-300 p-2 text-base"
            aria-label="Loan amount in pounds"
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium">APR (%)</span>
          <input
            type="number"
            min="0"
            max="50"
            step="0.1"
            value={apr}
            onChange={(e) => dispatch({ type: "SET_APR", payload: Math.max(0, parseFloat(e.target.value) || 0) })}
            className="mt-1 w-full rounded border border-gray-300 p-2 text-base"
            aria-label="Annual percentage rate"
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium">Term (months)</span>
          <select
            value={term}
            onChange={(e) => dispatch({ type: "SET_TERM", payload: parseInt(e.target.value, 10) })}
            className="mt-1 w-full rounded border border-gray-300 p-2 text-base"
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

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <div className="rounded bg-blue-50 p-3 text-center">
          <p className="text-sm text-gray-600">Monthly Payment</p>
          <p className="text-2xl font-bold text-blue-800">{fmt(monthly)}</p>
        </div>
        <div className="rounded bg-gray-50 p-3 text-center">
          <p className="text-sm text-gray-600">Total Repayable</p>
          <p className="text-2xl font-bold">{fmt(total)}</p>
        </div>
        <div className="rounded bg-gray-50 p-3 text-center">
          <p className="text-sm text-gray-600">Total Interest</p>
          <p className="text-2xl font-bold">{fmt(interest >= 0 ? interest : 0)}</p>
        </div>
      </div>

      <p className="mt-3 text-xs text-gray-500">
        Indicative estimate only. Figures are based on standard loan amortisation and do not represent a formal
        credit offer or lender illustration.
      </p>

      <button
        onClick={handleShare}
        className="mt-3 rounded border border-blue-700 px-4 py-2 text-sm text-blue-700 hover:bg-blue-50"
        type="button"
        aria-label="Copy shareable link to clipboard"
      >
        {copied ? "✓ Link copied!" : "Copy shareable link"}
      </button>
    </div>
  );
}
