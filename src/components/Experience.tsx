"use client";

import { palette as P } from "@/lib/constants";
import Reveal from "@/components/ui/Reveal";
import Glass from "@/components/ui/Glass";
import SectionHeader from "@/components/ui/SectionHeader";
import type { ExperienceRow } from "@/lib/supabase/types";

type Props = { items: ExperienceRow[] };

export default function Experience({ items }: Props) {
  return (
    <section id="experience" className="py-20 sm:py-32 px-5 sm:px-8" style={{ background: P.deep }}>
      <div className="max-w-5xl mx-auto">
        <SectionHeader
          label="Journey"
          title={<>Experience & <span style={{ color: P.frozen }}>Growth</span></>}
        />

        <div className="space-y-5 sm:space-y-6 mt-14 sm:mt-20">
          {items.map((exp, i) => (
            <Reveal key={exp.id} delay={0.08 * i}>
              <Glass className="p-0 group" glow>
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-0">
                  {/* Left — date & company */}
                  <div
                    className="sm:col-span-4 lg:col-span-3 p-5 sm:p-6 lg:p-8 flex flex-col justify-center border-b sm:border-b-0 sm:border-r"
                    style={{ borderColor: P.border }}
                  >
                    <p
                      className="text-[10px] uppercase tracking-[0.2em] mb-1"
                      style={{ color: P.pacific, fontWeight: 500 }}
                    >
                      {exp.period}
                    </p>
                    <p className="text-xs" style={{ color: P.muted }}>
                      {exp.company}
                    </p>
                  </div>

                  {/* Right — role & description */}
                  <div className="sm:col-span-8 lg:col-span-9 p-5 sm:p-6 lg:p-8">
                    <h3 className="text-base sm:text-lg font-heading font-bold mb-2" style={{ color: P.pale }}>
                      {exp.role}
                    </h3>
                    <p className="text-sm" style={{ color: P.soft, lineHeight: 1.9, fontWeight: 300 }}>
                      {exp.description}
                    </p>
                  </div>
                </div>
              </Glass>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
