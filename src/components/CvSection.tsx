"use client";

import { palette as P } from "@/lib/constants";
import Reveal from "@/components/ui/Reveal";
import Glass from "@/components/ui/Glass";
import SectionHeader from "@/components/ui/SectionHeader";
import type { CvRow } from "@/lib/supabase/types";

type Props = { cv: CvRow | null };

export default function CvSection({ cv }: Props) {
  if (!cv) return null;

  return (
    <section
      id="cv"
      className="py-20 sm:py-32 px-5 sm:px-8 relative overflow-hidden"
      style={{ background: P.bg }}
    >
      <div
        className="absolute top-0 left-0 w-full h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${P.border}, transparent)` }}
      />
      <div className="max-w-3xl mx-auto">
        <SectionHeader
          label="Credentials"
          title={<>Curriculum <span style={{ color: P.frozen }}>Vitae</span></>}
          subtitle="Download my full CV for a complete overview of my experience and education."
        />

        <Reveal delay={0.1}>
          <Glass className="p-6 sm:p-8" glow>
            <div className="flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-6">
              {/* PDF icon block */}
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
                style={{
                  background: `linear-gradient(135deg, ${P.pacific}18, #001f36)`,
                  border: `1px solid ${P.pacific}25`,
                }}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={P.pacific}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10 9 9 9 8 9" />
                </svg>
              </div>

              {/* Meta */}
              <div className="flex-1 min-w-0">
                <p
                  className="text-[10px] uppercase tracking-[0.2em] mb-1"
                  style={{ color: P.pacific, fontWeight: 500 }}
                >
                  Mohamed Hazem
                </p>
                <h3
                  className="font-heading text-base sm:text-lg font-bold mb-1"
                  style={{ color: P.pale }}
                >
                  {cv.filename.replace(/\.pdf$/i, "")}
                </h3>
                <p className="text-xs" style={{ color: P.muted }}>
                  Updated{" "}
                  {new Date(cv.uploaded_at).toLocaleDateString("en-GB", {
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                <a
                  href={cv.file_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full text-[11px] uppercase tracking-[0.2em] font-semibold transition-all duration-300 hover:scale-105"
                  style={{
                    background: "transparent",
                    color: P.pacific,
                    border: `1px solid ${P.pacific}50`,
                  }}
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                  Preview
                </a>
                <a
                  href={cv.file_url}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-[11px] uppercase tracking-[0.2em] font-semibold transition-all duration-500 hover:scale-105"
                  style={{
                    background: `linear-gradient(135deg, ${P.pacific}, ${P.fresh})`,
                    color: P.deep,
                    boxShadow: `0 8px 30px ${P.pacific}20`,
                  }}
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  Download CV
                </a>
              </div>
            </div>
          </Glass>
        </Reveal>
      </div>
    </section>
  );
}
