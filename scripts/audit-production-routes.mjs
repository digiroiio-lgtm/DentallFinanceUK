import { SITE_URL } from "../src/lib/siteData.js";

const routePaths = [
  "/finance-calculator",
  "/dental-payment-plans",
  "/dental-implants-finance",
  "/veneers-finance",
  "/turkey-teeth-finance",
];

const baseUrl = new URL(process.env.ROUTE_AUDIT_BASE_URL ?? SITE_URL);

const failures = [];

for (const path of routePaths) {
  const url = new URL(path, baseUrl);
  try {
    const response = await fetch(url, {
      headers: {
        "user-agent": "production-route-audit/1.0",
      },
      redirect: "follow",
    });

    console.log(`${response.status} ${url.href}`);

    if (response.status !== 200) {
      failures.push(`${response.status} ${url.href}`);
    }
  } catch (error) {
    const message = `${url.href} (${error.cause?.code ?? error.message})`;

    console.log(`ERROR ${message}`);
    failures.push(`ERROR ${message}`);
  }
}

if (failures.length > 0) {
  console.error("\nProduction route audit failed:");

  for (const failure of failures) {
    console.error(`- ${failure}`);
  }

  process.exit(1);
}
