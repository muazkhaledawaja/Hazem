"use client";

import Image from "next/image";
import { palette as P } from "@/lib/constants";
import Reveal from "@/components/ui/Reveal";

export default function About() {
  return (
    <section id="about" className="relative py-20 sm:py-32 px-5 sm:px-8" style={{ background: P.deep }}>
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 items-center">
          {/* Photo placeholder */}
          <Reveal className="md:col-span-5">
            <div className="relative max-w-sm mx-auto md:max-w-none">
              <div
                className="aspect-[4/5] rounded-3xl overflow-hidden relative"
                style={{ background: `linear-gradient(160deg, ${P.yale}60, ${P.bg})` }}
              >
                <Image
                  src="/hazem.jpg"
                  alt="Mohamed Hazem"
                  fill
                  sizes="(min-width: 768px) 40vw, 90vw"
                  className="object-cover"
                />
                <div
                  className="absolute top-5 left-5 w-10 h-10 z-10"
                  style={{ borderLeft: `1px solid ${P.pacific}40`, borderTop: `1px solid ${P.pacific}40` }}
                />
                <div
                  className="absolute bottom-5 right-5 w-10 h-10 z-10"
                  style={{ borderRight: `1px solid ${P.pacific}40`, borderBottom: `1px solid ${P.pacific}40` }}
                />
              </div>
              {/* Badge */}
              <div
                className="absolute -bottom-3 -right-3 sm:-bottom-4 sm:-right-4 md:-right-8 px-4 py-2.5 sm:px-5 sm:py-3 rounded-2xl"
                style={{
                  background: "rgba(27,73,101,0.2)",
                  border: `1px solid ${P.border}`,
                  backdropFilter: "blur(12px)",
                }}
              >
                <p className="text-[9px] sm:text-[10px] uppercase tracking-widest" style={{ color: P.pacific }}>
                  BUE / LSBU
                </p>
                <p className="text-[11px] sm:text-xs font-semibold mt-0.5" style={{ color: P.pale }}>
                  Dual Degree
                </p>
              </div>
            </div>
          </Reveal>

          {/* Text */}
          <div className="md:col-span-7 md:pl-4 lg:pl-8">
            <Reveal delay={0.1}>
              <div className="flex items-center gap-3 mb-5">
                <div className="h-px w-8" style={{ background: P.pacific }} />
                <p className="text-[11px] uppercase tracking-[0.3em]" style={{ color: P.pacific, fontWeight: 500 }}>
                  About
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <h2
                className="font-heading"
                style={{
                  color: P.pale,
                  fontSize: "clamp(1.75rem, 4vw, 3rem)",
                  fontWeight: 700,
                  lineHeight: 1.15,
                  marginBottom: "1.5rem",
                }}
              >
                Crafting Stories That
                <br />
                <span style={{ color: P.frozen }}>Move Brands</span> Forward
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-sm mb-4" style={{ color: P.text, lineHeight: 2, fontWeight: 300 }}>
                Driven and imaginative Mass Communication student specializing in advertising, filmmaking,
                and brand development. Experienced in producing promotional content for real clients and
                passionate about inspiring brands with fresh, strategic marketing ideas.
              </p>
            </Reveal>
            <Reveal delay={0.25}>
              <p className="text-sm mb-8" style={{ color: P.muted, lineHeight: 2, fontWeight: 300 }}>
                Adept at storytelling, video editing, and visual communication. Eager to grow in
                advertisement directing, marketing, and brand consulting.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="flex gap-8 sm:gap-12">
                {[
                  ["3+", "Projects"],
                  ["2", "Clients"],
                  ["2", "Internships"],
                ].map(([num, label]) => (
                  <div key={label}>
                    <p
                      className="text-2xl sm:text-3xl font-heading font-bold"
                      style={{
                        background: `linear-gradient(135deg, ${P.pacific}, ${P.frozen})`,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      {num}
                    </p>
                    <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.15em] mt-1" style={{ color: P.muted }}>
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
