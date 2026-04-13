import Link from "next/link";
import { palette as P } from "@/lib/constants";

const NAV = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/projects", label: "Credentials" },
  { href: "/admin/experience", label: "Experience" },
  { href: "/admin/videos", label: "Videos" },
  { href: "/admin/skills", label: "Skills" },
  { href: "/admin/about", label: "About" },
  { href: "/admin/contact", label: "Contact" },
  { href: "/admin/cv", label: "CV" },
] as const;

export default function AdminShell({
  email,
  children,
}: {
  email: string | undefined;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen" style={{ background: P.bg, color: P.pale }}>
      <div className="flex flex-col md:flex-row min-h-screen">
        {/* Sidebar */}
        <aside
          className="md:w-60 md:shrink-0 md:sticky md:top-0 md:h-screen flex flex-col"
          style={{
            background: P.deep,
            borderRight: `1px solid ${P.border}`,
          }}
        >
          <div className="p-6 md:p-7">
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="h-px w-6" style={{ background: P.pacific }} />
              <p
                className="text-[11px] uppercase tracking-[0.3em]"
                style={{ color: P.pacific, fontWeight: 500 }}
              >
                MH / Admin
              </p>
            </Link>
          </div>
          <nav className="flex md:flex-col gap-1 px-3 md:px-4 overflow-x-auto md:overflow-visible pb-4 md:pb-0">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-4 py-2.5 rounded-xl text-[12px] whitespace-nowrap transition-colors"
                style={{
                  color: P.text,
                  border: `1px solid transparent`,
                }}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-auto hidden md:block p-5">
            <div
              className="rounded-2xl p-4"
              style={{
                background: "rgba(27,73,101,0.12)",
                border: `1px solid ${P.border}`,
              }}
            >
              <p
                className="text-[9px] uppercase tracking-widest mb-1"
                style={{ color: P.muted }}
              >
                Signed in
              </p>
              <p className="text-xs truncate mb-3" style={{ color: P.pale }}>
                {email ?? "—"}
              </p>
              <form action="/logout" method="post">
                <button
                  type="submit"
                  className="w-full py-2 rounded-full text-[10px] uppercase tracking-[0.2em] font-semibold"
                  style={{
                    background: "transparent",
                    color: P.text,
                    border: `1px solid ${P.border}`,
                  }}
                >
                  Sign out
                </button>
              </form>
            </div>
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 min-w-0">
          <div className="p-6 sm:p-10 max-w-5xl mx-auto">{children}</div>
          <div className="md:hidden px-6 pb-10">
            <form action="/logout" method="post">
              <button
                type="submit"
                className="w-full py-3 rounded-full text-[10px] uppercase tracking-[0.2em] font-semibold"
                style={{
                  background: "transparent",
                  color: P.text,
                  border: `1px solid ${P.border}`,
                }}
              >
                Sign out ({email ?? "—"})
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
