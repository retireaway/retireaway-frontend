import * as React from "react";
import * as Wouter from "wouter";
import * as Lucide from "lucide-react";
import { Chip } from "@/components/chip";

type FilterItemProps = {
  name: string;
  items: readonly string[];
  defaultValue?: string;
  param?: string;
  preview?: number;
  multiple?: boolean;
};

export function FilterItem({
  name,
  param,
  items,
  preview,
  multiple,
}: FilterItemProps) {
  const identifier = param ?? name;
  const [count, setCount] = React.useState(preview ?? items.length);
  const [params, setParams] = Wouter.useSearchParams();
  const [collapse] = React.useState(false);

  return (
    <div className="flex flex-col gap-2">
      <button
        className="flex flex-row justify-between gap-2"
        onClick={() => {}}
      >
        <p className="text-sm text-neutral-500 capitalize">{name}</p>
        {collapse ? (
          <Lucide.ChevronDown className="hidden size-4 text-neutral-500" />
        ) : (
          <Lucide.ChevronUp className="hidden size-4 text-neutral-500" />
        )}
      </button>

      {!collapse && (
        <ul className="flex flex-row flex-wrap gap-2">
          {items.slice(0, count).map((item) => {
            return (
              <li key={item}>
                <button
                  onClick={() => {
                    if (params.has(identifier, item)) {
                      params.delete(identifier, item);
                      setParams(params, { replace: true });
                      return;
                    }

                    if (multiple) {
                      params.append(identifier, item);
                      setParams(params, { replace: true });
                      return;
                    }

                    params.delete(identifier);
                    params.append(identifier, item);
                    setParams(params, { replace: true });
                  }}
                >
                  <Chip
                    color="primary"
                    size="xs"
                    fill={params.has(identifier, item) ? "dark" : "light"}
                  >
                    {item}
                  </Chip>
                </button>
              </li>
            );
          })}

          {preview && count < items.length && (
            <button onClick={() => setCount(items.length)}>
              <Chip color="primarybg" size="xs" fill="light">
                <Lucide.Plus className="size-3" />
                More
              </Chip>
            </button>
          )}

          {preview && count === items.length && (
            <button onClick={() => setCount(preview)}>
              <Chip color="primarybg" size="xs" fill="light">
                <Lucide.X className="size-3" />
                Less
              </Chip>
            </button>
          )}
        </ul>
      )}
    </div>
  );
}
