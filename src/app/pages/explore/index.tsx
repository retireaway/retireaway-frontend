import * as React from "react";
import * as Wouter from "wouter";
import * as Lucide from "lucide-react";

import destinations from "@/data/destinations.json" with { type: "json" };
import type { Destination } from "@/types/destination";

import { DestinationCardList } from "@/components/destination-card";

import { search } from "@/utils/destination";

import { useFilters } from "@/hooks/filters";
import { predicates } from "@/utils/filters";
import { Searchbar } from "@/components/searchbar";
import { Filters } from "@/components/_pages/explore/filters";
import { Chip } from "@/components/chip";
import { FilterChips } from "@/components/filters/filter-chips";
import { FilterModal } from "@/components/filters/modal";
import { Navbar } from "@/components/navbar";

export function Explore() {
  const [params] = Wouter.useSearchParams();

  const [filters] = useFilters();

  const filtersCount = Object.values(filters).reduce((p, v) => {
    if (v === null) {
      return p;
    }

    if (Array.isArray(v)) {
      return p + v.length;
    }

    return p + 1;
  }, 0);

  const filtrate: readonly Destination[] = React.useMemo(() => {
    return destinations.filter((destination) => {
      return (
        predicates.budget(destination, filters.budget) &&
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

      <Navbar />

      <section className="mt-8 flex flex-col items-start justify-center p-6 lg:mt-0 lg:hidden lg:h-full lg:p-6 lg:text-left">
        <header className="w-full">
          <h1 className="mb-4 text-5xl font-extrabold tracking-tight text-neutral-900 md:text-5xl lg:text-6xl">
            Explore
            <br />
            <span className="text-primary">Destinations</span>
          </h1>

          <p className="mb-8 text-base leading-relaxed font-medium text-neutral-500 md:text-lg lg:mb-6">
            We've analyzed your lifestyle preferences to find the best
            destinations for your next chapter.{" "}
            <span className="lg:inline">
              Discover places that align with your budget, climate, and
              community needs.
            </span>
          </p>

          <div className="flex flex-row gap-1 p-0">
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
        </header>
      </section>

      <section className="flex w-full flex-col gap-0 bg-white lg:hidden">
        {/* <div className="h-16 bg-primary"></div> */}

        {0 < filtersCount && (
          <div className="border-b-0 border-neutral-100 bg-white px-4 py-2">
            {/* <FilterChips /> */}
          </div>
        )}
      </section>

      <div className="grid grid-cols-1 gap-4 p-4 lg:grid-cols-[300px_auto]">
        <section className="hidden flex-col gap-2 lg:flex">
          <Searchbar />

          <div className="flex h-min flex-col gap-8 rounded-xl border border-neutral-200 bg-white p-4">
            <Filters />
          </div>
        </section>

        <section className="flex min-h-240 flex-col gap-4 rounded-xl">
          <div className="hidden flex-col gap-4 lg:flex">
            <header>
              <h1 className="mb-4 text-5xl font-extrabold tracking-tight text-neutral-900">
                Explore <br />{" "}
                <span className="text-primary">Destinations</span>
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
