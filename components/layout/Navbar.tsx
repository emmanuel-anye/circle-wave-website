export default function Navbar() {
  return (
    <nav className="w-full bg-white/80 backdrop-blur border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-900">Circle Wave</h1>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <a href="#" className="text-gray-700 hover:text-blue-600">Services</a>
          <a href="#" className="text-gray-700 hover:text-blue-600">Industries</a>
          <a href="#" className="text-gray-700 hover:text-blue-600">Employers</a>
          <a href="#" className="text-gray-700 hover:text-blue-600">Careers</a>
        </div>

        <button className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition">
          Request Staffing
        </button>
      </div>
    </nav>
  );
}