"use client";

import { usePathname } from "next/navigation";
import { cn } from "@/lib";
import { SiteLink } from "./SiteLink";
import { slideUnderline } from "./styles";

/** Desktop navigation. Marks the current page for sighted and assistive users. */
export function NavLinks({
  links,
  className,
}: {
  links: NavLink[];
  className?: string;
}) {
  const pathname = usePathname();

  return (
    <ul className={cn("flex items-center gap-8", className)}>
      {links.map((link) => {
        const active =
          !link.external &&
          (link.href === "/"
            ? pathname === "/"
            : pathname === link.href || pathname.startsWith(`${link.href}/`));
        return (
          <li key={link.href + link.label}>
            <SiteLink
              href={link.href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "py-1 text-[15px] font-medium transition-colors hover:text-cta",
                slideUnderline,
                active ? "text-muted-foreground" : "text-foreground"
              )}
            >
              {link.label}
            </SiteLink>
          </li>
        );
      })}
    </ul>
  );
}
