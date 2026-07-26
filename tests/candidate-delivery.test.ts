import assert from "node:assert/strict";
import test from "node:test";
import {
  deliverApplicationConfirmation,
  registerJobAlertSubscription,
} from "../lib/candidate-delivery";

test("candidate delivery extension points are inactive without an adapter", async () => {
  assert.equal(
    await deliverApplicationConfirmation({
      email: "candidate@example.com",
      name: "Candidate",
      jobTitle: "Support Specialist",
      applicationReference: "CW-20260725-123E4567E89B",
    }),
    "not_configured"
  );
  assert.equal(
    await registerJobAlertSubscription({
      email: "candidate@example.com",
      targetRoles: "Support",
      location: "Kigali",
    }),
    "not_configured"
  );
});
