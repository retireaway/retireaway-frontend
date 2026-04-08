import * as React from "react";
import * as Wouter from "wouter";
import * as Lucide from "lucide-react";

import { Chip } from "@/components/chip";

export function Searchbar() {
  const ref = React.useRef<HTMLInputElement | null>(null);
  const [params, setParams] = Wouter.useSearchParams();
  const [search, setSearch] = React.useState(() => {
    return params.get("search") ?? "";
  });

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();

        if (search === "") {
          params.delete("search");
        } else {
          params.set("search", search);
        }

        setParams(params);

        ref.current?.blur();
      }}
      onReset={(event) => {
        event.preventDefault();
        setSearch("");
        params.delete("search");
        setParams(params);
        ref.current?.blur();
      }}
      className="flex w-full flex-row items-center gap-2 rounded-s-full rounded-e-full border-1 border-neutral-200 bg-white p-1 px-3 has-focus:border-primary"
    >
      <input
        ref={ref}
        name="search"
        id="search"
        className="w-0 grow py-2 pl-2 text-sm text-neutral-600 outline-none placeholder:text-neutral-400"
        placeholder="Search..."
        autoComplete="on"
        value={search}
        onChange={(event) => {
          const value = event.target.value;
          setSearch(value);

          const clone = new URLSearchParams(params);
          clone.set("search", value);
          setParams(clone);
        }}
      />
      {search !== "" && (
        <button type="reset">
          <Chip size="xs" color="red" fill="light">
            clear
            <Lucide.X className="size-3" />
          </Chip>
        </button>
      )}
      <button type="submit">
        <Lucide.Search className="stroke-primary" />
      </button>
    </form>
  );
}
