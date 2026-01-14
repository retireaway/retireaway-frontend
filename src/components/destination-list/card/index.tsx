import { Chip } from "@/components/chip-base";
import {
  CircleIcon,
  StarIcon,
  UserRoundIcon,
  UsersRoundIcon,
  type LucideIcon,
} from "lucide-react";

export function Card({ children }: React.PropsWithChildren<{}>) {
  return (
    <article className="relative flex h-128 w-full flex-col gap-4 overflow-hidden rounded-xl border-1 border-neutral-100 bg-white p-3">
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
    <>
      <img
        alt={alt}
        className="absolute inset-0 h-full w-full rounded-xl object-cover"
        src={src}
      />
      <div className="absolute inset-0 top-0 left-0 h-full w-full rounded-xl bg-linear-to-b from-black/10 to-black/60"></div>
    </>
  );
}

function Header({ children }: React.PropsWithChildren<{}>) {
  return <header className="z-10 flex w-full flex-col">{children}</header>;
}

function Title({ children }: React.PropsWithChildren<{}>) {
  return (
    <h2>
      <span className="text-xl font-medium text-white">{children}</span>
    </h2>
  );
}

function Subtitle({ children }: React.PropsWithChildren<{}>) {
  return <div className="flex flex-row items-center gap-2">{children}</div>;
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

Subtitle.Climate = function Climate({
  icon: Icon,
  text,
}: {
  icon: LucideIcon;
  text: string;
}) {
  return (
    <div className="flex flex-row items-center gap-0.5">
      <Icon className="size-4 text-white" />
      <Subtitle.Text>{text}</Subtitle.Text>
    </div>
  );
};

function Details({ children }: React.PropsWithChildren<{}>) {
  return <div className="flex flex-col gap-2 overflow-hidden">{children}</div>;
}

function ControlBar({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="absolute top-0 right-0 flex w-full flex-row items-center justify-end gap-2 p-5">
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

function KeyFactors({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="flex w-full">
      <div className="w-0 min-w-0 flex-1">
        <ul className="scrollbar-none flex w-full snap-x snap-mandatory snap-always flex-row gap-2 overflow-x-auto">
          {children}
        </ul>
      </div>
    </div>
  );
}

function Item({ children }: React.PropsWithChildren<{}>) {
  return <li className="snap-start">{children}</li>;
}

function ReadMore({ href }: { href: string }) {
  return (
    <a
      href={href}
      className="mt-1 flex w-min flex-row items-center justify-between gap-1 border-b-2 border-blue-700 text-sm font-medium whitespace-nowrap text-neutral-700"
    >
      Read more
    </a>
  );
}

function CountryRatingStar({ fill }: { fill: boolean }) {
  return (
    <li>
      <StarIcon
        className={
          fill
            ? `size-4 fill-yellow-300 stroke-yellow-300`
            : `size-4 fill-none stroke-neutral-300`
        }
      />
    </li>
  );
}

function CountryRating({ rating }: { rating: 1 | 2 | 3 }) {
  const fill = [...Array(rating).fill(true), ...Array(3 - rating).fill(false)];

  return (
    <ul className="flex flex-row items-center justify-center gap-1">
      {fill.map((f, i) => (
        <CountryRatingStar key={i} fill={f} />
      ))}
    </ul>
  );
}

function Flag({ src }: { src: string }) {
  return (
    <div className="flex h-5 w-7 items-center justify-center">
      <img src={src} />
    </div>
  );
}

function Country({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="flex flex-col items-start justify-start gap-0">
      {children}
    </div>
  );
}

function NoName({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="flex w-full flex-row items-center justify-between">
      {children}
    </div>
  );
}

function Expenditure({ single, family }: { single: number; family: number }) {
  return (
    <div className="z-10 flex flex-row items-center gap-2 rounded-full bg-black/50 p-2">
      <div className="flex flex-row items-center justify-center gap-1">
        <UserRoundIcon className="size-4 text-white" />
        <span className="text-xs text-white">${Math.floor(single)}/mo</span>
      </div>
      <Subtitle.Divider />
      <div className="flex flex-row items-center justify-center gap-1">
        <UsersRoundIcon className="size-4 text-white" />
        <span className="text-xs text-white">${Math.floor(family)}/mo</span>
      </div>
    </div>
  );
}

function Star({ fill }: { fill: boolean }) {
  return (
    <li>
      <StarIcon
        className={
          fill
            ? `size-3 fill-blue-600 stroke-blue-600`
            : `size-3 fill-white stroke-neutral-300`
        }
      />
    </li>
  );
}

function RatingItem({ rating, text }: { rating: 1 | 2 | 3; text: string }) {
  const fill = [...Array(rating).fill(true), ...Array(3 - rating).fill(false)];

  return (
    <li className="flex flex-col items-center justify-center gap-1">
      <ul className="flex flex-row items-center justify-center gap-1">
        {fill.map((f, i) => (
          <Star key={i} fill={f} />
        ))}
      </ul>
      <span className="text-xs font-medium text-neutral-500">{text}</span>
    </li>
  );
}

function RatingList({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="flex basis-[35%] items-center p-1">
      <div className="flex flex-col items-center justify-start gap-4">
        {children}
      </div>
    </div>
  );
}

function Description({ text, href }: { text: string; href: string }) {
  return (
    <div className="basis-[65%]">
      <p className="line-clamp-6 text-sm text-neutral-500">{text}</p>
      <div className="h-1" />
      <ReadMore href={href} />
    </div>
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
Card.CountryRating = CountryRating;
Card.Flag = Flag;
Card.Country = Country;
Card.NoName = NoName;
Card.Expenditure = Expenditure;
Card.RatingItem = RatingItem;
Card.RatingList = RatingList;
