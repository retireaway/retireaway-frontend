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
  const regions = destinations.map((d) => d.region);
  const unique = [...new Set(regions)];
  const sorted = preferentialSort(
    unique,
    ["Asia", "Europe", "Americas", "Oceania", "Middle East & North Africa"],
    (a, b) => a === b,
  );
  return sorted;
}

export function getClimates(
  destinations: readonly Destination[],
): readonly string[] {
  const climates = destinations.map((d) => d.climate);
  return [...new Set(climates)];
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

export function getVisaRatings(destinations: readonly Destination[]) {
  const items = destinations.map((d) => d.ratings.visaEase.label);
  const unique = [...new Set(items)];
  return unique;
}

export function getTaxRatings(destinations: readonly Destination[]) {
  const items = destinations.map((d) => d.ratings.taxEnvironment.label);
  const unique = [...new Set(items)];
  return unique;
}

export function getEnglishUsageRatings(destinations: readonly Destination[]) {
  const items = destinations.map((d) => d.englishUsage);
  const unique = [...new Set(items)];
  return unique;
}

export function getWeatherComfortRatings(destinations: readonly Destination[]) {
  const items = destinations.map((d) => d.ratings.weatherComfort);
  const unique = [...new Set(items)];
  return unique;
}

export function getHealthcareRatings(destinations: readonly Destination[]) {
  const items = destinations.map((d) => d.ratings.healthcareQuality.label);
  const unique = [...new Set(items)];
  return unique;
}

export function getSafetyRatings(destinations: readonly Destination[]) {
  const items = destinations.map((d) => d.ratings.personalSafety.label);
  const unique = [...new Set(items)];
  return unique;
}

export function getAffordabilityRatings(destinations: readonly Destination[]) {
  const items = destinations.map((d) => d.ratings.affordability.label);
  const unique = [...new Set(items)];
  return unique;
}

export function getInfrastructureRatings(destinations: readonly Destination[]) {
  const items = destinations.map((d) => d.ratings.infrastructure.label);
  const unique = [...new Set(items)];
  return unique;
}
