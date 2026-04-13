import { palette as P } from "@/lib/constants";

type BaseProps = {
  label: string;
  name: string;
  defaultValue?: string;
  required?: boolean;
  type?: string;
  placeholder?: string;
  hint?: string;
};

export function Field({
  label,
  name,
  defaultValue,
  required,
  type = "text",
  placeholder,
  hint,
}: BaseProps) {
  return (
    <label className="flex flex-col gap-2">
      <span
        className="text-[10px] uppercase tracking-[0.2em]"
        style={{ color: P.muted, fontWeight: 500 }}
      >
        {label}
        {required && <span style={{ color: P.pacific }}> *</span>}
      </span>
      <input
        name={name}
        type={type}
        defaultValue={defaultValue}
        required={required}
        placeholder={placeholder}
        className="px-4 py-3 rounded-xl text-sm outline-none"
        style={{
          background: "rgba(27,73,101,0.15)",
          border: `1px solid ${P.border}`,
          color: P.pale,
        }}
      />
      {hint && (
        <span className="text-[10px]" style={{ color: P.muted }}>
          {hint}
        </span>
      )}
    </label>
  );
}

type TextAreaProps = Omit<BaseProps, "type"> & { rows?: number };

export function TextField({
  label,
  name,
  defaultValue,
  required,
  placeholder,
  hint,
  rows = 4,
}: TextAreaProps) {
  return (
    <label className="flex flex-col gap-2">
      <span
        className="text-[10px] uppercase tracking-[0.2em]"
        style={{ color: P.muted, fontWeight: 500 }}
      >
        {label}
        {required && <span style={{ color: P.pacific }}> *</span>}
      </span>
      <textarea
        name={name}
        defaultValue={defaultValue}
        required={required}
        placeholder={placeholder}
        rows={rows}
        className="px-4 py-3 rounded-xl text-sm outline-none resize-y"
        style={{
          background: "rgba(27,73,101,0.15)",
          border: `1px solid ${P.border}`,
          color: P.pale,
          fontFamily: "inherit",
        }}
      />
      {hint && (
        <span className="text-[10px]" style={{ color: P.muted }}>
          {hint}
        </span>
      )}
    </label>
  );
}

type SelectProps = {
  label: string;
  name: string;
  defaultValue?: string;
  required?: boolean;
  options: { value: string; label: string }[];
};

export function SelectField({
  label,
  name,
  defaultValue,
  required,
  options,
}: SelectProps) {
  return (
    <label className="flex flex-col gap-2">
      <span
        className="text-[10px] uppercase tracking-[0.2em]"
        style={{ color: P.muted, fontWeight: 500 }}
      >
        {label}
        {required && <span style={{ color: P.pacific }}> *</span>}
      </span>
      <select
        name={name}
        defaultValue={defaultValue}
        required={required}
        className="px-4 py-3 rounded-xl text-sm outline-none"
        style={{
          background: "rgba(27,73,101,0.15)",
          border: `1px solid ${P.border}`,
          color: P.pale,
        }}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} style={{ background: P.bg }}>
            {opt.label}
          </option>
        ))}
      </select>
    </label>
  );
}
