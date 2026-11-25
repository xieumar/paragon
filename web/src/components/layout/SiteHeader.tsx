import Link from "next/link";
import { Button, SanityImage } from "@/components/ui";
import { DEFAULT_SITE_NAME, ROUTES } from "@/constants";
import type { SiteSettings } from "@/sanity/queries";
import { MobileNav } from "./MobileNav";
import { NavLinks } from "./NavLinks";
import { SiteLink } from "./SiteLink";
import { isExternalHref, toNavLinks } from "./links";

/** Sticky site header, driven by the "Site settings" document in Sanity. */
export function SiteHeader({ settings }: { settings: SiteSettings }) {
  const siteName = settings?.siteName ?? DEFAULT_SITE_NAME;
  const links = toNavLinks(settings?.navigation);
  const cta: Cta | null =
    settings?.headerCta?.label && settings.headerCta.href
      ? {
          label: settings.headerCta.label,
          href: settings.headerCta.href,
          external: isExternalHref(settings.headerCta.href),
        }
      : null;
  const logo = settings?.logo;
  const hasLogo = Boolean(logo?.asset && logo.width && logo.height);

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between gap-6 px-6 lg:px-8">
        <Link
          href={ROUTES.home}
          className="flex shrink-0 items-center text-2xl font-bold tracking-tight"
          aria-label={`${siteName} home`}
        >
          {hasLogo ? (
            <SanityImage
              image={logo as SanityImage}
              alt=""
              sizes="160px"
              priority
              className="h-9 w-auto"
            />
          ) : (
            siteName
          )}
        </Link>

        <nav aria-label="Main" className="hidden md:block">
          <NavLinks links={links} />
        </nav>

        <div className="flex items-center gap-2">
          {cta && (
            <Button
              variant="outline"
              size="lg"
              asChild
              className="hidden h-10 px-4 transition-colors hover:border-cta hover:bg-cta hover:text-cta-foreground md:inline-flex"
            >
              <SiteLink href={cta.href}>{cta.label}</SiteLink>
            </Button>
          )}
          <MobileNav links={links} cta={cta} siteName={siteName} />
        </div>
      </div>
    </header>
  );
}
