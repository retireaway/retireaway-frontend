import * as Wouter from "wouter";

export function SearchBar() {
  const [params, setParams] = Wouter.useSearchParams();

  return (
    <input
      placeholder="Enter destination name..."
      className="w-0 grow rounded-full border-1 border-neutral-200 bg-neutral-50 pl-4 text-sm text-neutral-600 outline-none focus:border-neutral-400"
      name="search"
      value={params.get("search") ?? ""}
      onChange={(event) => {
        const search = event.target.value;
        if (search === "") {
          params.delete("search");
        } else {
          params.set("search", search);
        }

        setParams(params, { replace: true });
      }}
    />
  );
}
