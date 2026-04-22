type AdminFieldProps = {
  label: string;
  value?: string | null;
};

export default function AdminField({ label, value }: AdminFieldProps) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
        {label}
      </p>
      <p className="mt-1 break-words text-sm leading-6 text-slate-700">
        {value && value.trim() !== "" ? value : "—"}
      </p>
    </div>
  );
}