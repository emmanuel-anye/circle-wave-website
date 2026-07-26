import assert from "node:assert/strict";
import test from "node:test";
import { normalizeBookingUrl } from "../lib/booking";

test("accepts and normalizes an HTTPS booking URL", () => {
  assert.equal(
    normalizeBookingUrl(
      " https://booking.example.com/circle-wave ",
      "production"
    ),
    "https://booking.example.com/circle-wave"
  );
});

test("rejects public HTTP booking URLs in every environment", () => {
  assert.equal(
    normalizeBookingUrl("http://booking.example.com/circle-wave", "production"),
    null
  );
  assert.equal(
    normalizeBookingUrl("http://booking.example.com/circle-wave", "development"),
    null
  );
});

test("allows local HTTP booking URLs only in development", () => {
  assert.equal(
    normalizeBookingUrl("http://localhost:3001/schedule", "development"),
    "http://localhost:3001/schedule"
  );
  assert.equal(
    normalizeBookingUrl("http://127.0.0.1:3001/schedule", "development"),
    "http://127.0.0.1:3001/schedule"
  );
  assert.equal(
    normalizeBookingUrl("http://localhost:3001/schedule", "production"),
    null
  );
});

test("rejects missing, malformed, and unsupported booking URLs", () => {
  assert.equal(normalizeBookingUrl(undefined), null);
  assert.equal(normalizeBookingUrl(""), null);
  assert.equal(normalizeBookingUrl("not a URL"), null);
  assert.equal(normalizeBookingUrl("javascript:alert(1)"), null);
  assert.equal(normalizeBookingUrl("ftp://booking.example.com"), null);
});
