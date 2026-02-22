import React from "react";
import * as Lucide from "lucide-react";
import * as Wouter from "wouter";

import { Chip } from "@/components/chip";
import { SearchBar } from "@/components/_pages/home/searchbar";

export function ControlPanel({
  regions,
  tags,
}: {
  regions: readonly string[];
  tags: readonly string[];
}) {
  const [view, setView] = React.useState<"Search" | "Filters">("Filters");

  function scrollToTop() {
    const element = document.getElementById("hero");

    if (element === null) {
      const message = `[control panel | scroll]: element with id "hero" not found`;
      console.warn(message);
      return;
    }

    const height = element.getBoundingClientRect().height;

    window.scrollTo({ behavior: "smooth", top: height - 0.5 });
  }

  function toggleView() {
    setView(view === "Filters" ? "Search" : "Filters");
  }

  return (
    <section
      className="sticky top-0 left-0 z-50 w-full bg-white"
      id="control-panel"
      onClick={() => {
        console.log("[control-panel]: click event");
        scrollToTop();
      }}
    >
      {view === "Filters" ? (
        <>
          <ControlPanelDivider />
          <div className="mx-auto flex h-full max-w-min flex-row gap-2 p-4">
            <button onClick={toggleView}>
              <Chip color="primary" fill="light" size="sm">
                Search
                <Lucide.Search className="size-4" />
              </Chip>
            </button>
            <div className="w-0.5 bg-neutral-100" />
            <Regions regions={regions} />
          </div>
          <ControlPanelDivider />
          <div className="mx-auto flex h-full max-w-min flex-row gap-2 p-4 lg:max-w-240">
            <Tags tags={tags} />
          </div>
          <ControlPanelDivider />
        </>
      ) : (
        <>
          <ControlPanelDivider />
          <div className="mx-auto flex h-full flex-row gap-2 p-4 lg:max-w-200">
            <button onClick={toggleView}>
              <Chip color="primary" fill="light" size="sm">
                Filters
                <Lucide.SlidersHorizontal className="size-4" />
              </Chip>
            </button>
            <div className="w-0.5 bg-neutral-100" />
            <SearchBar />
          </div>
          <ControlPanelDivider />
        </>
      )}
    </section>
  );
}

function ControlPanelDivider() {
  return <div className="h-0.5 bg-neutral-100" />;
}

function Regions({ regions }: { regions: readonly string[] }) {
  const [params, setParams] = Wouter.useSearchParams();

  return (
    <ul className="scrollbar-none flex w-full snap-x snap-mandatory snap-always flex-row gap-2 overflow-x-auto">
      <li className="snap-start">
        <button
          type="button"
          onClick={() => {
            params.delete("region");
            setParams(params, { replace: true });
          }}
        >
          <Chip
            color={params.get("region") === null ? "primary" : "neutral"}
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
                color={params.has("region", region) ? "primary" : "neutral"}
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

  return (
    <ul className="scrollbar-none flex w-full snap-x snap-mandatory snap-always flex-row gap-1 overflow-x-auto lg:flex-wrap lg:justify-center">
      {tags.map((tag) => {
        return (
          <li key={tag} className="snap-start">
            <button
              type="button"
              onClick={() => {
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
                color={params.has("tag", tag) ? "primarybg" : "neutral"}
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
