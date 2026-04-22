"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <nav className="w-full bg-white/80 backdrop-blur border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-blue-900">
          Circle Wave
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link href="/about" className="text-gray-700 hover:text-blue-600 transition">
            About
          </Link>
          <Link href="/services" className="text-gray-700 hover:text-blue-600 transition">
            Services
          </Link>
          <Link href="/industries" className="text-gray-700 hover:text-blue-600 transition">
            Industries
          </Link>
          <Link href="/employers" className="text-gray-700 hover:text-blue-600 transition">
            Employers
          </Link>
          <Link href="/careers" className="text-gray-700 hover:text-blue-600 transition">
            Careers
          </Link>
          <Link href="/contact" className="text-gray-700 hover:text-blue-600 transition">
            Contact
          </Link>
        </div>

        <Link href="/employers">
          <motion.button
            whileHover={{ scale: 1.04, y: -1 }}
            whileTap={{ scale: 0.98 }}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition shadow-sm"
          >
            Request Staffing
          </motion.button>
        </Link>
      </div>
    </nav>
  );
}