import { CircleIcon } from "lucide-react";
import { Chip } from "@/components/chip";

export function Card({ children }: React.PropsWithChildren<{}>) {
  return (
    <article className="relative flex h-80 w-68 flex-col gap-2 rounded-xl border-1 border-neutral-100 bg-white p-2">
      {children}
    </article>
  );
}

function Image({ src, alt }: { src: string; alt: string }) {
  return (
    <figure className="relative grow overflow-hidden rounded-xl border-1 border-neutral-100 bg-neutral-50">
      <img
        alt={alt}
        className="absolute inset-0 h-full w-full rounded-xl object-cover"
        src={src}
      />
    </figure>
  );
}

function Header({ children }: React.PropsWithChildren<{}>) {
  return <header className="flex flex-col">{children}</header>;
}

function Title({ children }: React.PropsWithChildren<{}>) {
  return (
    <h2>
      <span className="text-base font-medium text-neutral-700">{children}</span>
    </h2>
  );
}

function Subtitle({ children }: React.PropsWithChildren<{}>) {
  return <p className="flex flex-row items-center gap-2">{children}</p>;
}

Subtitle.Text = function SubtitleText({
  children,
}: React.PropsWithChildren<{}>) {
  return <span className="text-sm text-neutral-400">{children}</span>;
};

Subtitle.Divider = function Divider() {
  return (
    <CircleIcon
      aria-hidden="true"
      className="size-1.5 fill-neutral-400 stroke-neutral-400"
    />
  );
};

function Details({ children }: React.PropsWithChildren<{}>) {
  return <div className="flex flex-col gap-4 overflow-hidden">{children}</div>;
}

function ControlBar({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="absolute top-0 right-0 flex w-full flex-row justify-end gap-2 p-4">
      {children}
    </div>
  );
}

function MetaData({ children }: React.PropsWithChildren<{}>) {
  return (
    <Chip size="xs" color="neutral" fill="light">
      {children}
    </Chip>
  );
}

function KeyFactors({ children }: React.PropsWithChildren<{}>) {
  return (
    <ul className="scrollbar-none flex w-full snap-x snap-mandatory snap-always flex-row gap-2 overflow-x-scroll">
      {children}
    </ul>
  );
}

function Item({ children }: React.PropsWithChildren<{}>) {
  return <li className="snap-start">{children}</li>;
}

KeyFactors.Item = Item;

Card.Image = Image;
Card.Header = Header;
Card.Title = Title;
Card.Subtitle = Subtitle;
Card.Details = Details;
Card.ControlBar = ControlBar;
Card.MetaData = MetaData;
Card.KeyFactors = KeyFactors;
