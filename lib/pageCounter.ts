// lib/pageCounter.ts
export function incrementPageCounter(pageId: string) {
  if (typeof window === "undefined") return 0;

  const sessionKey = `page_${pageId}_visited`;
  if (sessionStorage.getItem(sessionKey)) {
    return parseInt(localStorage.getItem(`page_${pageId}_count`) || "0");
  }

  sessionStorage.setItem(sessionKey, "true");
  const currentCount = parseInt(
    localStorage.getItem(`page_${pageId}_count`) || "0"
  );
  const newCount = currentCount + 1;
  localStorage.setItem(`page_${pageId}_count`, newCount.toString());
  return newCount;
}
