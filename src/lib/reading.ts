export function getReadingTime(body: string, wpm = 200): { minutes: number; label: string } {
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / wpm));
  return { minutes, label: `${minutes} min read` };
}
