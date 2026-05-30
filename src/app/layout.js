import "./globals.css";
import Link from "next/link";
import { SITE_URL, primaryNav } from "@/lib/siteData";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Dental Finance UK | Compare Monthly Payment Plans",
    template: "%s | Dental Finance UK",
  },
  description:
    "Compare dental payment plans, monthly finance options and treatment costs across the UK.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: "Dental Finance UK",
    description:
      "Compare dental payment plans, monthly finance options and treatment costs across the UK.",
    siteName: "Dental Finance UK",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dental Finance UK",
    description:
      "Compare dental payment plans, monthly finance options and treatment costs across the UK.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-GB">
      <body className="bg-white text-gray-900">
        <header className="border-b border-gray-200 p-4">
          <div className="mx-auto flex w-full max-w-5xl flex-wrap items-center justify-between gap-2">
            <Link href="/" className="text-xl font-bold">
              Dental Finance UK
            </Link>
            <nav className="flex flex-wrap gap-3 text-sm">
              {primaryNav.map((item) => (
                <Link key={item.href} href={item.href} className="underline">
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
