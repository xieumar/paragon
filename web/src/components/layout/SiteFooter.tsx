import Link from "next/link";
import { DEFAULT_SITE_NAME, ROUTES } from "@/constants";
import type { SiteSettings } from "@/sanity/queries";
import { cn } from "@/lib";
import { Container } from "./Container";
import { slideUnderline } from "./styles";
import { SiteLink } from "./SiteLink";
import { toNavLinks } from "./links";

/**
 * Site footer, driven by "Site settings". Marked `"use cache"` so the
 * copyright year is computed with the cached content, not on every request.
 */
export async function SiteFooter({ settings }: { settings: SiteSettings }) {
  "use cache";

  const siteName = settings?.siteName ?? DEFAULT_SITE_NAME;
  const columns = (settings?.footerColumns ?? []).flatMap((column) =>
    column.title
      ? [
          {
            title: column.title,
            text: column.text,
            links: toNavLinks(column.links),
          },
        ]
      : []
  );
  const legalLinks = toNavLinks(settings?.legalLinks);
  const socials = (settings?.socials ?? []).flatMap((social) =>
    social.platform && social.url
      ? [{ platform: social.platform, url: social.url }]
      : []
  );
  const contact = settings?.contact;
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto bg-navy text-navy-foreground">
      <Container className="py-16">
        <div className="grid gap-12 md:grid-cols-5">
          <div className="md:col-span-2">
            <Link
              href={ROUTES.home}
              className="text-2xl font-bold tracking-tight"
            >
              {siteName}
            </Link>
            {settings?.tagline && (
              <p className="mt-4 max-w-xs text-navy-foreground/70">
                {settings.tagline}
              </p>
            )}
            {contact && (contact.email || contact.phone || contact.address) && (
              <address className="mt-6 space-y-1 text-sm not-italic text-navy-foreground/70">
                {contact.email && (
                  <p>
                    <a
                      href={`mailto:${contact.email}`}
                      className="hover:text-white"
                    >
                      {contact.email}
                    </a>
                  </p>
                )}
                {contact.phone && (
                  <p>
                    <a
                      href={`tel:${contact.phone.replace(/\s+/g, "")}`}
                      className="hover:text-white"
                    >
                      {contact.phone}
                    </a>
                  </p>
                )}
                {contact.address && (
                  <p className="whitespace-pre-line">{contact.address}</p>
                )}
              </address>
            )}
          </div>

          <div className="grid gap-10 sm:grid-cols-2 md:col-span-3 md:grid-cols-[repeat(auto-fit,minmax(9rem,1fr))]">
            {columns.map((column) => (
              <nav key={column.title} aria-label={column.title}>
                <h2 className="text-sm font-semibold uppercase tracking-wide text-white">
                  {column.title}
                </h2>
                {column.text && (
                  <p className="mt-4 whitespace-pre-line text-navy-foreground/70">
                    {column.text}
                  </p>
                )}
                <ul className="mt-4 space-y-3">
                  {column.links.map((link) => (
                    <li key={link.href + link.label}>
                      <SiteLink
                        href={link.href}
                        className={cn(
                          "inline-block py-0.5 text-navy-foreground/70 transition-colors hover:text-white",
                          slideUnderline
                        )}
                      >
                        {link.label}
                      </SiteLink>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/15 pt-8 text-sm text-navy-foreground/70 md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {siteName}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {legalLinks.map((link) => (
              <SiteLink
                key={link.href + link.label}
                href={link.href}
                className="hover:text-white"
              >
                {link.label}
              </SiteLink>
            ))}
            {socials.map((social) => (
              <a
                key={social.url}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                {social.platform}
              </a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
