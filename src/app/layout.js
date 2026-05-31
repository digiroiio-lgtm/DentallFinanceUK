import "./globals.css";
import { SITE_URL } from "@/lib/siteData";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import WhatsAppStickyButton from "@/components/WhatsAppStickyButton";

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
      <body>
        <SiteHeader />
        {children}
        <WhatsAppStickyButton />
        <SiteFooter />
      </body>
    </html>
  );
}
