export const SITE_PATH_PREFIX = process.env.NEXT_PUBLIC_SITE_PATH_PREFIX ?? "";

export function sitePath(path = "/") {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_PATH_PREFIX}${normalized}`;
}
