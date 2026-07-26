import Image from "next/image";
import {
  approvedTrustProof,
  type TrustProofItem,
} from "@/content/trust";

export default function SocialProof({
  items = approvedTrustProof,
}: {
  items?: TrustProofItem[];
}) {
  if (items.length === 0) return null;

  return (
    <section
      aria-labelledby="social-proof-heading"
      className="border-y border-slate-200 bg-white py-16"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <p className="section-kicker">Verified trust</p>
        <h2
          id="social-proof-heading"
          className="mt-3 text-3xl font-bold tracking-tight text-slate-900"
        >
          Evidence supplied and approved by Circle Wave
        </h2>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <article
              key={item.id}
              className="rounded-3xl border border-slate-200 bg-slate-50 p-6"
            >
              {item.kind === "testimonial" && (
                <>
                  <blockquote className="leading-7 text-slate-700">
                    “{item.quote}”
                  </blockquote>
                  <p className="mt-5 text-sm font-semibold text-slate-900">
                    {item.attribution}
                  </p>
                  {(item.role || item.organization) && (
                    <p className="mt-1 text-sm text-slate-600">
                      {[item.role, item.organization].filter(Boolean).join(", ")}
                    </p>
                  )}
                </>
              )}

              {item.kind === "client" && (
                <>
                  <Image
                    src={item.logoPath}
                    alt={item.logoAlt}
                    width={180}
                    height={72}
                    className="h-12 w-auto object-contain"
                  />
                  <p className="mt-4 text-sm font-semibold text-slate-900">
                    {item.name}
                  </p>
                </>
              )}

              {item.kind === "outcome" && (
                <>
                  <h3 className="text-xl font-semibold text-slate-900">
                    {item.title}
                  </h3>
                  <p className="mt-3 leading-7 text-slate-700">
                    {item.description}
                  </p>
                  <p className="mt-4 text-xs text-slate-500">
                    {item.sourceNote}
                  </p>
                </>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
