"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { primaryNav } from "@/lib/siteData";

function isActive(pathname, href) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[#e4dcf7] bg-white/95 shadow-sm backdrop-blur">
      <div className="site-container flex items-center justify-between py-2">
        <Link
          href="/"
          className="flex flex-col whitespace-nowrap leading-none"
          onClick={() => setOpen(false)}
        >
          <span className="text-base font-extrabold tracking-tight text-[#2f1f75]">
            Dental Finance UK
          </span>
          <span className="mt-0.5 text-[0.65rem] font-semibold tracking-widest text-[#7350e6] uppercase">
            Calculate. Compare. Decide.
          </span>
        </Link>

        <button
          type="button"
          className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-[#2f1f75] md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Toggle navigation menu"
        >
          <span className="text-lg leading-none">☰</span>
        </button>

        <nav className="hidden items-center gap-1 md:flex">
          {primaryNav.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-xl px-3 py-2 text-sm font-medium transition ${
                  active ? "bg-[#ede6ff] text-[#2f1f75]" : "text-[#2f1f75] hover:bg-[#f4f0ff]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <Link href="/finance-calculator" className="btn btn-primary ml-2 text-sm">
            Check Monthly Payments
          </Link>
        </nav>
      </div>

      {open ? (
        <nav className="site-container space-y-2 border-t border-[#e4dcf7] pb-4 pt-3 md:hidden">
          {primaryNav.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`block rounded-xl px-3 py-2 text-sm font-medium ${
                  active ? "bg-[#ede6ff] text-[#2f1f75]" : "text-[#2f1f75] hover:bg-[#f4f0ff]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <Link href="/finance-calculator" onClick={() => setOpen(false)} className="btn btn-primary w-full text-center text-sm">
            Check Monthly Payments
          </Link>
        </nav>
      ) : null}
    </header>
  );
}
