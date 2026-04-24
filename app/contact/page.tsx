import PageTransition from "@/components/ui/PageTransition";
import Reveal from "@/components/ui/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/ui/Stagger";
import HoverCard from "@/components/ui/HoverCard";
import Link from "next/link";
import ContactForm from "@/components/forms/ContactForm";

export default function ContactPage() {
  return (
    <PageTransition>
      <section className="bg-slate-50 section">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <Reveal className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">
              Contact
            </p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
              Let’s talk about your staffing and support needs
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-600">
              Whether you need customer service staffing, support consulting, or
              want to learn more about Circle Wave, our team is ready to help.
            </p>
          </Reveal>

          <StaggerGroup className="mt-14 grid gap-8 md:grid-cols-2">
            <StaggerItem>
              <HoverCard className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                <h2 className="text-2xl font-semibold text-slate-900">
                  Contact Details
                </h2>

                <div className="mt-6 space-y-5 text-slate-600">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                      Email
                    </p>
                    <a
                      href="mailto:info@circleswave.net"
                      className="mt-1 inline-block text-lg text-blue-600 hover:text-blue-700"
                    >
                      info@circleswave.net
                    </a>
                  </div>

                  <div>
                    <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                      Phone
                    </p>
                    <a
                      href="tel:+19453045386"
                      className="mt-1 inline-block text-lg text-blue-600 hover:text-blue-700"
                    >
                      +1 945 304-5386
                    </a>
                  </div>

                  <div>
                    <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                      Quick Links
                    </p>
                    <div className="mt-3 flex flex-col gap-2">
                      <Link
                        href="/employers"
                        className="text-blue-600 hover:text-blue-700"
                      >
                        Request Staffing
                      </Link>
                      <Link
                        href="/careers"
                        className="text-blue-600 hover:text-blue-700"
                      >
                        Apply for Jobs
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="mt-8 border-t border-slate-200 pt-6">
                  <p className="text-sm text-slate-500">
                    For detailed staffing needs, we recommend submitting a request
                    through our employer form so we can review your requirements
                    properly.
                  </p>
                </div>
              </HoverCard>
            </StaggerItem>

            <StaggerItem>
              <ContactForm />
            </StaggerItem>
          </StaggerGroup>
        </div>
      </section>
    </PageTransition>
  );
}