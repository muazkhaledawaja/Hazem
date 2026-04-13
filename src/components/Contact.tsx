"use client";

import { palette as P } from "@/lib/constants";
import Reveal from "@/components/ui/Reveal";
import Glass from "@/components/ui/Glass";
import SectionHeader from "@/components/ui/SectionHeader";

export default function Contact() {
  return (
    <section id="contact" className="py-20 sm:py-32 px-5 sm:px-8 relative overflow-hidden" style={{ background: P.bg }}>
      <div className="absolute top-0 left-0 w-full h-px" style={{ background: `linear-gradient(90deg, transparent, ${P.border}, transparent)` }} />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] rounded-full"
        style={{ background: `radial-gradient(circle, ${P.pacific}08, transparent 60%)` }}
      />

      <div className="max-w-3xl mx-auto text-center relative z-10">
        <SectionHeader
          label="Get in Touch"
          title={<>Let&apos;s Create Something<br /><span style={{ color: P.frozen }}>Extraordinary</span></>}
        />

        <Reveal delay={0.1}>
          <p className="text-sm mb-10 sm:mb-14 mt-4" style={{ color: P.muted, fontWeight: 300 }}>
            Open for collaborations in advertising, filmmaking, and brand consulting.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10 sm:mb-12">
            <a href="mailto:mohamedhazem69@gmail.com" className="block">
              <Glass className="px-5 sm:px-6 py-4 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${P.pacific}12` }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={P.pacific} strokeWidth="1.5">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <div className="text-left min-w-0">
                  <p className="text-[10px] uppercase tracking-widest mb-0.5" style={{ color: P.muted }}>Email</p>
                  <p className="text-xs font-medium truncate" style={{ color: P.text }}>mohamedhazem69@gmail.com</p>
                </div>
              </Glass>
            </a>
            <Glass className="px-5 sm:px-6 py-4 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${P.pacific}12` }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={P.pacific} strokeWidth="1.5">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                </svg>
              </div>
              <div className="text-left">
                <p className="text-[10px] uppercase tracking-widest mb-0.5" style={{ color: P.muted }}>Phone</p>
                <p className="text-xs font-medium" style={{ color: P.text }}>+20 110 008 9064</p>
              </div>
            </Glass>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <a
            href="https://www.linkedin.com/in/mohamed-hazem-914a60360/"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 px-8 sm:px-10 py-4 rounded-full text-[11px] uppercase tracking-[0.2em] font-semibold transition-all duration-500 hover:scale-105"
            style={{
              background: `linear-gradient(135deg, ${P.pacific}, ${P.fresh})`,
              color: P.deep,
              boxShadow: `0 8px 40px ${P.pacific}20`,
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill={P.deep}>
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            Connect on LinkedIn
            <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform group-hover:translate-x-0.5">
              <path d="M5 1l6 6-6 6" />
            </svg>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
