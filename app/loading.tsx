export default function Loading() {
  return (
    <main className="min-h-[70vh] bg-slate-50" aria-busy="true" aria-label="Loading page">
      <section className="bg-gradient-to-br from-slate-950 via-blue-950 to-blue-800 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl animate-pulse px-4 sm:px-6">
          <div className="h-4 w-36 rounded-full bg-white/20" />
          <div className="mt-6 h-12 max-w-3xl rounded-2xl bg-white/15 sm:h-16" />
          <div className="mt-5 h-6 max-w-2xl rounded-xl bg-white/10" />
          <div className="mt-3 h-6 max-w-xl rounded-xl bg-white/10" />
          <div className="mt-8 flex gap-3">
            <div className="h-12 w-40 rounded-full bg-white/20" />
            <div className="h-12 w-36 rounded-full bg-white/10" />
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl animate-pulse px-4 sm:px-6">
          <div className="h-4 w-32 rounded-full bg-slate-200" />
          <div className="mt-5 h-10 max-w-2xl rounded-xl bg-slate-200" />
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm">
                <div className="h-12 w-12 rounded-2xl bg-slate-200" />
                <div className="mt-6 h-7 w-3/4 rounded-lg bg-slate-200" />
                <div className="mt-4 h-4 w-full rounded bg-slate-100" />
                <div className="mt-2 h-4 w-5/6 rounded bg-slate-100" />
                <div className="mt-2 h-4 w-2/3 rounded bg-slate-100" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
