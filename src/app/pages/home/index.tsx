import * as React from "react";
import * as Wouter from "wouter";

import destinations from "@/data/destinations.json" with { type: "json" };
import type { Destination } from "@/types/destination";

import { DestinationCardList } from "@/components/destination-card";
import { Hero } from "@/components/_pages/home/hero";
import {
  getClimates,
  getEnglishUsageRatings,
  getRegions,
  getTags,
  getTaxRatings,
  getVisaRatings,
  search,
} from "@/utils/destination";

import { useFilters } from "@/hooks/filters";
import { predicates, ranges } from "@/utils/filters";
import { Searchbar } from "@/components/searchbar";
import { Filters } from "@/components/_pages/home/filters";

export function Home() {
  const [params] = Wouter.useSearchParams();

  const dataset = React.useMemo(() => {
    return {
      tags: getTags(destinations),
      regions: getRegions(destinations),
      climates: getClimates(destinations),
      visa: getVisaRatings(destinations),
      tax: getTaxRatings(destinations),
      english: getEnglishUsageRatings(destinations),
      single: Object.keys(ranges.single),
      couple: Object.keys(ranges.couple),
    };
  }, [destinations]);

  const filters = useFilters();

  const filtrate: readonly Destination[] = React.useMemo(() => {
    return destinations.filter((destination) => {
      return (
        predicates.single(
          destination,
          ranges.single[filters.single ?? "default"],
        ) &&
        predicates.couple(
          destination,
          ranges.couple[filters.couple ?? "default"],
        ) &&
        predicates.affordability(destination, filters.affordability) &&
        predicates.climate(destination, filters.climate) &&
        predicates.english(destination, filters.english) &&
        predicates.healthcare(destination, filters.healthcare) &&
        predicates.infrastructure(destination, filters.infrastructure) &&
        predicates.region(destination, filters.region) &&
        predicates.safety(destination, filters.safety) &&
        predicates.tags(destination, filters.tags) &&
        predicates.tax(destination, filters.tax) &&
        predicates.visa(destination, filters.visa)
      );
    });
  }, [destinations, filters]);

  const searchValue = params.get("search");

  const searchResults = React.useMemo(
    () => search(filtrate, searchValue ?? ""),
    [searchValue, filtrate],
  );

  return (
    <section className="flex min-h-svh flex-col">
      <Hero />
      <div className="grid grid-cols-1 gap-4 p-4 lg:grid-cols-[300px_auto]">
        <section className="hidden flex-col gap-2 lg:flex">
          <Searchbar />
          <Filters {...dataset} />
        </section>

        <section className="flex min-h-240 flex-col gap-4 rounded-xl">
          <DestinationCardList destinations={searchResults} />
        </section>
      </div>
    </section>
  );
}
