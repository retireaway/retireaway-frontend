import type { Destination } from "@/types/destination";
import type { Range } from "@/types/range";

const formatter = new Intl.NumberFormat("en-US", {
  notation: "compact",
  compactDisplay: "short",
  maximumFractionDigits: 1,
  style: "currency",
  currency: "USD",
  currencyDisplay: "symbol",
});

export const predicates = {
  budget: function (
    d: Destination,
    value: { type: string | null; amount: string | null },
  ): boolean {
    if (value.amount === null) return true;

    if (value.type === "Single") {
      const amount = parseInt(value.amount);
      return d.expenditure.single.amount < amount;
    }

    if (value.type === "Couple") {
      const amount = parseInt(value.amount);
      return d.expenditure.couple.amount < amount;
    }

    throw new Error("invalid budget filter type");
  },
  single: function (d: Destination, value: Range | undefined): boolean {
    if (value === undefined) return true;

    return (
      value.min <= d.expenditure.single.amount &&
      d.expenditure.single.amount < value.max
    );
  },
  couple: function (d: Destination, value: Range | undefined): boolean {
    if (value === undefined) return true;

    return (
      value.min <= d.expenditure.couple.amount &&
      d.expenditure.couple.amount < value.max
    );
  },
  affordability: function (d: Destination, value: string | null): boolean {
    if (value === null) return true;
    return value === d.ratings.affordability.label;
  },
  climate: function (d: Destination, value: string | null): boolean {
    if (value === null) return true;
    return value === d.climate;
  },
  english: function (d: Destination, value: string | null): boolean {
    if (value === null) return true;
    return value === d.englishUsage;
  },
  healthcare: function (d: Destination, value: string | null): boolean {
    if (value === null) return true;
    return value === d.ratings.healthcareQuality.label;
  },
  infrastructure: function (d: Destination, value: string | null): boolean {
    if (value === null) return true;
    return value === d.ratings.infrastructure.label;
  },
  region: function (d: Destination, value: string | null): boolean {
    if (value === null) return true;
    return value === d.region;
  },
  safety: function (d: Destination, value: string | null): boolean {
    if (value === null) return true;
    return value === d.ratings.personalSafety.label;
  },
  tags: function (d: Destination, value: readonly string[]): boolean {
    if (value.length === 0) return true;
    return value.every((tag) => d.tags.includes(tag));
  },
  tax: function (d: Destination, value: string | null): boolean {
    if (value === null) return true;
    return value === d.ratings.taxEnvironment.label;
  },
  visa: function (d: Destination, value: string | null): boolean {
    if (value === null) return true;
    return value === d.ratings.visaEase.label;
  },
};

export const ranges = {
  single: {
    All: { min: -Infinity, max: Infinity },
    [`Under ${formatter.format(1500)}`]: { min: 0, max: 1500 },
    [`${formatter.formatRange(1500, 2500)}`]: { min: 1500, max: 2500 },
    [`${formatter.formatRange(2500, 4000)}`]: { min: 2500, max: 4000 },
    [`Over ${formatter.format(4000)}`]: { min: 4000, max: Infinity },
  },
  couple: {
    All: { min: -Infinity, max: Infinity },
    [`Under ${formatter.format(2500)}`]: { min: 0, max: 2500 },
    [`${formatter.formatRange(2500, 4000)}`]: { min: 2500, max: 4000 },
    [`${formatter.formatRange(4000, 6000)}`]: { min: 4000, max: 6000 },
    [`Over ${formatter.format(6000)}`]: { min: 6000, max: Infinity },
  },
};
