import * as Wouter from "wouter";

export function useFilters() {
  const [params] = Wouter.useSearchParams();

  const affordability = params.get("affordability");
  const climate = params.get("climate");
  const english = params.get("english");
  const healthcare = params.get("healthcare");
  const infrastructure = params.get("infrastructure");
  const region = params.get("region");
  const safety = params.get("safety");
  const tags = params.getAll("tag");
  const tax = params.get("tax");
  const visa = params.get("visa");
  const single = params.get("single");
  const couple = params.get("couple");

  return {
    affordability,
    climate,
    english,
    healthcare,
    infrastructure,
    region,
    safety,
    tags,
    tax,
    visa,
    single,
    couple,
  } as const;
}
