export default function sanitizeStr(str: string) {
  return !str || typeof str !== "string" ? "" : str.trim().normalize();
}
