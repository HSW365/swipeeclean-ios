// HSW365 owner access (server side).
// The client sends the owner session token from owner-login.js in the "X-HSW-Owner" header.
// The token is never trusted on its own: it is checked with the HSW365 owner-pin service
// and only a positive answer grants owner/VIP access. Positive results are cached for 5 minutes.
import type { Request } from "express";

const OWNER_PIN_URL = "https://lsxdlmrjrcivxwgfkpop.supabase.co/functions/v1/owner-pin";
const CACHE_MS = 5 * 60 * 1000;

// The owner identity the app already uses for its owner-only areas.
export const OWNER_EMAIL = "hoodstarent365@gmail.com";

const verified = new Map<string, number>();

export async function verifyOwnerToken(token: unknown): Promise<boolean> {
  if (typeof token !== "string" || !token || token.length > 512) return false;
  const now = Date.now();
  const until = verified.get(token);
  if (until && until > now) return true;
  try {
    const r = await fetch(OWNER_PIN_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ a: "verify", token }),
      signal: AbortSignal.timeout(5000),
    });
    const data: any = await r.json().catch(() => null);
    if (data && data.ok === true) {
      verified.set(token, now + CACHE_MS);
      if (verified.size > 500) {
        verified.forEach((exp, key) => { if (exp <= now) verified.delete(key); });
      }
      return true;
    }
  } catch {
    // Service unreachable: no owner access for this request.
  }
  verified.delete(token);
  return false;
}

export function ownerTokenFrom(req: Request): string | null {
  const h = req.headers["x-hsw-owner"];
  const v = Array.isArray(h) ? h[0] : h;
  return typeof v === "string" && v ? v : null;
}

export async function isOwnerRequest(req: Request): Promise<boolean> {
  const token = ownerTokenFrom(req);
  return token ? verifyOwnerToken(token) : false;
}

export const ownerUser = {
  id: "hsw365-owner",
  email: OWNER_EMAIL,
  firstName: "HSW365",
  lastName: "Owner",
  isFounder: true,
  isSubscribed: true,
  hasSubscription: true,
  isOwner: true,
  plan: "owner",
  tier: "elite",
  unlimited: true,
};
