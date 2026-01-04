import { ChevronRightIcon } from "lucide-react";

export function Preview({ children }: React.PropsWithChildren<{}>) {
  return <div className="flex flex-col gap-4">{children}</div>;
}

function Title({ children, href }: React.PropsWithChildren<{ href: string }>) {
  return (
    <a href={href} className="flex items-center justify-between">
      <h2>
        <span className="text-base font-medium text-neutral-700">
          {children}
        </span>
      </h2>

      <ChevronRightIcon className="size-5 text-neutral-400" />
    </a>
  );
}
Preview.Title = Title;

function Slider({ children }: React.PropsWithChildren<{}>) {
  return (
    <ul className="scrollbar-none flex w-full snap-x snap-mandatory snap-always flex-row gap-2 overflow-x-scroll">
      {children}
    </ul>
  );
}

Slider.Item = function Item({ children }: React.PropsWithChildren<{}>) {
  return <li className="snap-start">{children}</li>;
};

Preview.Slider = Slider;
