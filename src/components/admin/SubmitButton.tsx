"use client";

import { useFormStatus } from "react-dom";
import { palette as P } from "@/lib/constants";

type Props = {
  children: React.ReactNode;
  pendingLabel?: string;
  variant?: "primary" | "ghost" | "danger";
};

export default function SubmitButton({
  children,
  pendingLabel = "Saving…",
  variant = "primary",
}: Props) {
  const { pending } = useFormStatus();

  const styles =
    variant === "primary"
      ? {
          background: `linear-gradient(135deg, ${P.pacific}, ${P.fresh})`,
          color: P.deep,
          boxShadow: `0 8px 30px ${P.pacific}20`,
        }
      : variant === "danger"
      ? {
          background: "rgba(255,80,80,0.12)",
          color: "#ffb4b4",
          border: "1px solid rgba(255,80,80,0.25)",
        }
      : {
          background: "transparent",
          color: P.text,
          border: `1px solid ${P.border}`,
        };

  return (
    <button
      type="submit"
      disabled={pending}
      className="px-5 py-3 rounded-full text-[11px] uppercase tracking-[0.2em] font-semibold transition-all duration-300 disabled:opacity-60"
      style={styles}
    >
      {pending ? pendingLabel : children}
    </button>
  );
}
