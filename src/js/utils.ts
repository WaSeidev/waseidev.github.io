export function getCurrentTime(date: string, lang: string) {
  return new Date(date).toLocaleDateString(lang, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
