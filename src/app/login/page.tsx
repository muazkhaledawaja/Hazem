import { redirect } from "next/navigation";
import { palette as P } from "@/lib/constants";
import Glass from "@/components/ui/Glass";
import { getUser } from "@/lib/auth";
import LoginForm from "./LoginForm";

export default async function LoginPage() {
  const user = await getUser();
  if (user) redirect("/admin");

  return (
    <main
      className="min-h-screen flex items-center justify-center px-5 py-20"
      style={{ background: P.bg }}
    >
      <div className="w-full max-w-md">
        <div className="flex items-center gap-3 mb-6 justify-center">
          <div className="h-px w-8" style={{ background: P.pacific }} />
          <p
            className="text-[11px] uppercase tracking-[0.3em]"
            style={{ color: P.pacific, fontWeight: 500 }}
          >
            Admin
          </p>
          <div className="h-px w-8" style={{ background: P.pacific }} />
        </div>
        <h1
          className="font-heading text-center mb-8"
          style={{
            color: P.pale,
            fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
            fontWeight: 700,
            lineHeight: 1.15,
          }}
        >
          Sign in to the <span style={{ color: P.frozen }}>Dashboard</span>
        </h1>

        <Glass className="p-6 sm:p-8" glow>
          <LoginForm />
        </Glass>
      </div>
    </main>
  );
}
