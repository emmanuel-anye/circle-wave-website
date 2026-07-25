import "server-only";

const attempts = new Map<string, number[]>();

export function getClientIp(request: Request) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

export function isRateLimited(request: Request, namespace: string, limit = 5) {
  const key = `${namespace}:${getClientIp(request)}`;
  const now = Date.now();
  const windowStart = now - 60_000;
  const recent = (attempts.get(key) ?? []).filter((timestamp) => timestamp > windowStart);
  recent.push(now);
  attempts.set(key, recent);
  return recent.length > limit;
}

export function isHoneypotFilled(value: unknown) {
  return typeof value === "string" && value.trim().length > 0;
}
