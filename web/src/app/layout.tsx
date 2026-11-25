import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { SiteFooter, SiteHeader } from "@/components/layout";
import { MotionProvider } from "@/components/motion";
import { SITE_URL } from "@/constants";
import { SanityLive } from "@/sanity/lib/live";
import { getSiteSettings } from "@/sanity/queries";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Paragon",
  description: "Paragon corporate website",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  // Fetched once here and passed down: a "use cache" component must not
  // call another cached function, and header + footer both need it.
  const settings = await getSiteSettings();

  return (
    <html lang="en" className={`${jakarta.variable} h-full`}>
      <body className="min-h-full flex flex-col">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-cta focus:px-4 focus:py-2 focus:text-cta-foreground"
        >
          Skip to content
        </a>
        <MotionProvider>
          <SiteHeader settings={settings} />
          <main id="main-content" className="flex flex-1 flex-col">
            {children}
          </main>
          <SiteFooter settings={settings} />
        </MotionProvider>
        <SanityLive />
      </body>
    </html>
  );
}
