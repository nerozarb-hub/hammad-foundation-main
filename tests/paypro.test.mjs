import assert from "node:assert/strict";
import test from "node:test";
import { getPayProConfig } from "../src/lib/paypro/config.ts";
import { isValidPayProDomain, validateDonationInput } from "../src/lib/paypro/security.ts";

test("PayPro production config requires explicit host and merchant credentials", () => {
  const config = getPayProConfig({ PAYPRO_ENV: "production" });
  assert.equal(config.baseUrl, "");
  assert.equal(config.isConfigured, false);
});

test("PayPro redirect validation allows configured PayPro hosts only", () => {
  assert.equal(isValidPayProDomain("https://demoapi.paypro.com.pk/click2pay?id=1", "https://demoapi.paypro.com.pk"), true);
  assert.equal(isValidPayProDomain("https://attacker.example/click2pay", "https://demoapi.paypro.com.pk"), false);
});

test("PayPro checkout validation rejects invalid donor input", () => {
  assert.equal(validateDonationInput({ amount: 10, donorName: "x" }).valid, false);
  assert.equal(validateDonationInput({ amount: 5000, donorName: "Test Donor", donorEmail: "test@example.com", supportOptionId: "guardian-monthly" }).valid, true);
});
