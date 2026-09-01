import assert from "node:assert/strict";
import test from "node:test";
import { buildYzDonationUrl, getSupportOption, paymentDisclosure } from "../src/config/ecosystem.ts";

test("allowlisted support links include only project and support identifiers", () => {
  const url = new URL(buildYzDonationUrl("guardian-monthly"));
  assert.equal(url.pathname, "/donate");
  assert.deepEqual([...url.searchParams.entries()], [["project", "hammad-foundation"], ["support", "guardian-monthly"]]);
  assert.equal(url.searchParams.has("amount"), false);
  assert.equal(url.searchParams.has("status"), false);
});

test("unknown support id falls back without forwarding it", () => {
  const url = new URL(buildYzDonationUrl("custom&amount=1&status=paid"));
  assert.equal(url.searchParams.get("project"), "hammad-foundation");
  assert.equal(url.searchParams.has("support"), false);
  assert.equal(getSupportOption("custom"), null);
});

test("payment identity remains YZ with Hammad designation", () => {
  assert.equal(paymentDisclosure.recipient, "Y.Z Educational Services (Private) Limited");
  assert.equal(paymentDisclosure.designation, "Hammad Foundation");
});
