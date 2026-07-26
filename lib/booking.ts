export function normalizeBookingUrl(
  value?: string | null,
  environment = process.env.NODE_ENV
) {
  const candidate = value?.trim();
  if (!candidate) return null;

  try {
    const url = new URL(candidate);
    if (url.protocol === "https:") return url.toString();

    const isLocalDevelopmentUrl =
      environment === "development" &&
      url.protocol === "http:" &&
      (url.hostname === "localhost" || url.hostname === "127.0.0.1");

    if (!isLocalDevelopmentUrl) return null;
    return url.toString();
  } catch {
    return null;
  }
}
