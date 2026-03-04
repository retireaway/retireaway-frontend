import * as React from "react";
import * as Wouter from "wouter";
import * as Lucide from "lucide-react";

import destinations from "@/data/destinations.json" with { type: "json" };
import type { Destination } from "@/types/destination";

import { DestinationCardList } from "@/components/destination-card";
import { Hero } from "@/components/_pages/home/hero";
import { search } from "@/utils/destination";

import { useFilters } from "@/hooks/filters";
import { predicates, ranges } from "@/utils/filters";
import { Searchbar } from "@/components/searchbar";
import { Filters } from "@/components/_pages/home/filters";
import { Chip } from "@/components/chip";
import { FilterChips } from "@/components/filters/filter-chips";
import { FilterModal } from "@/components/filters/modal";

export function Index() {
  const [params] = Wouter.useSearchParams();

  const [filters] = useFilters();

  const filtersCount = Object.values(filters).reduce((p, v) => {
    if (v === null) {
      return p;
    }

    if (typeof v === "string") {
      return p + 1;
    }

    return p + v.length;
  }, 0);

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

  const [filterModal, setFilterModal] = React.useState(false);

  return (
    <section
      className={`relative flex min-h-svh flex-col ${filterModal && "h-svh overflow-y-hidden"}`}
    >
      {filterModal && <FilterModal handleClose={() => setFilterModal(false)} />}

      <Hero />

      <section className="sticky top-0 left-0 z-10 flex w-full flex-col gap-0 bg-white lg:hidden">
        <div className="flex flex-row gap-1 border-b-1 border-neutral-100 bg-neutral-50 p-4">
          <div
            className="contents"
            onClick={() => {
              const element = document.getElementById("hero");

              if (element === null) {
                const message = `[control panel | scroll]: element with id "hero" not found`;
                console.warn(message);
                return;
              }

              const height = element.getBoundingClientRect().height;

              window.scrollTo({ behavior: "smooth", top: height - 0.5 });
            }}
          >
            <Searchbar />
          </div>

          <button
            onClick={() => {
              setFilterModal(true);
            }}
            className="contents"
          >
            <Chip
              color={0 < filtersCount ? "accent" : "primary"}
              fill="dark"
              size="sm"
            >
              Filters{" "}
              {0 < filtersCount ? (
                <span className="mt-0.5 text-xs font-medium">
                  {filtersCount}
                </span>
              ) : (
                <Lucide.SlidersHorizontal className="size-4" />
              )}
            </Chip>
          </button>
        </div>

        {0 < filtersCount && (
          <div className="border-b-1 border-neutral-100 bg-white px-4 py-2">
            <FilterChips />
          </div>
        )}
      </section>

      <div className="grid grid-cols-1 gap-4 p-4 lg:grid-cols-[300px_auto]">
        <section className="hidden flex-col gap-2 lg:flex">
          <Searchbar />

          <div className="flex h-min flex-col gap-8 rounded-xl border-1 border-neutral-200 bg-white p-4">
            <Filters />
          </div>
        </section>

        <section className="flex min-h-240 flex-col gap-4 rounded-xl">
          <div className="hidden flex-col gap-4 lg:flex">
            <header>
              <h1 className="text-2xl font-semibold text-neutral-600">
                Destinations
              </h1>
              <p className="text-left text-sm font-medium text-neutral-500">
                Showing {filtrate.length} destinations
              </p>
            </header>
            {0 < filtersCount && <FilterChips />}
          </div>

          <div className="lg:hidden">
            <p className="text-center text-sm font-medium text-neutral-500">
              Showing {filtrate.length} destinations
            </p>
          </div>

          <DestinationCardList destinations={searchResults} />
        </section>
      </div>
    </section>
  );
}
