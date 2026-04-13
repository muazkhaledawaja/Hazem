import Reveal from "./Reveal";
import { palette as P } from "@/lib/constants";

interface SectionHeaderProps {
  label: string;
  title: React.ReactNode;
  subtitle?: string;
}

export default function SectionHeader({ label, title, subtitle }: SectionHeaderProps) {
  return (
    <>
      <Reveal>
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="h-px w-8 sm:w-10" style={{ background: P.pacific }} />
          <p
            className="text-[11px] uppercase tracking-[0.3em]"
            style={{ color: P.pacific, fontWeight: 500 }}
          >
            {label}
          </p>
          <div className="h-px w-8 sm:w-10" style={{ background: P.pacific }} />
        </div>
      </Reveal>
      <Reveal delay={0.05}>
        <h2
          className="text-center mb-4"
          style={{
            color: P.pale,
            fontSize: "clamp(1.75rem, 4vw, 3rem)",
            fontWeight: 700,
          }}
        >
          {title}
        </h2>
      </Reveal>
      {subtitle && (
        <Reveal delay={0.1}>
          <p
            className="text-center text-sm mb-14 sm:mb-20 max-w-lg mx-auto"
            style={{ color: P.muted, fontWeight: 300 }}
          >
            {subtitle}
          </p>
        </Reveal>
      )}
    </>
  );
}
