import Link from "next/link";
import { isExternalHref } from "./links";

type SiteLinkProps = Omit<React.ComponentProps<"a">, "href"> & { href: string };

/** Internal links use Next.js routing; external ones open safely in a new tab. */
export function SiteLink({ href, children, ...props }: SiteLinkProps) {
  if (isExternalHref(href)) {
    const isWeb = href.startsWith("http");
    return (
      <a
        href={href}
        {...(isWeb ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...props}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} {...props}>
      {children}
    </Link>
  );
}
