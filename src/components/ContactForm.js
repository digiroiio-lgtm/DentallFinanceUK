"use client";

import Link from "next/link";
import { useForm, ValidationError } from "@formspree/react";
import { ANALYTICS_EVENTS, trackEvent } from "@/lib/analytics";

const FORMSPREE_FORM_ID = "meaevwyv";

const HELP_OPTIONS = [
  "General enquiry",
  "Dental finance / payment plans",
  "A specific treatment",
  "Treatment abroad (Turkey)",
  "Partnership enquiry",
];
const TREATMENT_OPTIONS = [
  "Dental Implants",
  "Full Mouth Dental Implants",
  "All-on-4",
  "All-on-6",
  "Veneers",
  "Crowns",
  "Invisalign",
  "Smile Makeover",
  "Not sure yet",
];
const BUDGET_OPTIONS = ["Under £2,000", "£2,000-£5,000", "£5,000-£10,000", "£10,000-£20,000", "£20,000+", "Not sure yet"];
const MONTHLY_BUDGET_OPTIONS = ["Under £100", "£100-£250", "£250-£500", "£500+", "Not sure yet"];
const LOCATION_OPTIONS = ["UK", "Turkey", "Not sure yet"];

function SelectField({ id, label, options, required = false, state }) {
  return (
    <div className="contact-field">
      <label htmlFor={id}>{label}</label>
      <select id={id} name={id} required={required} defaultValue={required ? "" : options[options.length - 1]}>
        {required ? (
          <option value="" disabled>
            Select an option
          </option>
        ) : null}
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <ValidationError field={id} prefix={label} errors={state.errors} className="contact-error" />
    </div>
  );
}

export default function ContactForm() {
  const [state, handleSubmit] = useForm(FORMSPREE_FORM_ID);

  if (state.succeeded) {
    return (
      <section className="surface-card mt-8 p-6" role="status">
        <h2 className="section-title text-2xl">Thanks, we have your enquiry</h2>
        <p className="mt-2 text-[#374e75]">
          We will review your answers and point you towards the right next step. If you asked for WhatsApp, we will
          message you there. Finance is subject to status, eligibility, affordability and lender approval.
        </p>
      </section>
    );
  }

  return (
    <section className="surface-card mt-8 p-6">
      <h2 className="section-title text-2xl">Check your options</h2>
      <p className="mt-2 text-sm text-[#556689]">
        Tell us a little about your treatment and budget and we will point you towards the right next step. We do not
        sell your details on.
      </p>
      <form
        className="contact-form mt-4"
        onSubmit={(event) => {
          // Only the enquiry type is tracked; no personal data is sent to analytics.
          if (event.currentTarget.help_with?.value === "Partnership enquiry") {
            trackEvent(ANALYTICS_EVENTS.partnerEnquirySubmit, { placement: "contact_form" });
          }
          return handleSubmit(event);
        }}
      >
        <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="visually-hidden" aria-hidden="true" />

        <SelectField id="help_with" label="What can we help with?" options={HELP_OPTIONS} required state={state} />
        <SelectField id="treatment" label="Treatment" options={TREATMENT_OPTIONS} required state={state} />

        <div className="contact-form-grid">
          <SelectField id="treatment_budget" label="Approximate treatment budget" options={BUDGET_OPTIONS} state={state} />
          <SelectField id="monthly_budget" label="Preferred monthly budget" options={MONTHLY_BUDGET_OPTIONS} state={state} />
        </div>

        <fieldset>
          <legend>UK or Turkey?</legend>
          {LOCATION_OPTIONS.map((option, index) => (
            <label key={option} className="contact-choice">
              <input type="radio" name="location_preference" value={option} required={index === 0} />
              {option}
            </label>
          ))}
        </fieldset>

        <div className="contact-form-grid">
          <div className="contact-field">
            <label htmlFor="name">Name</label>
            <input id="name" type="text" name="name" autoComplete="name" required />
            <ValidationError field="name" prefix="Name" errors={state.errors} className="contact-error" />
          </div>
          <div className="contact-field">
            <label htmlFor="email">Email</label>
            <input id="email" type="email" name="email" autoComplete="email" required />
            <ValidationError field="email" prefix="Email" errors={state.errors} className="contact-error" />
          </div>
        </div>

        <div className="contact-field">
          <label htmlFor="phone">Phone (optional)</label>
          <input id="phone" type="tel" name="phone" autoComplete="tel" />
          <ValidationError field="phone" prefix="Phone" errors={state.errors} className="contact-error" />
        </div>

        <div className="contact-field">
          <label htmlFor="message">Message</label>
          <textarea id="message" name="message" rows={4} aria-describedby="message-hint" />
          <p id="message-hint" className="text-xs text-[#556689]">
            Please do not include credit reports, bank details, ID documents or medical records.
          </p>
          <ValidationError field="message" prefix="Message" errors={state.errors} className="contact-error" />
        </div>

        <label className="contact-choice">
          <input type="checkbox" name="prefer_whatsapp" value="yes" />
          I&apos;d prefer to be contacted via WhatsApp
        </label>

        <label className="contact-choice">
          <input type="checkbox" name="compliance_ack" value="yes" required />
          <span>
            I understand that finance is subject to status, eligibility, affordability and lender approval, and that
            submitting this form does not guarantee acceptance for finance or treatment. See our{" "}
            <Link href="/financial-disclosure" className="font-medium text-[#6d4fe0] underline">
              Financial Disclosure
            </Link>
            .
          </span>
        </label>

        <ValidationError errors={state.errors} className="contact-error" />

        <p className="text-xs text-[#556689]">
          Your message is sent to Multiligo, which operates this website, through our form provider Formspree, and is used
          only to reply to you. We do not pass enquiries to lenders or credit brokers. See our{" "}
          <Link href="/privacy-policy" className="font-medium text-[#6d4fe0] underline">
            Privacy Policy
          </Link>
          .
        </p>

        <button type="submit" className="btn btn-primary" disabled={state.submitting}>
          {state.submitting ? "Sending…" : "Send enquiry"}
        </button>
      </form>
    </section>
  );
}
