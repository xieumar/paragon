import { ArrowRight } from "lucide-react";
import { SiteLink } from "@/components/layout";
import { Button } from "@/components/ui";

/** Large solid pill button with a circular arrow, used in the hero. */
export function HeroCta({ label, href }: { label: string; href: string }) {
  return (
    <Button variant="cta" size="xl" asChild className="pr-2">
      <SiteLink href={href}>
        {label}
        <span
          aria-hidden
          className="flex size-8 items-center justify-center rounded-full bg-white text-navy"
        >
          <ArrowRight className="size-4" />
        </span>
      </SiteLink>
    </Button>
  );
}
