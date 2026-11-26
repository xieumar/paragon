import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib";

export const headingVariants = cva(
  "font-heading font-bold tracking-tight text-balance",
  {
    variants: {
      size: {
        display: "text-4xl leading-[1.05] sm:text-5xl lg:text-7xl",
        h1: "text-3xl leading-tight sm:text-4xl lg:text-5xl",
        h2: "text-2xl leading-tight sm:text-3xl lg:text-4xl",
        h3: "text-xl leading-snug sm:text-2xl",
      },
    },
    defaultVariants: { size: "h2" },
  }
);

interface HeadingProps
  extends React.ComponentProps<"h2">, VariantProps<typeof headingVariants> {
  /** Semantic level. Visual size is controlled separately by `size`. */
  as?: "h1" | "h2" | "h3" | "h4";
}

export function Heading({
  as: Tag = "h2",
  size,
  className,
  ...props
}: HeadingProps) {
  return (
    <Tag className={cn(headingVariants({ size }), className)} {...props} />
  );
}
