"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SiteLink } from "./SiteLink";

/** Slide-in navigation for small screens (focus-trapped, closes on Escape). */
export function MobileNav({
  links,
  cta,
  siteName,
}: {
  links: NavLink[];
  cta?: Cta | null;
  siteName: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon-lg"
          className="md:hidden"
          aria-label="Open menu"
        >
          <Menu className="size-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full max-w-sm">
        <SheetHeader>
          <SheetTitle>{siteName}</SheetTitle>
          <SheetDescription className="sr-only">
            Site navigation
          </SheetDescription>
        </SheetHeader>
        <nav aria-label="Mobile" className="px-4">
          <ul className="space-y-1">
            {links.map((link) => (
              <li key={link.href + link.label}>
                <SheetClose asChild>
                  <SiteLink
                    href={link.href}
                    className="block rounded-lg px-3 py-3 text-lg font-medium hover:bg-muted"
                  >
                    {link.label}
                  </SiteLink>
                </SheetClose>
              </li>
            ))}
          </ul>
          {cta && (
            <Button variant="cta" size="xl" asChild className="mt-6 w-full">
              <SiteLink href={cta.href} onClick={() => setOpen(false)}>
                {cta.label}
              </SiteLink>
            </Button>
          )}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
