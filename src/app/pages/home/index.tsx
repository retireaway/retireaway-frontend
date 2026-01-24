import * as Wouter from "wouter";
import * as Lucide from "lucide-react";
import Fuse from "fuse.js";
import React from "react";

import { Chip } from "@/components/chip";

import countries from "@/data/countries.json" with { type: "json" };
import { DestinationCardList } from "@/components/destination-card";
import type { Country } from "@/types/destination";
import { preferentialSort } from "@/utils/array";

export function Home() {
  const [params] = Wouter.useSearchParams();

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
      <Hero />

      <ControlPanel tags={allTags} regions={allRegions} />

      <section className="flex min-h-200 flex-col gap-4 bg-neutral-50/50 p-4">
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

function Hero() {
  return (
    <section className="flex flex-col gap-8 px-4 py-6 pt-12">
      <header className="flex flex-col gap-2">
        <h1 className="text-center text-2xl font-semibold text-neutral-700">
          Plan your dream retirement
        </h1>
        <p className="text-center text-base text-neutral-500">
          Compare destinations worldwide. Connect with local experts. Plan your
          move.
        </p>
      </header>
    </section>
  );
}

function useScrollControlPanelToTop() {
  return () => {
    window.scrollTo({ behavior: "smooth", top: 160 });
  };
}

function ControlPanel({
  regions,
  tags,
}: {
  regions: readonly string[];
  tags: readonly string[];
}) {
  return (
    <section
      className="sticky top-0 left-0 z-50 w-full bg-white"
      id="control-panel"
    >
      <ControlPanelDivider />
      <div className="flex h-full flex-row gap-2 p-4">
        <button onClick={() => {}}>
          <Chip color="blue" fill="light" size="sm">
            Search
            <Lucide.Search className="size-4" />
          </Chip>
        </button>
        <div className="w-0.5 bg-neutral-100" />
        <Regions regions={regions} />
      </div>
      <ControlPanelDivider />
      <div className="flex h-full flex-row gap-2 p-4">
        <Tags tags={tags} />
      </div>
      <ControlPanelDivider />
    </section>
  );
}

function ControlPanelDivider() {
  return <div className="h-0.5 bg-neutral-100" />;
}

function Regions({ regions }: { regions: readonly string[] }) {
  const [params, setParams] = Wouter.useSearchParams();
  const scrollToTop = useScrollControlPanelToTop();

  return (
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
  );
}

function Tags({ tags }: { tags: readonly string[] }) {
  const [params, setParams] = Wouter.useSearchParams();
  const scrollToTop = useScrollControlPanelToTop();

  return (
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
  );
}
