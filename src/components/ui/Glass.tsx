"use client";

import { useState } from "react";
import { palette as P } from "@/lib/constants";

interface GlassProps {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
}

export default function Glass({ children, className = "", glow = false }: GlassProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`relative rounded-2xl overflow-hidden transition-all duration-500 ${className}`}
      style={{
        background: hovered ? "rgba(27,73,101,0.14)" : "rgba(27,73,101,0.07)",
        border: `1px solid ${hovered ? P.borderHover : P.border}`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {glow && hovered && (
        <div
          className="absolute -top-20 -right-20 w-40 h-40 rounded-full pointer-events-none"
          style={{
            background: `radial-gradient(circle, ${P.pacific}15, transparent 70%)`,
            filter: "blur(30px)",
          }}
        />
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
