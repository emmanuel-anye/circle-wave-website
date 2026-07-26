import assert from "node:assert/strict";
import test from "node:test";
import {
  configureAnalytics,
  dispatchConversionEvent,
  type ConversionEvent,
} from "../lib/analytics";

const event: ConversionEvent = {
  name: "cta_clicked",
  properties: {
    audience: "employer",
    placement: "hero",
    action: "start_hiring_brief",
  },
};

test.afterEach(() => configureAnalytics(null));

test("does nothing when no analytics provider is configured", () => {
  assert.equal(dispatchConversionEvent(event, { doNotTrack: false }), false);
});

test("suppresses events when Do Not Track is enabled", () => {
  let calls = 0;
  const adapter = { track: () => void (calls += 1) };

  assert.equal(
    dispatchConversionEvent(event, { adapter, doNotTrack: true }),
    false
  );
  assert.equal(calls, 0);
});

test("forwards only the typed event when an adapter is configured", () => {
  let received: ConversionEvent | undefined;
  const adapter = { track: (value: ConversionEvent) => void (received = value) };

  assert.equal(
    dispatchConversionEvent(event, { adapter, doNotTrack: false }),
    true
  );
  assert.deepEqual(received, event);
});

test("provider errors do not interrupt application behavior", () => {
  const adapter = {
    track: () => {
      throw new Error("provider unavailable");
    },
  };

  assert.doesNotThrow(() =>
    dispatchConversionEvent(event, { adapter, doNotTrack: false })
  );
  assert.equal(
    dispatchConversionEvent(event, { adapter, doNotTrack: false }),
    false
  );
});

test("provider promise rejections are handled", async () => {
  const adapter = {
    track: async () => {
      throw new Error("provider unavailable");
    },
  };

  assert.equal(
    dispatchConversionEvent(event, { adapter, doNotTrack: false }),
    true
  );
  await new Promise((resolve) => setImmediate(resolve));
});
