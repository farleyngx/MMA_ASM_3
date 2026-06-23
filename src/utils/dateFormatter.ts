export const getReleaseYear = (dateString: string | null | undefined): string => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    // Attempt parsing by splitting if format is YYYY-MM-DD
    const yearMatch = dateString.match(/^(\d{4})/);
    return yearMatch ? yearMatch[1] : "N/A";
  }
  return date.getFullYear().toString();
};

export const formatDate = (dateString: string | null | undefined): string => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;
  return date.toLocaleDateString("vi-VN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
};
