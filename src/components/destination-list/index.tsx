import { Chip } from "@/components/chip";

export function List({ children }: React.PropsWithChildren<{}>) {
  return <ul className="flex flex-col gap-4">{children}</ul>;
}

List.Item = function Item({ children }: React.PropsWithChildren<{}>) {
  return <li>{children}</li>;
};

function Card({ children }: React.PropsWithChildren<{}>) {
  return (
    <article className="relative flex h-40 w-full flex-row gap-2 rounded-xl border-1 border-neutral-100 bg-white p-2">
      {children}
    </article>
  );
}

function Image({ src, alt }: { src: string; alt: string }) {
  return (
    <figure className="relative aspect-[1.1] h-full shrink-0 grow-0 overflow-hidden rounded-xl border-1 border-neutral-100 bg-neutral-50">
      <img
        alt={alt}
        className="absolute inset-0 h-full w-full rounded-xl object-cover"
        src={src}
      />
    </figure>
  );
}

function Details({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="flex w-full flex-col justify-between overflow-hidden py-2">
      {children}
    </div>
  );
}

function Header({ children }: React.PropsWithChildren<{}>) {
  return <header className="flex flex-col gap-1">{children}</header>;
}

function Title({ children }: React.PropsWithChildren<{}>) {
  return (
    <h2>
      <span className="text-base font-medium text-neutral-700">{children}</span>
    </h2>
  );
}

function Subtitle({ children }: React.PropsWithChildren<{}>) {
  return <p className="flex flex-col items-start gap-1">{children}</p>;
}

Subtitle.Text = function SubtitleText({
  children,
}: React.PropsWithChildren<{}>) {
  return <span className="text-sm text-neutral-400">{children}</span>;
};

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

function ControlBar({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="absolute top-0 left-0 z-10 flex w-full flex-row justify-start gap-2 p-4">
      {children}
    </div>
  );
}

function MetaData({ children }: React.PropsWithChildren<{}>) {
  return (
    <Chip size="xs" color="clear" fill="dark">
      {children}
    </Chip>
  );
}

KeyFactors.Item = Item;

List.Card = Card;
Card.Image = Image;
Card.Details = Details;
Card.Header = Header;
Card.Title = Title;
Card.Subtitle = Subtitle;
Card.KeyFactors = KeyFactors;
Card.ControlBar = ControlBar;
Card.MetaData = MetaData;
