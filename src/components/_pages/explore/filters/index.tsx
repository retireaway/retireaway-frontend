import * as React from "react";
import * as Wouter from "wouter";

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
import { Slider } from "@base-ui/react/slider";

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
      budgetType: ["Single", "Couple"] as const,
    };
  }, [destinations]);

  return (
    <>
      <FilterGroup title="budget">
        <FilterItem
          name="type"
          param="budget-type"
          items={dataset.budgetType}
        />

        <BudgetSlider />
      </FilterGroup>

      {/* <FilterGroup title="budget"> */}
      {/*   <FilterItem */}
      {/*     name="single" */}
      {/*     items={dataset.single.filter((item) => item !== "All")} */}
      {/*   /> */}
      {/*   <FilterItem */}
      {/*     name="couple" */}
      {/*     items={dataset.couple.filter((item) => item !== "All")} */}
      {/*   /> */}
      {/* </FilterGroup> */}

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

function BudgetSlider() {
  const [params, setParams] = Wouter.useSearchParams();

  const budgetType = params.get("budget-type");
  const budgetAmount = params.get("budget-amount");

  const [min, max] = React.useMemo(() => {
    return budgetType === "Single" || budgetType === null
      ? ([1500, 6000] as const)
      : ([2500, 10000] as const);
  }, [budgetType]);

  const [value, setValue] = React.useState<number>(() => {
    return budgetAmount === null ? max : parseInt(budgetAmount);
  });

  React.useEffect(() => {
    if (budgetType === null) {
      params.set("budget-type", "Single");
    }

    if (budgetAmount === null) {
      params.set("budget-amount", max.toString());
    }

    setParams(params, { replace: true });
  }, []);

  return (
    <Slider.Root
      min={min}
      max={max}
      step={500}
      value={value}
      locale="en-US"
      thumbAlignment="edge"
      format={{
        notation: "compact",
        compactDisplay: "short",
        maximumFractionDigits: 1,
        style: "currency",
        currency: "USD",
        currencyDisplay: "symbol",
      }}
      onValueChange={(value) => {
        if (value === undefined) {
          return;
        }

        setValue(value);

        params.set("budget-amount", value.toString());

        setParams(params, { replace: true });
      }}
    >
      <div className="mb-4 flex flex-row items-center justify-between">
        <Slider.Label className="text-sm text-neutral-500 capitalize">
          Amount
        </Slider.Label>

        <Slider.Value className="text-sm font-bold tracking-wide text-neutral-500 capitalize" />
      </div>

      <Slider.Control className="px-0">
        <Slider.Track className="h-1 w-full rounded-s-full rounded-e-full bg-neutral-100">
          <Slider.Indicator className="h-1 rounded-s-full bg-accent" />
          <Slider.Thumb className="size-4 rounded-full bg-primary" />
        </Slider.Track>
      </Slider.Control>
    </Slider.Root>
  );
}
