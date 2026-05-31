"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

const TERM_OPTIONS = [6, 12, 18, 24, 36, 48, 60];
const WHATSAPP_NUMBER = "905353998999";

function calcMonthly(principal, aprPct, months) {
  if (!principal || !months) return 0;
  if (aprPct === 0) return principal / months;
  const rate = aprPct / 1200;
  return (principal * rate * Math.pow(1 + rate, months)) / (Math.pow(1 + rate, months) - 1);
}

function formatCurrency(value) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Number.isFinite(value) ? value : 0);
}

export default function HomepageLoanCalculator() {
  const [amount, setAmount] = useState(2500);
  const [apr, setApr] = useState(9.9);
  const [term, setTerm] = useState(24);

  const { monthly, totalRepayable, totalInterest, calculatorHref, whatsappHref } = useMemo(() => {
    const monthlyPayment = calcMonthly(amount, apr, term);
    const repayable = monthlyPayment * term;
    const interest = Math.max(repayable - amount, 0);
    const params = new URLSearchParams({
      amount: String(amount),
      apr: String(apr),
      term: String(term),
    });
    const message = [
      "Hello,",
      "",
      "I used the Dental Finance UK homepage calculator preview.",
      "",
      `Budget: ${formatCurrency(amount)}`,
      `APR: ${apr}%`,
      `Term: ${term} months`,
      `Estimated Monthly Payment: ${formatCurrency(monthlyPayment)}`,
      "",
      "I would like to discuss suitable treatment options.",
    ].join("\n");

    return {
      monthly: monthlyPayment,
      totalRepayable: repayable,
      totalInterest: interest,
      calculatorHref: `/dental-loan-calculator?${params.toString()}`,
      whatsappHref: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
    };
  }, [amount, apr, term]);

  return (
    <section className="surface-card mt-8 overflow-hidden">
      <div className="grid gap-6 p-6 md:p-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
        <div>
          <span className="badge">Calculator Preview</span>
          <h2 className="section-title mt-4 text-3xl">Dental Loan Calculator</h2>
          <p className="mt-3 max-w-2xl text-base text-[#67589e]">
            Estimate your monthly dental treatment payments in seconds, then continue to the full calculator for a
            detailed repayment view.
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <div className="subtle-card p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#65579a]">Monthly repayment</p>
              <p className="mt-2 text-2xl font-extrabold text-[#2f1f75]">{formatCurrency(monthly)}</p>
            </div>
            <div className="subtle-card p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#65579a]">Total repayable</p>
              <p className="mt-2 text-2xl font-bold text-[#2f1f75]">{formatCurrency(totalRepayable)}</p>
            </div>
            <div className="subtle-card p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#65579a]">Total interest</p>
              <p className="mt-2 text-2xl font-bold text-[#2f1f75]">{formatCurrency(totalInterest)}</p>
            </div>
          </div>
        </div>

        <div className="rounded-[1.25rem] border border-[#cbbcf1] bg-[linear-gradient(180deg,#f6f1ff_0%,#fcfbff_100%)] p-5 shadow-[0_16px_40px_rgba(49,31,117,0.12)]">
          <div className="grid gap-4 sm:grid-cols-3">
            <label className="block">
              <span className="text-sm font-semibold text-[#2f1f75]">Loan amount (£)</span>
              <input
                type="number"
                min="100"
                max="100000"
                step="100"
                value={amount}
                onChange={(event) => setAmount(Math.max(0, Number.parseFloat(event.target.value) || 0))}
                className="mt-2 w-full rounded-xl border border-[#cabcf0] bg-white p-3 text-base text-[#0f172a] outline-none transition focus:border-[#6d4fe0]"
                aria-label="Homepage loan amount in pounds"
              />
            </label>
            <label className="block">
              <span className="text-sm font-semibold text-[#2f1f75]">APR (%)</span>
              <input
                type="number"
                min="0"
                max="50"
                step="0.1"
                value={apr}
                onChange={(event) => setApr(Math.max(0, Number.parseFloat(event.target.value) || 0))}
                className="mt-2 w-full rounded-xl border border-[#cabcf0] bg-white p-3 text-base text-[#0f172a] outline-none transition focus:border-[#6d4fe0]"
                aria-label="Homepage annual percentage rate"
              />
            </label>
            <label className="block">
              <span className="text-sm font-semibold text-[#2f1f75]">Term (months)</span>
              <select
                value={term}
                onChange={(event) => setTerm(Number.parseInt(event.target.value, 10))}
                className="mt-2 w-full rounded-xl border border-[#cabcf0] bg-white p-3 text-base text-[#0f172a] outline-none transition focus:border-[#6d4fe0]"
                aria-label="Homepage repayment term in months"
              >
                {TERM_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option} months
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="mt-5 rounded-2xl border border-[#cfbff4] bg-[#eee5ff] p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#65579a]">Estimated monthly payment</p>
            <p className="mt-2 text-3xl font-extrabold text-[#2f1f75]">{formatCurrency(monthly)}</p>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <Link href={calculatorHref} className="btn btn-primary w-full">
              Calculate Payments
            </Link>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn w-full border border-[#25D366] bg-white text-[#166534] hover:bg-[#f0fdf4]"
              aria-label="Speak with treatment team on WhatsApp"
            >
              Speak With Treatment Team
            </a>
          </div>

          <p className="mt-4 text-xs text-[#65579a]">
            Indicative estimate only. Continue to the full calculator for a larger repayment view and comparison
            journey.
          </p>
        </div>
      </div>
    </section>
  );
}
