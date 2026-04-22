import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-20 bg-blue-950 py-12 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <h2 className="text-lg font-semibold">Circle Wave</h2>
            <p className="mt-4 max-w-md text-sm leading-7 text-blue-100">
              Global customer service staffing and consulting solutions for
              businesses that need flexible, scalable, and reliable support.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-blue-200">
              Company
            </h3>
            <div className="mt-4 flex flex-col gap-2 text-sm text-blue-100">
              <Link href="/about">About</Link>
              <Link href="/services">Services</Link>
              <Link href="/industries">Industries</Link>
              <Link href="/contact">Contact</Link>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-blue-200">
              Legal
            </h3>
            <div className="mt-4 flex flex-col gap-2 text-sm text-blue-100">
              <Link href="/privacy">Privacy Policy</Link>
              <Link href="/terms">Terms of Use</Link>
              <a href="mailto:info@circleswave.net">info@circleswave.net</a>
              <a href="tel:+19453045386">+1 945 304-5386</a>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-blue-900 pt-6 text-sm text-blue-200">
          © {new Date().getFullYear()} Circle Wave. All rights reserved.
        </div>
      </div>
    </footer>
  );
}