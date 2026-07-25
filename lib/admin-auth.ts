import "server-only";

import { createHmac, scrypt, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE_NAME = "cw_admin_auth";
export const ADMIN_SESSION_TTL_SECONDS = 60 * 60 * 8;

function getSessionSecret() {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error("ADMIN_SESSION_SECRET must contain at least 32 characters.");
  }
  return secret;
}

function sign(payload: string) {
  return createHmac("sha256", getSessionSecret()).update(payload).digest("base64url");
}

function derivePasswordKey(password: string) {
  return new Promise<Buffer>((resolve, reject) => {
    scrypt(password, getSessionSecret(), 64, (error, derivedKey) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(derivedKey);
    });
  });
}

export async function passwordsMatch(candidate: string, expected: string) {
  const [candidateHash, expectedHash] = await Promise.all([
    derivePasswordKey(candidate),
    derivePasswordKey(expected),
  ]);
  return timingSafeEqual(candidateHash, expectedHash);
}

export function createAdminSession() {
  const expiresAt = Math.floor(Date.now() / 1000) + ADMIN_SESSION_TTL_SECONDS;
  const payload = String(expiresAt);
  return `${payload}.${sign(payload)}`;
}

export function verifyAdminSession(value?: string) {
  if (!value) return false;
  const [expiresAt, signature] = value.split(".");
  if (!expiresAt || !signature || Number(expiresAt) <= Date.now() / 1000) return false;

  const expected = Buffer.from(sign(expiresAt));
  const received = Buffer.from(signature);
  return expected.length === received.length && timingSafeEqual(expected, received);
}

export async function isAdminAuthenticated() {
  return verifyAdminSession((await cookies()).get(ADMIN_COOKIE_NAME)?.value);
}
