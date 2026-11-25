import { cn } from "@/lib";

/** Centres content and applies the site's horizontal padding. */
export function Container({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("mx-auto w-full max-w-7xl px-6 lg:px-8", className)}
      {...props}
    />
  );
}
