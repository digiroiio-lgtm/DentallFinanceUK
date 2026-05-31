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
    <header className="sticky top-0 z-50 border-b border-[#4b3798] bg-[#22135a]/95 backdrop-blur">
      <div className="site-container flex items-center justify-between gap-3 py-3">
        <Link href="/" className="text-lg font-extrabold tracking-tight text-[#f3efff] md:text-xl" onClick={() => setOpen(false)}>
          Dental Finance UK
        </Link>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#6f5ab8] text-[#f3efff] md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Toggle navigation menu"
        >
          <span className="text-xl">☰</span>
        </button>

        <nav className="hidden items-center gap-1 md:flex">
          {primaryNav.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-xl px-3 py-2 text-sm font-medium transition ${
                  active ? "bg-[#6d4fe0] text-[#ffffff]" : "text-[#d9d0fb] hover:bg-[#302072]"
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
        <nav className="site-container space-y-2 border-t border-[#433184] pb-4 pt-3 md:hidden">
          {primaryNav.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`block rounded-xl px-3 py-2 text-sm font-medium ${
                  active ? "bg-[#6d4fe0] text-[#ffffff]" : "bg-[#2c1c6e] text-[#d9d0fb]"
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
