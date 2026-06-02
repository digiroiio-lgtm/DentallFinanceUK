"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

const TREATMENT_PRESETS = [
  { label: "Dental Implants (single)", ukCost: 3500, turkeyCost: 1200 },
  { label: "Veneers (6 teeth)", ukCost: 6000, turkeyCost: 2200 },
  { label: "Full Smile Makeover", ukCost: 14000, turkeyCost: 4500 },
  { label: "All-on-4 Implants", ukCost: 22000, turkeyCost: 7500 },
];

function formatGBP(value) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0,
  }).format(Number.isFinite(value) ? value : 0);
}

export default function UkTurkeySavingsCalculator() {
  const [selectedIndex, setSelectedIndex] = useState(2);
  const [ukInput, setUkInput] = useState(String(TREATMENT_PRESETS[2].ukCost));
  const [turkeyInput, setTurkeyInput] = useState(String(TREATMENT_PRESETS[2].turkeyCost));

  function handlePresetChange(index) {
    setSelectedIndex(index);
    setUkInput(String(TREATMENT_PRESETS[index].ukCost));
    setTurkeyInput(String(TREATMENT_PRESETS[index].turkeyCost));
  }

  const { ukCost, turkeyCost, saving, savingPct } = useMemo(() => {
    const uk = Number.parseFloat(ukInput.replace(/[^0-9.]/g, "")) || 0;
    const turkey = Number.parseFloat(turkeyInput.replace(/[^0-9.]/g, "")) || 0;
    const diff = Math.max(uk - turkey, 0);
    const pct = uk > 0 ? Math.round((diff / uk) * 100) : 0;
    return { ukCost: uk, turkeyCost: turkey, saving: diff, savingPct: pct };
  }, [ukInput, turkeyInput]);

  return (
    <section className="surface-card mt-8 p-6 md:p-8">
      <span className="badge">Savings Calculator</span>
      <h2 className="section-title mt-4 text-2xl">UK vs Turkey Cost Comparison</h2>
      <p className="mt-2 text-sm text-[#67589e]">
        Estimate how much you could save by comparing UK and Turkey treatment costs. Select a treatment or enter your own figures.
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {TREATMENT_PRESETS.map((preset, index) => (
          <button
            key={preset.label}
            type="button"
            onClick={() => handlePresetChange(index)}
            className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
              selectedIndex === index
                ? "border-[#7350e6] bg-[#7350e6] text-white"
                : "border-[#c8baee] bg-white text-[#2f1f75] hover:border-[#7350e6]"
            }`}
          >
            {preset.label}
          </button>
        ))}
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1.2fr]">
        <div>
          <label className="block text-sm font-semibold text-[#2f1f75]" htmlFor="uk-cost-input">
            UK Cost (£)
          </label>
          <input
            id="uk-cost-input"
            type="text"
            inputMode="numeric"
            autoComplete="off"
            value={ukInput}
            onChange={(event) => {
              setSelectedIndex(-1);
              setUkInput(event.target.value);
            }}
            className="mt-2 w-full rounded-xl border border-[#cabcf0] bg-white p-3 text-base text-[#0f172a] outline-none transition focus:border-[#6d4fe0]"
            aria-label="UK treatment cost in pounds"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-[#2f1f75]" htmlFor="turkey-cost-input">
            Turkey Cost (£)
          </label>
          <input
            id="turkey-cost-input"
            type="text"
            inputMode="numeric"
            autoComplete="off"
            value={turkeyInput}
            onChange={(event) => {
              setSelectedIndex(-1);
              setTurkeyInput(event.target.value);
            }}
            className="mt-2 w-full rounded-xl border border-[#cabcf0] bg-white p-3 text-base text-[#0f172a] outline-none transition focus:border-[#6d4fe0]"
            aria-label="Turkey treatment cost in pounds"
          />
        </div>

        <div className="rounded-2xl border-2 border-[#2e7d32] bg-[#f0fdf4] p-4 sm:col-span-2 lg:col-span-1">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#166534]">Potential Saving</p>
          <p className="mt-1 text-3xl font-extrabold text-[#15803d]">{formatGBP(saving)}</p>
          {savingPct > 0 ? (
            <p className="mt-1 text-sm font-semibold text-[#166534]">{savingPct}% less than UK price</p>
          ) : null}
          <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-[#374151]">
            <div>
              <span className="font-medium text-[#4b5563]">UK:</span> {formatGBP(ukCost)}
            </div>
            <div>
              <span className="font-medium text-[#4b5563]">Turkey:</span> {formatGBP(turkeyCost)}
            </div>
          </div>
        </div>
      </div>

      <p className="mt-4 text-xs text-[#65579a]">
        Estimates only. Actual treatment costs vary by clinic, complexity and individual circumstances. Finance options
        are available for both UK and Turkey treatments.{" "}
        <Link href="/turkey-dental-finance" className="font-semibold text-[#5f3cd5] hover:underline">
          Learn more about Turkey dental finance →
        </Link>
      </p>
    </section>
  );
}
