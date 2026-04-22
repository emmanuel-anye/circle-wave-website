export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-blue-900 to-blue-600 text-white py-24">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-5xl font-bold leading-tight max-w-3xl">
          Global Customer Service Staffing & Consulting
        </h1>

        <p className="mt-6 text-lg max-w-2xl opacity-90">
          We connect businesses with top-tier customer service talent across Africa and beyond.
        </p>

        <div className="mt-8 flex gap-4">
          <button className="bg-white text-blue-700 px-6 py-3 rounded-lg font-semibold">
            Request Staffing
          </button>

          <button className="border border-white px-6 py-3 rounded-lg">
            Apply for Jobs
          </button>
        </div>
      </div>
    </section>
  );
}