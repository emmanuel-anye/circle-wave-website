import PageTransition from "@/components/ui/PageTransition";
import Reveal from "@/components/ui/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/ui/Stagger";
import HoverCard from "@/components/ui/HoverCard";

export default function AboutPage() {
  return (
    <PageTransition>
      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <Reveal className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">
              About Circle Wave
            </p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
              Building stronger customer connections through staffing and support
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-600">
              Circle Wave is a customer service staffing and consulting company
              focused on helping businesses build reliable, scalable, and
              high-performing support teams. We work with organizations that need
              flexible staffing solutions, operational support, and customer
              experience expertise across industries.
            </p>
          </Reveal>

          <StaggerGroup className="mt-14 grid gap-8 lg:grid-cols-2">
            <StaggerItem>
              <HoverCard className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                <h2 className="text-2xl font-semibold text-slate-900">Our Story</h2>
                <p className="mt-4 leading-8 text-slate-600">
                  Circle Wave was built on the idea that technology, people, and
                  service should work together to help businesses maintain stronger
                  relationships with their customers. From the start, the company
                  was shaped by a vision of global connection, operational
                  excellence, and meaningful service delivery.
                </p>
                <p className="mt-4 leading-8 text-slate-600">
                  Today, Circle Wave supports businesses by connecting them with
                  customer service talent, staffing solutions, and consulting
                  support designed to improve service quality and business
                  performance.
                </p>
              </HoverCard>
            </StaggerItem>

            <StaggerItem>
              <HoverCard className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                <h2 className="text-2xl font-semibold text-slate-900">Our Mission</h2>
                <p className="mt-4 leading-8 text-slate-600">
                  Our mission is to help businesses grow through customer service
                  excellence, flexible staffing, and smart operational support. We
                  are committed to providing tailored solutions that improve
                  customer experiences, strengthen service teams, and create
                  long-term value for clients globally.
                </p>
              </HoverCard>
            </StaggerItem>
          </StaggerGroup>

          <Reveal className="mt-8">
            <HoverCard className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <h2 className="text-2xl font-semibold text-slate-900">Our Vision</h2>
              <p className="mt-4 max-w-4xl leading-8 text-slate-600">
                We aim to be a trusted global partner in customer service staffing
                and consulting, recognized for helping businesses scale support
                operations while creating meaningful opportunities for skilled
                professionals across Africa and beyond.
              </p>
            </HoverCard>
          </Reveal>

          <StaggerGroup className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Global Reach",
                text: "We support clients with talent and staffing solutions across multiple regions, including African markets.",
              },
              {
                title: "Service Excellence",
                text: "We focus on quality support delivery, stronger workflows, and better customer experiences.",
              },
              {
                title: "Flexible Partnerships",
                text: "We help organizations with permanent, temporary, contract, and outsourced support needs.",
              },
            ].map((item) => (
              <StaggerItem key={item.title}>
                <HoverCard className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-slate-900">
                    {item.title}
                  </h3>
                  <p className="mt-3 leading-7 text-slate-600">{item.text}</p>
                </HoverCard>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>
    </PageTransition>
  );
}