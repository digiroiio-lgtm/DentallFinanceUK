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
    <header className="sticky top-0 z-50 border-b border-[#d9e2f3] bg-white/95 backdrop-blur">
      <div className="site-container flex items-center justify-between gap-3 py-3">
        <Link href="/" className="text-lg font-extrabold tracking-tight text-[#0f2858] md:text-xl" onClick={() => setOpen(false)}>
          Dental Finance UK
        </Link>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#d9e2f3] text-[#0f2858] md:hidden"
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
                  active ? "bg-[#eaf1ff] text-[#0f2858]" : "text-[#425273] hover:bg-[#f4f7fd]"
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
        <nav className="site-container space-y-2 border-t border-[#e7ecf7] pb-4 pt-3 md:hidden">
          {primaryNav.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`block rounded-xl px-3 py-2 text-sm font-medium ${
                  active ? "bg-[#eaf1ff] text-[#0f2858]" : "bg-[#f9fbff] text-[#425273]"
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
