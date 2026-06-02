"use client";

import Link from "next/link";
import { useState } from "react";

export default function LeadCtaSection({
  title = "Ready to compare dental finance options?",
  description = "Use our calculator to estimate monthly payments and compare available lenders.",
}) {
  const [budget, setBudget] = useState("");
  const [treatment, setTreatment] = useState("");
  const [errors, setErrors] = useState({ budget: "", treatment: "" });

  function handleSubmit(event) {
    event.preventDefault();

    const trimmedBudget = budget.trim();
    const trimmedTreatment = treatment.trim();
    const nextErrors = {
      budget: trimmedBudget ? "" : "Budget is required.",
      treatment: trimmedTreatment ? "" : "Treatment is required.",
    };

    setErrors(nextErrors);

    if (nextErrors.budget || nextErrors.treatment) {
      return;
    }

    const eventParams = {
      budget: trimmedBudget,
      treatment: trimmedTreatment,
    };

    if (typeof window !== "undefined") {
      if (typeof window.gtag === "function") {
        window.gtag("event", "clinic_match_request", eventParams);
      } else if (Array.isArray(window.dataLayer)) {
        window.dataLayer.push({ event: "clinic_match_request", ...eventParams });
      }
    }

    const message = `New Clinic Match Request

Budget: ${trimmedBudget}
Treatment: ${trimmedTreatment}

Submitted from Finance Guidance Form.`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/905353998999?text=${encodedMessage}`;

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  }

  return (
    <section className="surface-card mt-10 bg-gradient-to-r from-[#f1e8ff] to-[#faf7ff] p-6 text-[#0f172a] md:from-[#2b1b6b] md:to-[#6e4adf] md:text-white">
      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr] lg:items-center">
        <div>
          <h2 className="text-2xl font-bold text-[#0f172a] md:text-white">{title}</h2>
          <p className="mt-2 text-sm text-[#334155] md:text-[#eee7ff]">
            {description}
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/finance-calculator" className="btn btn-primary">
              Calculate Monthly Payments
            </Link>
            <Link href="/finance-providers" className="btn btn-secondary">
              Compare Finance Providers
            </Link>
          </div>
        </div>

        <form className="lead-form-card" onSubmit={handleSubmit} noValidate>
          <p className="text-sm font-semibold text-[#0f2858]">Find clinics within your budget</p>
          <p className="lead-form-subheading">Tell us your budget and treatment type to see suitable clinics and estimated prices.</p>
          <label className="lead-form-label" htmlFor="lead-budget">
            Budget
          </label>
          <input
            id="lead-budget"
            name="budget"
            type="text"
            autoComplete="off"
            inputMode="numeric"
            pattern="^[£0-9,\\s]+$"
            className="lead-form-input"
            placeholder="e.g. £3,000"
            value={budget}
            onChange={(event) => {
              setBudget(event.target.value);
              if (errors.budget) {
                setErrors((currentErrors) => ({ ...currentErrors, budget: "" }));
              }
            }}
            aria-invalid={Boolean(errors.budget)}
            aria-describedby={errors.budget ? "lead-budget-error" : undefined}
          />
          {errors.budget ? (
            <p id="lead-budget-error" className="mt-1 text-xs text-red-700">
              {errors.budget}
            </p>
          ) : null}
          <label className="lead-form-label" htmlFor="lead-treatment">
            Treatment
          </label>
          <input
            id="lead-treatment"
            name="treatment"
            type="text"
            autoComplete="off"
            className="lead-form-input"
            placeholder="e.g. Implants"
            value={treatment}
            onChange={(event) => {
              setTreatment(event.target.value);
              if (errors.treatment) {
                setErrors((currentErrors) => ({ ...currentErrors, treatment: "" }));
              }
            }}
            aria-invalid={Boolean(errors.treatment)}
            aria-describedby={errors.treatment ? "lead-treatment-error" : undefined}
          />
          {errors.treatment ? (
            <p id="lead-treatment-error" className="mt-1 text-xs text-red-700">
              {errors.treatment}
            </p>
          ) : null}
          <div className="lead-form-cta-group">
            <button type="submit" className="btn btn-primary lead-form-cta">
              See Clinics & Prices
            </button>
            <p className="lead-form-microcopy">
              Compare clinics, treatment options and estimated prices based on your budget.
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
