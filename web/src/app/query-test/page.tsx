// TEMPORARY: prints query results for manual testing. Do not commit.
import { Suspense } from "react";
import { getHomePage, getServices, getService } from "@/sanity/queries";

async function Results() {
  const [home, services] = await Promise.all([getHomePage(), getServices()]);
  const firstSlug = services[0]?.slug;
  const firstService = firstSlug ? await getService(firstSlug) : null;

  const sections = [
    { title: "getHomePage()", data: home },
    { title: "getServices()", data: services },
    {
      title: firstSlug ? `getService("${firstSlug}")` : "getService(slug)",
      data: firstService ?? "(no services published yet)",
    },
  ];

  return (
    <div className="space-y-8">
      {sections.map(({ title, data }) => (
        <section key={title}>
          <h2 className="mb-2 font-mono text-sm font-bold">{title}</h2>
          <pre className="max-h-96 overflow-auto rounded-lg bg-muted p-4 text-xs">
            {JSON.stringify(data, null, 2)}
          </pre>
        </section>
      ))}
    </div>
  );
}

export default function QueryTestPage() {
  return (
    <div className="mx-auto w-full max-w-4xl p-8">
      <h1 className="mb-6 text-2xl font-bold">Query test</h1>
      <Suspense fallback={<p>Loading…</p>}>
        <Results />
      </Suspense>
    </div>
  );
}
