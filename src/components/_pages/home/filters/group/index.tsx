import * as React from "react";
import * as Lucide from "lucide-react";

type FilterGroupProps = React.PropsWithChildren<{ title: string }>;

export function FilterGroup({ title, children }: FilterGroupProps) {
  const [collapse, setCollapse] = React.useState(false);

  return (
    <div className="flex flex-col gap-4">
      <button
        onClick={() => setCollapse(!collapse)}
        className="flex items-center justify-between gap-2"
      >
        <p className="text-xs font-medium text-accent uppercase">{title}</p>
        {collapse ? (
          <Lucide.ChevronDown className="size-4 text-neutral-500" />
        ) : (
          <Lucide.ChevronUp className="size-4 text-neutral-500" />
        )}
      </button>
      {!collapse && children}
    </div>
  );
}
