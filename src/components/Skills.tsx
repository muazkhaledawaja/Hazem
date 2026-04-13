"use client";

import { palette as P } from "@/lib/constants";
import Reveal from "@/components/ui/Reveal";
import Glass from "@/components/ui/Glass";
import SectionHeader from "@/components/ui/SectionHeader";
import type { SkillGroup, SkillTone } from "@/lib/supabase/types";

const TONE_COLOR: Record<SkillTone, string> = {
  pacific: P.pacific,
  fresh: P.fresh,
  frozen: P.frozen,
};

function ToneIcon({ tone }: { tone: SkillTone }) {
  const stroke = TONE_COLOR[tone];
  if (tone === "pacific") {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    );
  }
  if (tone === "fresh") {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    );
  }
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 21h8" />
      <path d="M12 17v4" />
    </svg>
  );
}

type Props = { groups: SkillGroup[] };

export default function Skills({ groups }: Props) {
  return (
    <section id="skills" className="py-20 sm:py-32 px-5 sm:px-8 relative" style={{ background: P.bg }}>
      <div className="absolute top-0 left-0 w-full h-px" style={{ background: `linear-gradient(90deg, transparent, ${P.border}, transparent)` }} />
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          label="Expertise"
          title={<>Skills & <span style={{ color: P.frozen }}>Tools</span></>}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8 mt-14 sm:mt-20">
          {groups.map((set, i) => {
            const color = TONE_COLOR[set.tone] ?? P.pacific;
            return (
              <Reveal key={set.id} delay={0.1 + i * 0.1}>
                <Glass className="p-6 sm:p-8 h-full" glow>
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6"
                    style={{ background: `${color}10`, border: `1px solid ${color}20` }}
                  >
                    <ToneIcon tone={set.tone} />
                  </div>
                  <h3 className="text-lg sm:text-xl font-heading font-bold mb-5" style={{ color: P.pale }}>
                    {set.title}
                  </h3>
                  <div>
                    {set.items.map((item) => (
                      <div key={item} className="flex items-center gap-3 py-3" style={{ borderBottom: `1px solid ${P.border}` }}>
                        <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: color }} />
                        <span className="text-[13px]" style={{ color: P.text, fontWeight: 400 }}>{item}</span>
                      </div>
                    ))}
                  </div>
                </Glass>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
