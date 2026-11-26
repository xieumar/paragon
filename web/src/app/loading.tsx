/**
 * Shown inside the page area (header and footer stay visible) while a page is
 * fetching its content: three bouncing navy dots. Uses Tailwind's built-in
 * bounce; under "reduce motion" the dots stay still.
 */
export default function Loading() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex flex-1 items-center justify-center py-32"
    >
      <div aria-hidden className="flex items-center gap-2">
        <span className="size-3 rounded-full bg-navy motion-safe:animate-bounce motion-safe:[animation-delay:-0.3s]" />
        <span className="size-3 rounded-full bg-navy motion-safe:animate-bounce motion-safe:[animation-delay:-0.15s]" />
        <span className="size-3 rounded-full bg-navy motion-safe:animate-bounce" />
      </div>
      <span className="sr-only">Loading…</span>
    </div>
  );
}
