export function sanitizeUrl(input) {
  if (!input || typeof input !== "string") return null;

  let value = input.trim();

  if (value.startsWith("http://") || value.startsWith("https://")) {
    try {
      value = new URL(value).hostname;
    } catch {
      return null;
    }
  }

  const isValid =
    /^([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/.test(value) ||
    /^(\d{1,3}\.){3}\d{1,3}$/.test(value);

  if (!isValid) return null;

  return value;
}
