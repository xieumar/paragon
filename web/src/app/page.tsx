// TEMPORARY design-system showcase. PR 2 replaces this with the real home page.
// Do not commit.
import { ArrowRight } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Heading,
  Separator,
  Skeleton,
} from "@/components/ui";

const swatches = [
  { name: "navy", className: "bg-navy" },
  { name: "cta", className: "bg-cta" },
  { name: "primary", className: "bg-primary" },
  { name: "secondary", className: "bg-secondary" },
  { name: "muted", className: "bg-muted" },
  { name: "border", className: "bg-border" },
];

export default function Home() {
  return (
    <div className="mx-auto w-full max-w-5xl space-y-16 px-6 py-16">
      <section className="rounded-3xl bg-navy p-10 text-navy-foreground sm:p-16">
        <Badge variant="secondary">On demand live support</Badge>
        <Heading as="h1" size="display" className="mt-6">
          Delivering creative digital products
        </Heading>
        <p className="mt-6 max-w-xl text-lg text-navy-foreground/70">
          We&apos;re a fully dedicated corporate service agency collaborating
          with brands all over the world.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Button variant="cta" size="xl">
            Get started now
            <span className="flex size-8 items-center justify-center rounded-full bg-white text-navy">
              <ArrowRight className="size-4" />
            </span>
          </Button>
          <Button
            variant="outline"
            size="xl"
            className="border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white"
          >
            Send a message
          </Button>
        </div>
      </section>

      <Reveal>
        <Heading size="h2">Colour tokens</Heading>
        <div className="mt-6 grid grid-cols-3 gap-4 sm:grid-cols-6">
          {swatches.map((s) => (
            <div key={s.name}>
              <div className={`h-16 rounded-xl border ${s.className}`} />
              <p className="mt-2 text-xs text-muted-foreground">{s.name}</p>
            </div>
          ))}
        </div>
      </Reveal>

      <section>
        <Heading size="h2">Type scale</Heading>
        <div className="mt-6 space-y-4">
          <Heading as="h2" size="display">
            Display heading
          </Heading>
          <Heading as="h2" size="h1">
            Heading one
          </Heading>
          <Heading as="h3" size="h2">
            Heading two
          </Heading>
          <Heading as="h4" size="h3">
            Heading three
          </Heading>
          <p className="text-muted-foreground">
            Body copy in muted foreground. Plus Jakarta Sans across the site.
          </p>
        </div>
      </section>

      <section>
        <Heading size="h2">Buttons</Heading>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Button>Default</Button>
          <Button variant="cta">CTA</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
          <Button size="lg" variant="cta">
            Large CTA
          </Button>
        </div>
      </section>

      <section>
        <Heading size="h2">Cards (staggered reveal)</Heading>
        <Stagger className="mt-6 grid gap-4 sm:grid-cols-3">
          {["Strategy", "Design", "Delivery"].map((title) => (
            <StaggerItem key={title}>
              <Card>
                <CardHeader>
                  <CardTitle>{title}</CardTitle>
                  <CardDescription>
                    Short supporting description for this service.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Badge>Featured</Badge>
                </CardContent>
              </Card>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <Separator />

      <section className="space-y-3">
        <Heading size="h3">Skeleton loading</Heading>
        <Skeleton className="h-6 w-2/3" />
        <Skeleton className="h-6 w-1/2" />
      </section>
    </div>
  );
}
