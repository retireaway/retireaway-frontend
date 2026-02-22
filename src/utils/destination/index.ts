import Fuse from "fuse.js";

import type { Destination } from "@/types/destination";
import { preferentialSort } from "@/utils/array";

export function getTags(
  destinations: readonly Destination[],
): readonly string[] {
  const tags = destinations.flatMap((d) => d.tags);
  return [...new Set(tags)];
}

export function getRegions(
  destinations: readonly Destination[],
): readonly string[] {
  const region = destinations.map((d) => d.region);
  const unique = [...new Set(region)];
  const sorted = preferentialSort(
    unique,
    ["Asia", "Europe", "Americas", "Oceania", "Middle East & North Africa"],
    (a, b) => a === b,
  );
  return sorted;
}

export function search(
  destinations: readonly Destination[],
  search: string,
): readonly Destination[] {
  if (search === "") {
    return destinations;
  }

  const fuse = new Fuse(destinations, {
    keys: ["name"],
    threshold: 0.2,
    ignoreLocation: true,
  });

  return fuse.search(search).map((result) => result.item);
}
