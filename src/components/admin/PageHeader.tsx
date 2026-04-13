import Link from "next/link";
import { palette as P } from "@/lib/constants";

type Props = {
  label: string;
  title: string;
  subtitle?: string;
  action?: { href: string; label: string };
};

export default function PageHeader({ label, title, subtitle, action }: Props) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
      <div>
        <div className="flex items-center gap-3 mb-3">
          <div className="h-px w-8" style={{ background: P.pacific }} />
          <p
            className="text-[11px] uppercase tracking-[0.3em]"
            style={{ color: P.pacific, fontWeight: 500 }}
          >
            {label}
          </p>
        </div>
        <h1
          className="font-heading"
          style={{
            color: P.pale,
            fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
            fontWeight: 700,
            lineHeight: 1.15,
          }}
        >
          {title}
        </h1>
        {subtitle && (
          <p className="text-sm mt-2" style={{ color: P.muted, fontWeight: 300 }}>
            {subtitle}
          </p>
        )}
      </div>
      {action && (
        <Link
          href={action.href}
          className="inline-flex items-center justify-center px-5 py-3 rounded-full text-[11px] uppercase tracking-[0.2em] font-semibold whitespace-nowrap"
          style={{
            background: `linear-gradient(135deg, ${P.pacific}, ${P.fresh})`,
            color: P.deep,
            boxShadow: `0 8px 30px ${P.pacific}20`,
          }}
        >
          {action.label}
        </Link>
      )}
    </div>
  );
}
