"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import MotionButton from "@/components/ui/MotionButton";
import ConversionLink from "@/components/analytics/ConversionLink";
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
  const pathname = usePathname();

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }

    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mobileOpen) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setMobileOpen(false);
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen]);

  function isActive(href: string) {
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <>
      <nav
        className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${
          scrolled
            ? "border-slate-200/80 bg-white/95 shadow-[0_14px_45px_-28px_rgba(15,23,42,0.45)] backdrop-blur-xl"
            : "border-transparent bg-white/85 backdrop-blur-xl"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6">
          <Link href="/" className="group flex items-center gap-3" aria-label="Circle Wave home">
            <span className="relative inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-blue-700 via-blue-600 to-cyan-500 text-sm font-bold text-white shadow-lg shadow-blue-600/20">
              <span className="absolute inset-1 rounded-xl border border-white/30" aria-hidden="true" />
              CW
            </span>
            <span>
              <span className="block text-base font-bold leading-none text-blue-950 sm:text-lg">Circle Wave</span>
              <span className="mt-1 hidden text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500 sm:block">
                Staffing & support
              </span>
            </span>
          </Link>

          <div className="hidden items-center gap-5 xl:flex">
            <div className="flex items-center rounded-full border border-slate-200 bg-slate-50/80 p-1 text-sm font-medium">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={`relative rounded-full px-3.5 py-2 transition ${
                      active ? "bg-white text-blue-700 shadow-sm" : "text-slate-600 hover:bg-white hover:text-blue-700"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>

            <ConversionLink
              href="/employers#hiring-brief"
              event={{
                name: "cta_clicked",
                properties: {
                  audience: "employer",
                  placement: "navigation",
                  action: "start_hiring_brief",
                },
              }}
            >
              <MotionButton className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700">
                Start hiring brief
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </MotionButton>
            </ConversionLink>
          </div>

          <button
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-blue-200 hover:text-blue-700 xl:hidden"
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
              className="fixed inset-0 z-40 bg-slate-950/45 backdrop-blur-sm xl:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.16 }}
              onClick={() => setMobileOpen(false)}
            />

            <motion.div
              id="mobile-navigation"
              className="fixed inset-x-3 top-[74px] z-50 overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-2xl shadow-slate-950/20 xl:hidden"
              initial={prefersReducedMotion ? false : { opacity: 0, y: -14, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={prefersReducedMotion ? undefined : { opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.22, ease: "easeOut" }}
            >
              <div className="border-b border-slate-100 bg-gradient-to-r from-blue-950 to-blue-700 px-5 py-5 text-white">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-200">Explore Circle Wave</p>
                <p className="mt-2 max-w-sm text-sm leading-6 text-blue-100">
                  Find staffing support, explore opportunities, or connect with our team.
                </p>
              </div>

              <motion.div
                className="grid gap-1 p-4 sm:grid-cols-2"
                variants={mobileNavList}
                initial={prefersReducedMotion ? false : "hidden"}
                animate="visible"
                exit={prefersReducedMotion ? undefined : "exit"}
              >
                {navLinks.map((link) => {
                  const active = isActive(link.href);
                  return (
                    <motion.div key={link.href} variants={mobileNavItem}>
                      <Link
                        href={link.href}
                        aria-current={active ? "page" : undefined}
                        className={`flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                          active ? "bg-blue-50 text-blue-700" : "text-slate-700 hover:bg-slate-50 hover:text-blue-700"
                        }`}
                      >
                        {link.label}
                        <ArrowUpRight className="h-4 w-4 text-slate-300" aria-hidden="true" />
                      </Link>
                    </motion.div>
                  );
                })}

                <motion.div variants={mobileNavItem} className="sm:col-span-2">
                  <ConversionLink
                    href="/employers#hiring-brief"
                    event={{
                      name: "cta_clicked",
                      properties: {
                        audience: "employer",
                        placement: "navigation",
                        action: "start_hiring_brief",
                      },
                    }}
                    className="mt-2 block"
                  >
                    <MotionButton className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-700">
                      Start hiring brief
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </MotionButton>
                  </ConversionLink>
                </motion.div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
