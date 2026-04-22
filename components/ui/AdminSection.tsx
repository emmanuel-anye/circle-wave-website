type AdminSectionProps = {
  title: string;
  description?: string;
  children: React.ReactNode;
};

export default function AdminSection({
  title,
  description,
  children,
}: AdminSectionProps) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-slate-900">{title}</h2>
        {description && (
          <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
        )}
      </div>
      {children}
    </section>
  );
}