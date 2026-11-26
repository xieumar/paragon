import { Mail, MapPin, Phone } from "lucide-react";

export interface ContactDetailsData {
  email: string | null;
  phone: string | null;
  address: string | null;
}

interface ContactDetailsProps {
  contact: ContactDetailsData | null | undefined;
  socials?: ReadonlyArray<{
    platform: string | null;
    url: string | null;
  }> | null;
}

/** Office details panel (from Site settings), shown beside the enquiry form. */
export function ContactDetails({ contact, socials }: ContactDetailsProps) {
  const links = (socials ?? []).filter((s) => s.platform && s.url);
  if (!contact?.email && !contact?.phone && !contact?.address && !links.length)
    return null;

  const item =
    "flex items-start gap-4 text-navy-foreground/80 transition-colors hover:text-white";
  const icon =
    "flex size-11 shrink-0 items-center justify-center rounded-full bg-white/10 text-white";

  return (
    <aside
      aria-label="Contact details"
      className="rounded-3xl bg-navy p-8 text-navy-foreground sm:p-10"
    >
      <h2 className="text-2xl font-bold tracking-tight">Get in touch</h2>

      <ul className="mt-8 space-y-6">
        {contact?.email && (
          <li>
            <a href={`mailto:${contact.email}`} className={item}>
              <span aria-hidden className={icon}>
                <Mail className="size-5" />
              </span>
              <span>
                <span className="block text-xs uppercase tracking-wide text-navy-foreground/60">
                  Email
                </span>
                {contact.email}
              </span>
            </a>
          </li>
        )}
        {contact?.phone && (
          <li>
            <a
              href={`tel:${contact.phone.replace(/\s+/g, "")}`}
              className={item}
            >
              <span aria-hidden className={icon}>
                <Phone className="size-5" />
              </span>
              <span>
                <span className="block text-xs uppercase tracking-wide text-navy-foreground/60">
                  Phone
                </span>
                {contact.phone}
              </span>
            </a>
          </li>
        )}
        {contact?.address && (
          <li className="flex items-start gap-4 text-navy-foreground/80">
            <span aria-hidden className={icon}>
              <MapPin className="size-5" />
            </span>
            <span>
              <span className="block text-xs uppercase tracking-wide text-navy-foreground/60">
                Office
              </span>
              <span className="whitespace-pre-line">{contact.address}</span>
            </span>
          </li>
        )}
      </ul>

      {links.length > 0 && (
        <div className="mt-10 border-t border-white/15 pt-6">
          <p className="text-xs uppercase tracking-wide text-navy-foreground/60">
            Follow us
          </p>
          <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
            {links.map((social) => (
              <li key={social.url}>
                <a
                  href={social.url!}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-navy-foreground/80 underline-offset-4 hover:text-white hover:underline"
                >
                  {social.platform}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </aside>
  );
}
