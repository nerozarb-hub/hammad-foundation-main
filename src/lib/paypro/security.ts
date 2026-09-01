import crypto from "node:crypto";

/**
 * Generate a cryptographically secure, unique server-side Order Number.
 * Example: HF-20260228-9B2F4C1A
 */
export function generateOrderNumber(prefix = "HF"): string {
  const datePart = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const randomPart = crypto.randomBytes(4).toString("hex").toUpperCase();
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

  if (!raw || typeof raw !== "object") {
    return { valid: false, errors: { form: "Invalid request payload" } };
  }

  const payload = raw as Record<string, unknown>;

  // 1. Validate Amount
  const rawAmount = Number(payload.amount);
  if (isNaN(rawAmount) || !Number.isFinite(rawAmount)) {
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
export function isValidPayProDomain(urlStr: string, configuredBaseUrl?: string): boolean {
  try {
    const parsed = new URL(urlStr);
    if (parsed.protocol !== "https:") {
      return false;
    }

    const host = parsed.hostname.toLowerCase();
    if (host === "paypro.com.pk" || host.endsWith(".paypro.com.pk")) {
      return true;
    }

    if (configuredBaseUrl) {
      try {
        const baseHost = new URL(configuredBaseUrl).hostname.toLowerCase();
        if (host === baseHost || host.endsWith(`.${baseHost}`)) {
          return true;
        }
      } catch {
        // ignore invalid base url
      }
    }

    return false;
  } catch {
    return false;
  }
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetInSeconds: number;
}

/**
 * Interface for production rate limiting.
 *
 * NOTE: The in-memory limiter is designed for local development and unit tests.
 * In a multi-region or serverless production deployment, an external shared KV/Redis
 * rate limiter adapter should implement this interface.
 */
export interface IRateLimiter {
  check(identifier: string, limit?: number, windowSeconds?: number): Promise<RateLimitResult> | RateLimitResult;
}

interface RateLimitBucket {
  count: number;
  resetAt: number;
}

export class MemoryRateLimiter implements IRateLimiter {
  private store = new Map<string, RateLimitBucket>();

  check(identifier: string, limit: number = 10, windowSeconds: number = 60): RateLimitResult {
    const now = Date.now();
    const bucket = this.store.get(identifier);

    // Clean old entries periodically
    if (this.store.size > 5000) {
      for (const [key, val] of this.store.entries()) {
        if (val.resetAt < now) {
          this.store.delete(key);
        }
      }
    }

    if (!bucket || bucket.resetAt < now) {
      const resetAt = now + windowSeconds * 1000;
      this.store.set(identifier, { count: 1, resetAt });
      return { allowed: true, remaining: limit - 1, resetInSeconds: windowSeconds };
    }

    if (bucket.count >= limit) {
      const resetInSeconds = Math.max(1, Math.ceil((bucket.resetAt - now) / 1000));
      return { allowed: false, remaining: 0, resetInSeconds };
    }

    bucket.count += 1;
    const resetInSeconds = Math.max(1, Math.ceil((bucket.resetAt - now) / 1000));
    return { allowed: true, remaining: limit - bucket.count, resetInSeconds };
  }

  clear(): void {
    this.store.clear();
  }
}

const defaultRateLimiter = new MemoryRateLimiter();

export function checkRateLimit(
  identifier: string,
  limit: number = 10,
  windowSeconds: number = 60
): RateLimitResult {
  return defaultRateLimiter.check(identifier, limit, windowSeconds);
}

