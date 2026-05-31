"use client";

import { useSearchParams } from "next/navigation";

const CONTROL_COPY =
  "Calculate monthly dental payments in seconds. Compare monthly repayments for veneers, implants, All-on-4, All-on-6 and Turkey Teeth treatments.";
const NUMBER_LED_COPY =
  "Compare repayments from £125/month for veneers, implants and Turkey Teeth treatments.";
const VARIANT_QUERY_PARAM = "heroVariant";

function isValidVariant(value) {
  return value === "control" || value === "number";
}

export default function HeroDescriptionExperiment() {
  const searchParams = useSearchParams();
  const paramVariant = searchParams.get(VARIANT_QUERY_PARAM);
  const variant = isValidVariant(paramVariant) ? paramVariant : "control";
  const copy = variant === "number" ? NUMBER_LED_COPY : CONTROL_COPY;

  return <span data-hero-variant={variant}>{copy}</span>;
}
