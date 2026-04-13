import Image from "next/image";
import { palette as P } from "@/lib/constants";

export default function Footer() {
  return (
    <footer
      className="py-8 sm:py-10 px-5 sm:px-8"
      style={{ background: P.bg, borderTop: `1px solid ${P.border}` }}
    >
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <Image
          src="/logo/MH-logo-icon.png"
          alt="Mohamed Hazem"
          width={36}
          height={36}
          className="h-8 w-auto"
        />
        <p className="text-[10px] sm:text-[11px] tracking-widest" style={{ color: P.muted }}>
          &copy; {new Date().getFullYear()} Mohamed Hazem
        </p>
      </div>
    </footer>
  );
}
