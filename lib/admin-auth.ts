import { timingSafeEqual } from "node:crypto";
import type { NextRequest } from "next/server";

export function getExpectedAdminToken() {
  const user = process.env.BLOG_ADMIN_USER;
  const pass = process.env.BLOG_ADMIN_PASS;

  if (!user || !pass) return null;
  return Buffer.from(`${user}:${pass}`).toString("base64");
}

export function isValidAdminToken(token?: string) {
  const expected = getExpectedAdminToken();

  if (!expected || !token) return false;

  const actualBuffer = Buffer.from(token);
  const expectedBuffer = Buffer.from(expected);

  return (
    actualBuffer.length === expectedBuffer.length &&
    timingSafeEqual(actualBuffer, expectedBuffer)
  );
}

export function isAdminRequest(req: NextRequest) {
  return isValidAdminToken(req.cookies.get("admin-auth")?.value);
}
