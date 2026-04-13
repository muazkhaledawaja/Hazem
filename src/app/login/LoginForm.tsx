"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { palette as P } from "@/lib/constants";
import { login, type LoginState } from "./actions";

const initialState: LoginState = { error: null };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full py-3 rounded-full text-[11px] uppercase tracking-[0.2em] font-semibold transition-all duration-300 disabled:opacity-60"
      style={{
        background: `linear-gradient(135deg, ${P.pacific}, ${P.fresh})`,
        color: P.deep,
        boxShadow: `0 8px 40px ${P.pacific}20`,
      }}
    >
      {pending ? "Signing in…" : "Sign in"}
    </button>
  );
}

export default function LoginForm() {
  const [state, formAction] = useActionState(login, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-5">
      <label className="flex flex-col gap-2">
        <span
          className="text-[10px] uppercase tracking-[0.2em]"
          style={{ color: P.muted, fontWeight: 500 }}
        >
          Email
        </span>
        <input
          name="email"
          type="email"
          required
          autoComplete="email"
          className="px-4 py-3 rounded-xl text-sm outline-none"
          style={{
            background: "rgba(27,73,101,0.15)",
            border: `1px solid ${P.border}`,
            color: P.pale,
          }}
        />
      </label>
      <label className="flex flex-col gap-2">
        <span
          className="text-[10px] uppercase tracking-[0.2em]"
          style={{ color: P.muted, fontWeight: 500 }}
        >
          Password
        </span>
        <input
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="px-4 py-3 rounded-xl text-sm outline-none"
          style={{
            background: "rgba(27,73,101,0.15)",
            border: `1px solid ${P.border}`,
            color: P.pale,
          }}
        />
      </label>

      {state.error && (
        <p
          className="text-xs px-3 py-2 rounded-lg"
          style={{
            color: "#ffb4b4",
            background: "rgba(255,80,80,0.08)",
            border: "1px solid rgba(255,80,80,0.2)",
          }}
        >
          {state.error}
        </p>
      )}

      <SubmitButton />
    </form>
  );
}
