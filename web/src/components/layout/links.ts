/** True for absolute web/mail/phone URLs that should not use client-side routing. */
export function isExternalHref(href: string) {
  return /^(https?:\/\/|mailto:|tel:)/.test(href);
}

/** Converts nullable CMS link data into clean `NavLink`s, dropping incomplete entries. */
export function toNavLinks(
  links:
    | ReadonlyArray<{ label: string | null; href: string | null }>
    | null
    | undefined
): NavLink[] {
  return (links ?? []).flatMap((link) =>
    link.label && link.href
      ? [
          {
            label: link.label,
            href: link.href,
            external: isExternalHref(link.href),
          },
        ]
      : []
  );
}
