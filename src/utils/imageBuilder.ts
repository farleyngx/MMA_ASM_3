const IMAGE_BASE = process.env.EXPO_PUBLIC_TMDB_IMAGE_BASE || "https://image.tmdb.org/t/p/w500";
const IMAGE_ORIGINAL = process.env.EXPO_PUBLIC_TMDB_IMAGE_ORIGINAL || "https://image.tmdb.org/t/p/original";

export const getImageUrl = (path: string | null | undefined, original = false): string => {
  if (!path) {
    return "https://via.placeholder.com/500x750.png?text=No+Image";
  }
  // Ensure the path starts with /
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${original ? IMAGE_ORIGINAL : IMAGE_BASE}${cleanPath}`;
};
