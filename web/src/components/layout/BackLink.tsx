import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Container } from "./Container";

/** "Back to ..." link shown above the header of a detail page. */
export function BackLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Container className="pt-8 sm:pt-10">
      <Link
        href={href}
        className="group inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-cta focus-visible:text-cta"
      >
        <span
          aria-hidden
          className="flex size-8 items-center justify-center rounded-full border border-border transition-colors group-hover:border-cta group-hover:bg-cta group-hover:text-cta-foreground"
        >
          <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" />
        </span>
        {children}
      </Link>
    </Container>
  );
}
