"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

const treatmentOptions = [
  {
    id: "veneers",
    label: "Veneers",
    estimatedCost: "£3,500",
    estimatedMonthly: "£146",
    calculatorHref: "/veneer-finance-calculator",
    calculatorLabel: "Veneer Finance Calculator",
  },
  {
    id: "implants",
    label: "Dental Implants",
    estimatedCost: "£4,800",
    estimatedMonthly: "£200",
    calculatorHref: "/implant-finance-calculator",
    calculatorLabel: "Implant Finance Calculator",
  },
  {
    id: "all-on-4",
    label: "All-on-4",
    estimatedCost: "£7,000",
    estimatedMonthly: "£292",
    calculatorHref: "/all-on-4-finance-calculator",
    calculatorLabel: "All-on-4 Finance Calculator",
  },
  {
    id: "all-on-6",
    label: "All-on-6",
    estimatedCost: "£9,500",
    estimatedMonthly: "£396",
    calculatorHref: "/all-on-6-finance-calculator",
    calculatorLabel: "All-on-6 Finance Calculator",
  },
  {
    id: "turkey-teeth",
    label: "Turkey Teeth",
    estimatedCost: "£4,000",
    estimatedMonthly: "£167",
    calculatorHref: "/finance-calculator",
    calculatorLabel: "Finance Calculator",
  },
];

export default function TreatmentSelectorSection() {
  const [selectedTreatment, setSelectedTreatment] = useState(treatmentOptions[0].id);
  const currentTreatment = useMemo(
    () => treatmentOptions.find((item) => item.id === selectedTreatment) ?? treatmentOptions[0],
    [selectedTreatment],
  );

  return (
    <section className="surface-card mt-8 p-6">
      <h2 className="section-title text-2xl">What treatment are you considering?</h2>
      <fieldset className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {treatmentOptions.map((option) => (
          <label key={option.id} className="subtle-card interactive-card flex cursor-pointer items-center gap-3 p-3">
            <input
              type="radio"
              name="treatment-selector"
              value={option.id}
              checked={selectedTreatment === option.id}
              onChange={() => setSelectedTreatment(option.id)}
              aria-label={`Select ${option.label}`}
            />
            <span className="text-sm font-semibold text-[#2f1f75]">{option.label}</span>
          </label>
        ))}
      </fieldset>

      <div className="mt-5 grid gap-3 md:grid-cols-3">
        <div className="subtle-card p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#65579a]">Estimated cost</p>
          <p className="mt-2 text-2xl font-extrabold text-[#2f1f75]">{currentTreatment.estimatedCost}</p>
        </div>
        <div className="subtle-card p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#65579a]">Estimated monthly payment</p>
          <p className="mt-2 text-2xl font-extrabold text-[#2f1f75]">{currentTreatment.estimatedMonthly}</p>
        </div>
        <div className="subtle-card p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#65579a]">Recommended calculator</p>
          <Link href={currentTreatment.calculatorHref} className="btn btn-primary mt-3 w-full text-center">
            {currentTreatment.calculatorLabel}
          </Link>
        </div>
      </div>

      <p className="mt-4 text-xs text-[#65579a]">Illustrative examples only and subject to provider eligibility criteria.</p>
    </section>
  );
}
