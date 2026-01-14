import { DestinationCard, List } from "@/components/destination-list";

import json from "@/data/destinations.json" with { type: "json" };
import { parse } from "@/schemas/destination";
import { PlaneTakeoffIcon } from "lucide-react";

export function App() {
  const destinations = json.map(parse);
  return (
    <section className="flex flex-col gap-4 pb-4">
      <div className="relative h-90 bg-[url(/images/bg-hero.jpg)] bg-cover bg-center">
        <div className="absolute top-0 left-0 size-full bg-black/40"></div>

        <div className="z-10 flex size-full items-center justify-center">
          <header className="z-10 flex flex-col items-center justify-center">
            <PlaneTakeoffIcon className="size-10 text-white" />
            <div className="h-2" />
            <h1 className="text-center text-3xl font-semibold text-white">
              Plan the Perfect <br />
              Retirement
            </h1>
            <div className="h-4" />
            <p className="text-lg text-white">Compare destinations worldwide</p>
          </header>
        </div>
      </div>
      <div className="mx-auto flex min-h-svh max-w-160 flex-col gap-8 bg-neutral-50/50 px-4">
        <List>
          {destinations.map((d) => {
            return (
              <List.Item key={d.id}>
                <DestinationCard destination={d} />
              </List.Item>
            );
          })}
        </List>
      </div>
    </section>
  );
}
