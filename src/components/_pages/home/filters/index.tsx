import { FilterGroup } from "./group";
import { FilterItem } from "./item";

type FiltersProps = {
  tags: readonly string[];
  regions: readonly string[];
  climates: readonly string[];
  english: readonly string[];
  visa: readonly string[];
  tax: readonly string[];
  single: readonly string[];
  couple: readonly string[];
};

export function Filters(dataset: FiltersProps) {
  return (
    <div className="flex h-min flex-col gap-8 rounded-xl border-1 border-neutral-200 p-4">
      <FilterGroup title="budget">
        <FilterItem name="single" items={dataset.single} />
        <FilterItem name="couple" items={dataset.couple} />
      </FilterGroup>

      <FilterGroup title="core factors">
        <FilterItem name="healthcare" items={["A", "B", "C", "D"]} />
        <FilterItem name="safety" items={["A", "B", "C", "D"]} />
        <FilterItem name="affordability" items={["A", "B", "C", "D"]} />
        <FilterItem name="infrastructure" items={["A", "B", "C", "D"]} />
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
    </div>
  );
}
