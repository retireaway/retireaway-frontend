import * as Wouter from "wouter";

export function useFilters() {
  const [params, setParams] = Wouter.useSearchParams();

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
  const budgetType = params.get("budget-type");
  const budgetAmount = params.get("budget-amount");

  function reset() {
    params.delete("affordability");
    params.delete("infrastructure");
    params.delete("climate");
    params.delete("couple");
    params.delete("healthcare");
    params.delete("region");
    params.delete("safety");
    params.delete("single");
    params.delete("tag");
    params.delete("tax");
    params.delete("visa");
    params.delete("english");
    params.delete("budget-type");
    params.delete("budget-amount");
    setParams(params);
  }

  return [
    {
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
      budget: { type: budgetType, amount: budgetAmount },
    } as const,
    reset,
  ] as const;
}
