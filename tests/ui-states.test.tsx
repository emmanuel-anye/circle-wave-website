import assert from "node:assert/strict";
import test from "node:test";
import { renderToStaticMarkup } from "react-dom/server";
import ConsultationCTA from "../components/conversion/ConsultationCTA";
import SocialProof from "../components/sections/SocialProof";

test("trust section remains hidden without approved material", () => {
  assert.equal(renderToStaticMarkup(<SocialProof items={[]} />), "");
});

test("renders neutral structure for an approved, sourced outcome", () => {
  const html = renderToStaticMarkup(
    <SocialProof
      items={[
        {
          kind: "outcome",
          id: "approved-outcome",
          title: "Approved outcome title",
          description: "Approved outcome description.",
          sourceNote: "Approved source note.",
        },
      ]}
    />
  );

  assert.match(html, /Verified trust/);
  assert.match(html, /Approved outcome title/);
  assert.match(html, /Approved source note/);
});

test("consultation CTA falls back to the contact form without configuration", () => {
  const html = renderToStaticMarkup(
    <ConsultationCTA placement="employer_page" bookingUrl="" />
  );

  assert.match(html, /href="\/contact\?subject=Consultation"/);
  assert.match(html, /Contact us to schedule/);
});

test("consultation CTA uses an explicitly configured HTTPS destination", () => {
  const html = renderToStaticMarkup(
    <ConsultationCTA
      placement="employer_page"
      bookingUrl="https://booking.example.com/circle-wave"
    />
  );

  assert.match(html, /href="https:\/\/booking\.example\.com\/circle-wave"/);
  assert.match(html, /Book a consultation/);
  assert.match(html, /target="_blank"/);
});
