export default function Footer() {
  return (
    <footer className="bg-blue-900 text-white py-10 mt-20">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-lg font-semibold mb-4">Circle Wave</h2>
        <p className="text-sm opacity-80">
          Global customer service staffing and consulting solutions.
        </p>

        <div className="mt-6 text-sm opacity-70">
          © {new Date().getFullYear()} Circle Wave. All rights reserved.
        </div>
      </div>
    </footer>
  );
}