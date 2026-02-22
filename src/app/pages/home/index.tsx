import Fuse from "fuse.js";
import * as React from "react";
import * as Wouter from "wouter";

import destinations from "@/data/destinations.json" with { type: "json" };
import type { Destination } from "@/types/destination";

import { preferentialSort } from "@/utils/array";

import { ControlPanel } from "@/components/_pages/home/control-panel";
import { DestinationCardList } from "@/components/destination-card";
import { Hero } from "@/components/_pages/home/hero";

export function Home() {
  const [params] = Wouter.useSearchParams();

  const allTags: readonly string[] = React.useMemo(() => {
    return [
      ...new Set(destinations.flatMap((destination) => destination.tags)),
    ];
  }, [destinations]);

  const allRegions: readonly string[] = React.useMemo(() => {
    const regions = [
      ...new Set(destinations.map((destination) => destination.region)),
    ];
    const sorted = preferentialSort(
      regions,
      ["Asia", "Europe", "Americas", "Oceania", "Middle East & North Africa"],
      (a, b) => a === b,
    );
    return sorted;
  }, [destinations]);

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

  const fuse = React.useMemo(() => {
    return new Fuse(filtrate, {
      keys: ["name"],
      threshold: 0.2,
      ignoreLocation: true,
    });
  }, [filtrate]);

  const search = params.get("search");

  const searchResults: readonly Destination[] = React.useMemo(() => {
    if (search === null || search === "") {
      return filtrate;
    }

    return fuse.search(search).map((result) => result.item);
  }, [search, filtrate]);

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
