import { cn } from "@/lib";

/** A vertically padded page section. Use `Container` inside for width. */
export function Section({
  className,
  ...props
}: React.ComponentProps<"section">) {
  return <section className={cn("py-16 sm:py-24", className)} {...props} />;
}
