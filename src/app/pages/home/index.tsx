import * as React from "react";
import * as Wouter from "wouter";

import destinations from "@/data/destinations.json" with { type: "json" };
import type { Destination } from "@/types/destination";

import { ControlPanel } from "@/components/_pages/home/control-panel";
import { DestinationCardList } from "@/components/destination-card";
import { Hero } from "@/components/_pages/home/hero";
import { getRegions, getTags, search } from "@/utils/destination";

export function Home() {
  const [params] = Wouter.useSearchParams();

  const allTags = React.useMemo(() => getTags(destinations), [destinations]);

  const allRegions = React.useMemo(
    () => getRegions(destinations),
    [destinations],
  );

  const filtrate: readonly Destination[] = React.useMemo(() => {
    const filterRegion = params.get("region");
    const filterTags = params.getAll("tag");

    const predRegion = (
      destination: Destination,
      region: null | string,
    ): boolean => {
      if (region === null) return true;
      return region === destination.region;
    };

    const predTags = (destination: Destination, tags: string[]): boolean => {
      if (tags.length === 0) return true;
      return tags.every((item) => destination.tags.includes(item));
    };

    return destinations.filter((destination) => {
      return (
        predRegion(destination, filterRegion) &&
        predTags(destination, filterTags)
      );
    });
  }, [destinations, params.toString()]);

  const searchValue = params.get("search");

  const searchResults = React.useMemo(
    () => search(filtrate, searchValue ?? ""),
    [searchValue, filtrate],
  );

  return (
    <section className="flex min-h-svh flex-col">
      <Hero />

      <ControlPanel tags={allTags} regions={allRegions} />

      <section className="flex min-h-240 flex-col gap-4 bg-neutral-50/50 p-4">
        <header>
          <h3 className="text-center text-xs font-medium text-neutral-400">
            {searchResults.length === 0
              ? "No matching destinations"
              : searchResults.length === 1
                ? "Showing 1 destination"
                : `Showing ${searchResults.length} destinations`}
          </h3>
        </header>

        <DestinationCardList destinations={searchResults} />
      </section>
    </section>
  );
}
