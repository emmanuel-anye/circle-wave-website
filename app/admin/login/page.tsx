import PageTransition from "@/components/ui/PageTransition";
import Reveal from "@/components/ui/Reveal";
import AdminLoginForm from "@/components/admin/AdminLoginForm";

export default function AdminLoginPage() {
  return (
    <PageTransition>
      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-2xl px-4 sm:px-6">
          <Reveal className="max-w-xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">
              Admin Access
            </p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Sign in to view submissions
            </h1>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              Enter the admin password to access the internal dashboard.
            </p>
          </Reveal>

          <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <AdminLoginForm />
          </div>
        </div>
      </section>
    </PageTransition>
  );
}