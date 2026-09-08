import 'server-only';
import { getSupportOption } from '../../config/ecosystem.ts';
import crypto from "node:crypto";

/**
 * Generate a cryptographically secure, unique server-side Order Number.
 * Example: HF-20260228-9B2F4C1A
 */
export function generateOrderNumber(prefix = "HF"): string {
  const datePart = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const randomPart = crypto.randomBytes(16).toString("hex").toUpperCase();
  return `${prefix}-${datePart}-${randomPart}`;
}

export interface SanitizedDonationInput {
  amount: number;
  donorName: string;
  donorEmail: string;
  donorPhone: string;
  supportOptionId: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: Record<string, string>;
  data?: SanitizedDonationInput;
}

/**
 * Robust server-side input validation.
 * Enforces strict limits:
 * - Amount: Positive number, Min PKR 100, Max PKR 5,000,000.
 * - Donor Name: 2 - 100 characters.
 * - Email: Standard format if provided.
 * - Phone: Digits and optional + prefix if provided.
 */
export function validateDonationInput(raw: unknown): ValidationResult {
  const errors: Record<string, string> = {};

  if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
    return { valid: false, errors: { form: "Invalid request payload" } };
  }

  const payload = raw as Record<string, unknown>;

  // 1. Validate Amount
  const rawAmount = Number(payload.amount);
  if ((typeof payload.amount !== "number" && typeof payload.amount !== "string") || !/^\d{1,10}(\.\d{1,2})?$/.test(String(payload.amount)) || isNaN(rawAmount) || !Number.isFinite(rawAmount)) {
    errors.amount = "Donation amount must be a valid number";
  } else if (rawAmount < 100) {
    errors.amount = "Minimum donation amount is PKR 100";
  } else if (rawAmount > 5000000) {
    errors.amount = "Maximum donation amount is PKR 5,000,000";
  }

  // 2. Validate Donor Name
  const rawName = typeof payload.donorName === "string" ? payload.donorName.trim() : "";
  if (!rawName) {
    errors.donorName = "Donor name is required";
  } else if (rawName.length < 2) {
    errors.donorName = "Donor name must be at least 2 characters";
  } else if (rawName.length > 100) {
    errors.donorName = "Donor name cannot exceed 100 characters";
  }

  // 3. Validate Email (optional, but validated if present)
  const rawEmail = typeof payload.donorEmail === "string" ? payload.donorEmail.trim().toLowerCase() : "";
  if (rawEmail) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(rawEmail) || rawEmail.length > 120) {
      errors.donorEmail = "Please provide a valid email address";
    }
  }

  // 4. Validate Phone (optional, but validated if present)
  const rawPhone = typeof payload.donorPhone === "string" ? payload.donorPhone.trim() : "";
  if (rawPhone) {
    const cleanPhone = rawPhone.replace(/[\s\-()]/g, "");
    const phoneRegex = /^\+?[0-9]{7,16}$/;
    if (!phoneRegex.test(cleanPhone)) {
      errors.donorPhone = "Please provide a valid phone number";
    }
  }

  // 5. Support option ID
  const supportOptionId = typeof payload.supportOptionId === "string" && payload.supportOptionId.trim()
    ? payload.supportOptionId.trim().slice(0, 50)
    : "custom";

  const support = getSupportOption(supportOptionId);
  if (supportOptionId !== 'custom' && !support) errors.supportOptionId = 'Unknown support option';
  if (support && rawAmount !== support.amountPkr) errors.amount = 'Amount does not match the selected support option';
  if (rawName.replace(/[<>]/g, "").length < 2 || /[\u0000-\u001f\u007f]/.test(rawName)) errors.donorName = 'Invalid name';

  if (Object.keys(errors).length > 0) {
    return { valid: false, errors };
  }

  return {
    valid: true,
    errors: {},
    data: {
      amount: Math.round(rawAmount * 100) / 100, // round to 2 decimals
      donorName: rawName.replace(/[<>]/g, ""), // strip simple angle brackets
      donorEmail: rawEmail,
      donorPhone: rawPhone,
      supportOptionId,
    },
  };
}

/**
 * Timing-safe string comparison to prevent side-channel timing attacks
 * on callback passwords, tokens, or sensitive identifiers.
 */
export function timingSafeCompare(a: string | undefined | null, b: string | undefined | null): boolean {
  if (typeof a !== "string" || typeof b !== "string") {
    return false;
  }

  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);

  if (bufA.length !== bufB.length) {
    // Constant time dummy comparison
    const dummy = Buffer.alloc(bufA.length);
    crypto.timingSafeEqual(bufA, dummy);
    return false;
  }

  return crypto.timingSafeEqual(bufA, bufB);
}

/**
 * Validates that a Click2Pay redirect URL belongs exclusively
 * to PayPro's legitimate domain or the configured base URL origin.
 */
export function isValidPayProDomain(urlStr: string): boolean {
  try {
    const url = new URL(urlStr);
    return url.protocol === 'https:' && !url.username && !url.password && !url.port &&
      (url.hostname === 'paypro.com.pk' || url.hostname.endsWith('.paypro.com.pk'));
  } catch { return false; }
}
