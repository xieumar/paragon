import { Container } from "@/components/layout";
import { Button, Heading } from "@/components/ui";
import { ROUTES } from "@/constants";
import Link from "next/link";

export default function NotFound() {
  return (
    <Container className="flex flex-1 flex-col items-start justify-center gap-6 py-24">
      <p className="text-sm font-semibold uppercase tracking-wide text-cta">
        Error 404
      </p>
      <Heading as="h1" size="display">
        Page not found
      </Heading>
      <p className="max-w-md text-lg text-muted-foreground">
        The page you are looking for does not exist or has been moved.
      </p>
      <Button variant="cta" size="xl" asChild>
        <Link href={ROUTES.home}>Back to home</Link>
      </Button>
    </Container>
  );
}
