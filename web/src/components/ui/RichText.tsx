import Link from "next/link";
import { PortableText, type PortableTextComponents } from "next-sanity";
import { cn } from "@/lib";
import { SanityImage } from "./SanityImage";

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="leading-7">{children}</p>,
    h2: ({ children }) => (
      <h2 className="mt-10 text-2xl font-bold tracking-tight sm:text-3xl">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-8 text-xl font-bold tracking-tight sm:text-2xl">
        {children}
      </h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-cta pl-4 text-lg italic">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc space-y-2 pl-6">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal space-y-2 pl-6">{children}</ol>
    ),
  },
  marks: {
    link: ({ value, children }) => {
      const href: string = value?.href ?? "#";
      const external = /^https?:\/\//.test(href);
      return external ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-4 hover:text-cta"
        >
          {children}
        </a>
      ) : (
        <Link
          href={href}
          className="underline underline-offset-4 hover:text-cta"
        >
          {children}
        </Link>
      );
    },
  },
  types: {
    imageWithAlt: ({ value }) => (
      <figure className="my-8">
        <SanityImage
          image={value}
          sizes="(min-width: 768px) 720px, 100vw"
          className="h-auto w-full rounded-2xl"
        />
      </figure>
    ),
  },
};

/** Renders Portable Text with the site's typography. */
export function RichText({
  value,
  className,
}: {
  value: React.ComponentProps<typeof PortableText>["value"];
  className?: string;
}) {
  return (
    <div className={cn("space-y-5", className)}>
      <PortableText value={value} components={components} />
    </div>
  );
}
