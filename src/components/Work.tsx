"use client";

import { useState } from "react";
import { palette as P } from "@/lib/constants";
import Reveal from "@/components/ui/Reveal";
import Glass from "@/components/ui/Glass";
import SectionHeader from "@/components/ui/SectionHeader";
import type { Project } from "@/lib/supabase/types";

const CATEGORIES = ["All", "Certificates", "Internships"] as const;

type Props = { projects: Project[] };

export default function Work({ projects }: Props) {
  const [active, setActive] = useState<string>("All");
  const filtered = active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <section id="work" className="py-20 sm:py-32 px-5 sm:px-8" style={{ background: P.deep }}>
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          label="Portfolio"
          title={<>Certificates & <span style={{ color: P.frozen }}>Internships</span></>}
        />

        {/* Filter pills */}
        <Reveal delay={0.1}>
          <div className="flex flex-wrap justify-center gap-2 mt-12 sm:mt-14 mb-12 sm:mb-16">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className="px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-[10px] sm:text-[11px] uppercase tracking-[0.15em] sm:tracking-[0.2em] font-medium transition-all duration-400"
                style={{
                  background: active === cat ? `linear-gradient(135deg, ${P.pacific}, ${P.fresh})` : "transparent",
                  color: active === cat ? P.deep : P.muted,
                  border: active === cat ? "none" : `1px solid ${P.border}`,
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {filtered.map((project, i) => (
            <Reveal key={project.id + active} delay={0.06 * i}>
              <Glass className="overflow-hidden group cursor-pointer" glow>
                <div
                  className="aspect-[16/10] relative"
                  style={{ background: `linear-gradient(145deg, ${project.accent}10, ${P.bg})` }}
                >
                  {project.image_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={project.image_url}
                      alt={project.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : null}
                  <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10">
                    <span
                      className="px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full text-[8px] sm:text-[9px] uppercase tracking-[0.15em] font-medium backdrop-blur-sm"
                      style={{ background: `${project.accent}25`, color: project.accent, border: `1px solid ${project.accent}40` }}
                    >
                      {project.category}
                    </span>
                  </div>
                </div>
                <div className="p-4 sm:p-6">
                  <h3 className="text-sm sm:text-base font-heading font-bold mb-1.5" style={{ color: P.pale }}>
                    {project.title}
                  </h3>
                  <p className="text-[11px] sm:text-xs" style={{ color: P.muted, lineHeight: 1.8, fontWeight: 300 }}>
                    {project.description}
                  </p>
                </div>
              </Glass>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
