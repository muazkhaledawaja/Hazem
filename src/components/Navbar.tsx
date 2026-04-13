"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { palette as P, NAV_LINKS } from "@/lib/constants";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav
      className="fixed top-0 w-full z-50 transition-all duration-700"
      style={{
        background: scrolled ? "rgba(8,14,24,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(24px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(24px)" : "none",
        borderBottom: `1px solid ${scrolled ? P.border : "transparent"}`,
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4 sm:py-5 flex items-center justify-between">
        <a href="#hero" className="relative group flex items-center">
          <Image
            src="/logo/MH-logo-icon.png"
            alt="Mohamed Hazem"
            width={40}
            height={40}
            priority
            className="h-8 w-auto sm:h-10"
          />
          <span
            className="absolute -bottom-1 left-0 h-px w-0 group-hover:w-full transition-all duration-500"
            style={{ background: P.pacific }}
          />
        </a>

        {/* Desktop */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-10">
          {NAV_LINKS.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="relative group text-[11px] uppercase tracking-[0.2em] transition-colors duration-300"
              style={{ color: P.muted, fontWeight: 500 }}
            >
              {link}
              <span
                className="absolute -bottom-1 left-0 h-px w-0 group-hover:w-full transition-all duration-400"
                style={{ background: P.pacific }}
              />
            </a>
          ))}
          <a
            href="#contact"
            className="ml-2 px-5 py-2.5 rounded-full text-[11px] uppercase tracking-[0.15em] font-semibold transition-all duration-300 hover:scale-105"
            style={{
              background: `linear-gradient(135deg, ${P.pacific}, ${P.fresh})`,
              color: P.deep,
            }}
          >
            Let&apos;s Collaborate
          </a>
        </div>

        {/* Mobile toggle */}
        <button className="lg:hidden p-2" style={{ color: P.soft }} onClick={() => setOpen(!open)}>
          <svg width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d={open ? "M7 7l12 12M7 19L19 7" : "M5 8h16M5 13h16M5 18h16"} />
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          className="lg:hidden px-6 pb-6 flex flex-col gap-4"
          style={{ background: "rgba(8,14,24,0.97)", backdropFilter: "blur(20px)" }}
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              onClick={() => setOpen(false)}
              className="text-sm uppercase tracking-widest py-2 border-b"
              style={{ color: P.soft, borderColor: P.border }}
            >
              {link}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="mt-2 px-5 py-3 rounded-full text-center text-sm font-semibold"
            style={{ background: `linear-gradient(135deg, ${P.pacific}, ${P.fresh})`, color: P.deep }}
          >
            Let&apos;s Collaborate
          </a>
        </div>
      )}
    </nav>
  );
}
