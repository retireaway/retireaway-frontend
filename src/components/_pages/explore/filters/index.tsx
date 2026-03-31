import * as React from "react";
import destinations from "@/data/destinations.json" with { type: "json" };

import { FilterGroup } from "./group";
import { FilterItem } from "./item";
import {
  getTags,
  getRegions,
  getClimates,
  getVisaRatings,
  getTaxRatings,
  getEnglishUsageRatings,
  getHealthcareRatings,
  getSafetyRatings,
  getAffordabilityRatings,
  getInfrastructureRatings,
} from "@/utils/destination";
import { ranges } from "@/utils/filters";

export function Filters() {
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
      healthcare: getHealthcareRatings(destinations),
      safety: getSafetyRatings(destinations),
      affordability: getAffordabilityRatings(destinations),
      infrastructure: getInfrastructureRatings(destinations),
    };
  }, [destinations]);

  return (
    <>
      <FilterGroup title="budget">
        <FilterItem
          name="single"
          items={dataset.single.filter((item) => item !== "All")}
        />
        <FilterItem
          name="couple"
          items={dataset.couple.filter((item) => item !== "All")}
        />
      </FilterGroup>

      <FilterGroup title="core factors">
        <FilterItem name="healthcare" items={dataset.healthcare} />
        <FilterItem name="safety" items={dataset.safety} />
        <FilterItem name="affordability" items={dataset.affordability} />
        <FilterItem name="infrastructure" items={dataset.infrastructure} />
      </FilterGroup>

      <FilterGroup title="lifestyle">
        <FilterItem name="region" items={dataset.regions} />
        <FilterItem name="climate" items={dataset.climates} />
        <FilterItem
          name="english usage"
          param="english"
          items={dataset.english}
        />
      </FilterGroup>

      <FilterGroup title="practical">
        <FilterItem name="visa ease" param="visa" items={dataset.visa} />
        <FilterItem name="tax environment" param="tax" items={dataset.tax} />
      </FilterGroup>

      <FilterGroup title="preferences">
        <FilterItem name="tags" param="tag" items={dataset.tags} multiple />
      </FilterGroup>
    </>
  );
}
