"use client";

import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import MotionButton from "@/components/ui/MotionButton";
import { mobileNavItem, mobileNavList } from "@/lib/motion";

const navLinks = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/industries", label: "Industries" },
  { href: "/employers", label: "Employers" },
  { href: "/careers", label: "Careers" },
  { href: "/jobs", label: "Jobs" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }

    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (!mobileOpen) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMobileOpen(false);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen]);

  return (
    <>
      <nav
        className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${
          scrolled
            ? "border-slate-200 bg-white/95 shadow-sm backdrop-blur"
            : "border-transparent bg-white/80 backdrop-blur"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
          <Link href="/" className="text-lg font-bold text-blue-900 sm:text-xl">
            Circle Wave
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            <div className="flex items-center gap-6 text-sm font-medium">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative text-gray-700 transition hover:text-blue-600"
                >
                  <span>{link.label}</span>
                </Link>
              ))}
            </div>

            <Link href="/employers">
              <MotionButton className="inline-flex rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700">
                Request Staffing
              </MotionButton>
            </Link>
          </div>

          <button
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-50 md:hidden"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={mobileOpen ? "close" : "menu"}
                initial={prefersReducedMotion ? false : { opacity: 0, rotate: -20, scale: 0.9 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={prefersReducedMotion ? undefined : { opacity: 0, rotate: 20, scale: 0.9 }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.14 }}
                aria-hidden="true"
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-slate-950/30 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.16 }}
              onClick={() => setMobileOpen(false)}
            />

            <motion.div
              id="mobile-navigation"
              className="fixed inset-x-0 top-[73px] z-50 border-b border-slate-200 bg-white shadow-xl md:hidden"
              initial={prefersReducedMotion ? false : { opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.2, ease: "easeOut" }}
            >
              <motion.div
                className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-4 sm:px-6"
                variants={mobileNavList}
                initial={prefersReducedMotion ? false : "hidden"}
                animate="visible"
                exit={prefersReducedMotion ? undefined : "exit"}
              >
                {navLinks.map((link) => (
                  <motion.div key={link.href} variants={mobileNavItem}>
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="block rounded-lg px-3 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-blue-600"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}

                <motion.div variants={mobileNavItem}>
                  <Link
                    href="/employers"
                    onClick={() => setMobileOpen(false)}
                    className="mt-2 block"
                  >
                    <MotionButton className="inline-flex w-full items-center justify-center rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700">
                      Request Staffing
                    </MotionButton>
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
