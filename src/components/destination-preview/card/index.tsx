import { CircleIcon } from "lucide-react";
import { Chip } from "@/components/chip";

export function Card({ children }: React.PropsWithChildren<{}>) {
  return (
    <article className="relative flex h-104 w-80 flex-col gap-4 overflow-hidden rounded-xl border-1 border-neutral-100 bg-white p-2">
      {children}
    </article>
  );
}

function Hero({ children }: React.PropsWithChildren<{}>) {
  return (
    <figure className="relative flex grow flex-col justify-end overflow-hidden rounded-xl border-1 border-neutral-100 bg-neutral-50 p-2">
      {children}
    </figure>
  );
}

function Image({ src, alt }: { src: string; alt: string }) {
  return (
    <img
      alt={alt}
      className="absolute inset-0 h-full w-full rounded-xl object-cover"
      src={src}
    />
  );
}

function Header({ children }: React.PropsWithChildren<{}>) {
  return <header className="z-10 flex flex-col">{children}</header>;
}

function Title({ children }: React.PropsWithChildren<{}>) {
  return (
    <h2>
      <span className="text-xl font-medium text-white">{children}</span>
    </h2>
  );
}

function Subtitle({ children }: React.PropsWithChildren<{}>) {
  return <p className="flex flex-row items-center gap-2">{children}</p>;
}

Subtitle.Text = function SubtitleText({
  children,
}: React.PropsWithChildren<{}>) {
  return (
    <span className="text-sm font-medium text-neutral-200">{children}</span>
  );
};

Subtitle.Divider = function Divider() {
  return (
    <CircleIcon
      aria-hidden="true"
      className="size-1.5 fill-yellow-300 stroke-yellow-300"
    />
  );
};

function Details({ children }: React.PropsWithChildren<{}>) {
  return <div className="flex flex-col gap-2 overflow-hidden">{children}</div>;
}

function ControlBar({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="absolute top-0 right-0 flex w-full flex-row justify-end gap-2 p-4">
      {children}
    </div>
  );
}

function Description({ children }: React.PropsWithChildren<{}>) {
  return <p className="line-clamp-5 text-sm text-neutral-500">{children}</p>;
}

function MetaData({ children }: React.PropsWithChildren<{}>) {
  return (
    <Chip size="xs" color="clear" fill="dark">
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
function ReadMore() {
  return (
    <button className="mt-2 rounded-md bg-blue-600 p-2 text-sm whitespace-nowrap text-white">
      Read more
    </button>
  );
}

KeyFactors.Item = Item;

Card.Image = Image;
Card.Hero = Hero;
Card.Header = Header;
Card.Title = Title;
Card.Subtitle = Subtitle;
Card.Details = Details;
Card.Description = Description;
Card.ControlBar = ControlBar;
Card.MetaData = MetaData;
Card.KeyFactors = KeyFactors;
Card.ReadMore = ReadMore;
