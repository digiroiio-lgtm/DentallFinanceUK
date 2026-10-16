// Deposit-aware repayment maths shared by the payment-schedule, example-scenario
// and methodology pages. CalculatorWidget keeps its own loan-only formula; this
// module adds the deposit and APR handling those pages need.

export function calculateMonthlyPayment({ totalCost, depositAmount = 0, termMonths, apr = 0 }) {
  const safeCost = Math.max(Number(totalCost) || 0, 0);
  const safeDeposit = Math.max(Number(depositAmount) || 0, 0);
  const safeTerm = Math.max(Math.round(Number(termMonths)) || 1, 1);
  const safeApr = Math.max(Number(apr) || 0, 0);

  const loanAmount = Math.max(safeCost - safeDeposit, 0);
  const monthlyRate = safeApr / 100 / 12;

  const monthlyPayment =
    safeApr === 0
      ? loanAmount / safeTerm
      : (loanAmount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -safeTerm));

  const totalRepayable = monthlyPayment * safeTerm + safeDeposit;
  const totalInterest = Math.max(totalRepayable - safeCost, 0);

  return { loanAmount, monthlyPayment, totalRepayable, totalInterest };
}

export function formatGbp(value, fractionDigits = 2) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(value);
}

export const calculationAssumptions = {
  lastReviewed: "2026-09-03",
  methodology:
    "Monthly payment figures use a standard reducing-balance loan calculation: (loan amount x monthly rate) / (1 - (1 + monthly rate) ^ -term), where the loan amount is the total cost minus the deposit and the monthly rate is the illustrative APR divided by 12.",
  aprAssumption:
    "Unless you change it, the calculators default to an illustrative 9.9% APR to represent a mid-range third-party dental finance rate. Real rates range roughly 0%-14.9% depending on the lender, term and your credit profile.",
  turkeyAssumption:
    "Turkey example treatment costs and travel estimates are illustrative planning figures set by the editorial team, not quotes from any specific clinic, lender or travel provider, and do not include aftercare, complications or a possible return visit unless you add them yourself.",
  source:
    "All figures are illustrative examples for planning purposes only, not sourced from a live pricing feed, a specific lender or a specific clinic.",
};
