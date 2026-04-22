export default function Navbar() {
  return (
    <nav className="w-full bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-900">Circle Wave</h1>

        <div className="space-x-6 hidden md:flex">
          <a href="#" className="text-gray-700 hover:text-blue-600">Services</a>
          <a href="#" className="text-gray-700 hover:text-blue-600">Industries</a>
          <a href="#" className="text-gray-700 hover:text-blue-600">Employers</a>
          <a href="#" className="text-gray-700 hover:text-blue-600">Careers</a>
        </div>

        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
          Request Staffing
        </button>
      </div>
    </nav>
  );
}