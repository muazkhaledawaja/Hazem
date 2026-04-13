"use client";

import { type ReactNode } from "react";
import SubmitButton from "./SubmitButton";

type Props = {
  action: (formData: FormData) => void | Promise<void>;
  id: string;
  label?: string;
  confirmMessage?: string;
  children?: ReactNode;
};

export default function DeleteForm({
  action,
  id,
  label = "Delete",
  confirmMessage = "Delete this item? This cannot be undone.",
  children,
}: Props) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!confirm(confirmMessage)) e.preventDefault();
      }}
    >
      <input type="hidden" name="id" value={id} />
      {children}
      <SubmitButton variant="danger" pendingLabel="Deleting…">
        {label}
      </SubmitButton>
    </form>
  );
}
