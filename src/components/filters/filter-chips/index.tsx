import * as Lucide from "lucide-react";

import { Chip } from "@/components/chip";
import { useFilters } from "@/hooks/filters";

export function FilterChips() {
  const [filters, reset] = useFilters();

  return (
    <ul className="scrollbar-none flex w-full snap-x snap-mandatory snap-always flex-row gap-2 overflow-x-auto lg:flex-wrap">
      <button onClick={() => reset()}>
        <Chip size="xs" color="red" fill="light">
          Reset
          <Lucide.X className="size-3" />
        </Chip>
      </button>

      {filters.region && (
        <Chip size="xs" color="primarybg" fill="dark">
          {filters.region}
        </Chip>
      )}

      {filters.climate && (
        <Chip size="xs" color="primarybg" fill="dark">
          {filters.climate}
        </Chip>
      )}

      {filters.tags.map((tag) => (
        <Chip key={tag} size="xs" color="primarybg" fill="dark">
          {tag}
        </Chip>
      ))}

      {filters.single && (
        <Chip size="xs" color="primarybg" fill="dark">
          {filters.single}
        </Chip>
      )}

      {filters.couple && (
        <Chip size="xs" color="primarybg" fill="dark">
          {filters.couple}
        </Chip>
      )}

      {filters.english && (
        <Chip size="xs" color="primarybg" fill="dark">
          English
          <div className="h-full w-px bg-primary" />
          {filters.english}
        </Chip>
      )}

      {filters.visa && (
        <Chip size="xs" color="primarybg" fill="dark">
          {filters.visa} Visa
        </Chip>
      )}

      {filters.tax && (
        <Chip size="xs" color="primarybg" fill="dark">
          {filters.tax}
        </Chip>
      )}

      {filters.affordability && (
        <Chip size="xs" color="primarybg" fill="dark">
          Affordability
          <div className="h-full w-px bg-primary" />
          {filters.affordability}
        </Chip>
      )}

      {filters.healthcare && (
        <Chip size="xs" color="primarybg" fill="dark">
          Healthcare
          <div className="h-full w-px bg-primary" />
          {filters.healthcare}
        </Chip>
      )}

      {filters.safety && (
        <Chip size="xs" color="primarybg" fill="dark">
          Safety
          <div className="h-full w-px bg-primary" />
          {filters.safety}
        </Chip>
      )}

      {filters.infrastructure && (
        <Chip size="xs" color="primarybg" fill="dark">
          Infrastructure
          <div className="h-full w-px bg-primary" />
          {filters.infrastructure}
        </Chip>
      )}
    </ul>
  );
}
