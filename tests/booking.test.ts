import assert from "node:assert/strict";
import test from "node:test";
import { normalizeBookingUrl } from "../lib/booking";

test("accepts and normalizes an HTTPS booking URL", () => {
  assert.equal(
    normalizeBookingUrl(" https://booking.example.com/circle-wave "),
    "https://booking.example.com/circle-wave"
  );
});

test("rejects missing, malformed, and non-web booking URLs", () => {
  assert.equal(normalizeBookingUrl(undefined), null);
  assert.equal(normalizeBookingUrl(""), null);
  assert.equal(normalizeBookingUrl("not a URL"), null);
  assert.equal(normalizeBookingUrl("javascript:alert(1)"), null);
  assert.equal(normalizeBookingUrl("ftp://booking.example.com"), null);
});
