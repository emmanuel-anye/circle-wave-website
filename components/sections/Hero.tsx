export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-blue-950 via-blue-900 to-blue-600 text-white py-28">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute -top-10 left-10 h-56 w-56 rounded-full bg-blue-300 blur-3xl" />
        <div className="absolute top-20 right-10 h-72 w-72 rounded-full bg-cyan-300 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-200">
            Global Staffing & Customer Support
          </p>

          <h1 className="mt-6 text-5xl md:text-6xl font-bold leading-tight">
            Customer service staffing and consulting for growing businesses
          </h1>

          <p className="mt-6 text-lg md:text-xl max-w-2xl text-blue-100 leading-8">
            Circle Wave helps organizations build high-performing customer support
            teams with flexible staffing, operational guidance, and service-focused
            talent across Africa and beyond.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <button className="bg-white text-blue-800 px-6 py-3 rounded-lg font-semibold">
              Request Staffing
            </button>

            <button className="border border-white/70 px-6 py-3 rounded-lg text-white font-semibold">
              Apply for Jobs
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}