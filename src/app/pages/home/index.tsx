import * as Wouter from "wouter";
import * as Lucide from "lucide-react";
import Fuse from "fuse.js";
import React from "react";

import { Chip } from "@/components/chip";

import countries from "@/data/countries.json" with { type: "json" };
import { DestinationCard } from "@/components/destination-card";
import type { Country } from "@/types/destination";
import { preferentialSort } from "@/utils/array";

export function Home() {
  const scrollToTop = useScrollToTop();
  const [params, setParams] = Wouter.useSearchParams();

  const allTags: readonly string[] = React.useMemo(() => {
    return [...new Set(countries.flatMap((country) => country.tags))];
  }, [countries]);

  const allRegions: readonly string[] = React.useMemo(() => {
    const regions = [...new Set(countries.map((country) => country.region))];
    const sorted = preferentialSort(
      regions,
      ["Asia", "Europe", "Americas", "Oceania", "Middle East & North Africa"],
      (a, b) => a === b,
    );
    return sorted;
  }, [countries]);

  const filtrate: readonly Country[] = React.useMemo(() => {
    const filterRegion = params.get("region");
    const filterTags = params.getAll("tag");

    const predRegion = (country: Country, region: null | string): boolean => {
      if (region === null) return true;
      return region === country.region;
    };

    const predTags = (country: Country, tags: string[]): boolean => {
      if (tags.length === 0) return true;
      return tags.every((item) => country.tags.includes(item));
    };

    return countries.filter((country) => {
      return predRegion(country, filterRegion) && predTags(country, filterTags);
    });
  }, [countries, params.toString()]);

  const fuse = React.useMemo(() => {
    return new Fuse(filtrate, {
      keys: ["name"],
      threshold: 0.2,
      ignoreLocation: true,
    });
  }, [filtrate]);

  const search = params.get("search");

  const searchResults: readonly Country[] = React.useMemo(() => {
    if (search === null || search === "") {
      return filtrate;
    }

    return fuse.search(search).map((result) => result.item);
  }, [search, filtrate]);

  return (
    <section className="flex min-h-svh flex-col">
      <Hero
        search={params.get("search") ?? ""}
        handleChange={(search) => {
          scrollToTop();
          setParams([["search", search]], { replace: true });
        }}
      />
      <Regions regions={allRegions} />
      <div className="h-px bg-neutral-100" />
      <Tags tags={allTags} />
      <div className="h-px bg-neutral-100" />

      <section
        id="destination-scroll-container"
        className="flex h-0 grow flex-col gap-4 overflow-y-scroll bg-neutral-50/50 p-4"
      >
        <header>
          <h3 className="text-center text-xs font-medium text-neutral-400">
            {searchResults.length === 0
              ? "No matching destinations"
              : searchResults.length === 1
                ? "Showing 1 destination"
                : `Showing ${searchResults.length} destinations`}
          </h3>
        </header>

        <ul className="flex flex-col gap-8">
          {searchResults.map((country) => {
            return (
              <li key={country.id}>
                <DestinationCard destination={country} />
              </li>
            );
          })}
        </ul>
      </section>
    </section>
  );
}

function Hero({
  search,
  handleChange,
}: {
  search: string;
  handleChange: (search: string) => void;
}) {
  return (
    <section className="flex flex-col gap-8 bg-neutral-500 bg-[url(/images/bg-hero.jpg)] bg-cover bg-center px-4 py-6 pt-12 bg-blend-multiply">
      <header className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold text-white">
          Plan your dream retirement
        </h1>
        <p className="text-base text-white">
          Compare destinations worldwide. Connect with local experts. Plan your
          move.
        </p>
      </header>

      <div className="flex flex-row gap-2 rounded-full border-2 border-neutral-200 bg-white px-1 py-1 has-focus:border-neutral-400">
        <input
          placeholder="Enter destination name..."
          className="w-0 grow pl-4 text-base text-neutral-600 outline-none"
          name="search"
          value={search}
          onChange={(event) => {
            handleChange(event.target.value);
          }}
        />
        <button className="flex items-center justify-center gap-2 rounded-full border-1 border-blue-500 bg-blue-500 p-2 px-3">
          <span className="text-sm text-white">Search</span>
          <Lucide.Search className="size-4 text-white" />
        </button>
      </div>
    </section>
  );
}

function Regions({ regions }: { regions: readonly string[] }) {
  const [params, setParams] = Wouter.useSearchParams();
  const scrollToTop = useScrollToTop();

  return (
    <section className="px-4 py-4">
      <ul className="scrollbar-none flex w-full snap-x snap-mandatory snap-always flex-row gap-2 overflow-x-auto">
        <li className="snap-start">
          <button
            type="button"
            onClick={() => {
              scrollToTop();
              params.delete("region");
              setParams(params, { replace: true });
            }}
          >
            <Chip
              color={params.get("region") === null ? "blue" : "neutral"}
              fill={params.get("region") === null ? "dark" : "light"}
              size="sm"
            >
              All
            </Chip>
          </button>
        </li>
        {regions.map((region) => {
          return (
            <li key={region} className="snap-start">
              <button
                type="button"
                onClick={() => {
                  scrollToTop();

                  if (params.has("region", region)) {
                    params.delete("region");
                    setParams(params, { replace: true });
                    return;
                  }

                  params.set("region", region);
                  setParams(params, { replace: true });
                }}
              >
                <Chip
                  color={params.has("region", region) ? "blue" : "neutral"}
                  fill={params.has("region", region) ? "dark" : "light"}
                  size="sm"
                >
                  {region}
                </Chip>
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function Tags({ tags }: { tags: readonly string[] }) {
  const [params, setParams] = Wouter.useSearchParams();
  const scrollToTop = useScrollToTop();

  return (
    <section className="p-4">
      <ul className="scrollbar-none flex w-full snap-x snap-mandatory snap-always flex-row gap-1 overflow-x-auto">
        {tags.map((tag) => {
          return (
            <li key={tag} className="snap-start">
              <button
                type="button"
                onClick={() => {
                  scrollToTop();
                  if (params.has("tag", tag)) {
                    const entries = Array.from(params.entries()).filter(
                      ([key, value]) => {
                        if (key !== "tag") {
                          return true;
                        }

                        return value !== tag;
                      },
                    );

                    setParams(entries, { replace: true });
                    return;
                  }

                  params.append("tag", tag);
                  setParams(params, { replace: true });
                }}
              >
                <Chip
                  color={params.has("tag", tag) ? "blue" : "neutral"}
                  fill={params.has("tag", tag) ? "light" : "light"}
                  size="xs"
                >
                  {tag}
                </Chip>
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function useScrollToTop() {
  const target = React.useRef<HTMLElement | null>(null);

  React.useEffect(() => {
    const element = document.getElementById("destination-scroll-container");

    if (element === null) {
      console.warn("[element not found]:", "destination-scroll-container");
    }

    target.current = element;
  }, []);

  return () => {
    target.current?.scroll({ behavior: "smooth", top: 0 });
  };
}
