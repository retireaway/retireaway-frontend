import { tw } from "@/utils/tailwind";
import { cva, type VariantProps } from "class-variance-authority";

const base = tw`flex flex-row items-center justify-between gap-1 rounded-full border-1 whitespace-nowrap`;

const xs = tw`px-2 py-1 text-xs`;

const sm = tw`px-4 py-2 text-sm`;

const blue = tw``;
const green = tw``;
const neutral = tw``;
const red = tw``;
const plain = tw``;
const yellow = tw``;
const clear = tw``;

const dark = tw``;
const light = tw``;

const variants = {
  color: { neutral, yellow, blue, green, plain, red, clear },
  fill: { dark, light },
  size: { xs, sm },
} as const;

const compoundVariants = [
  {
    color: "clear",
    fill: "dark",
    className: tw`bg-black/40 text-white`,
  } as const,
  {
    color: "clear",
    fill: "light",
    className: tw`text-black`,
  } as const,
  {
    color: "plain",
    fill: "dark",
    className: tw`bg-black text-white`,
  } as const,
  {
    color: "plain",
    fill: "light",
    className: tw`border-neutral-100 bg-white text-neutral-500`,
  } as const,
  {
    color: "neutral",
    fill: "dark",
    className: tw`bg-neutral-700 text-neutral-50`,
  } as const,
  {
    color: "neutral",
    fill: "light",
    className: tw`border-neutral-100 bg-neutral-50 text-neutral-500`,
  } as const,

  {
    color: "yellow",
    fill: "dark",

    className: tw`bg-yellow-500 text-white`,
  } as const,
  {
    color: "yellow",
    fill: "light",
    className: tw`bg-yellow-100 text-yellow-500`,
  } as const,
  {
    color: "blue",
    fill: "dark",
    className: tw`bg-blue-500 text-white`,
  } as const,

  {
    color: "blue",
    fill: "light",
    className: tw`border-blue-100 bg-blue-50 text-blue-500`,
  } as const,
  {
    color: "green",
    fill: "dark",
    className: tw`bg-green-500 text-white`,
  } as const,
  {
    color: "green",
    fill: "light",
    className: tw`bg-green-100 text-green-500`,
  } as const,
  {
    color: "red",
    fill: "dark",
    className: tw`bg-red-600 text-white`,
  } as const,
  {
    color: "red",
    fill: "light",
    className: tw`bg-red-100 text-red-600`,
  } as const,
];

const cn = cva(base, { variants, compoundVariants });

type RemoveNullish<T> = {
  [K in keyof T]: NonNullable<T[K]>;
};

type Variants = Required<VariantProps<typeof cn>>;

type Props = React.PropsWithChildren<RemoveNullish<Variants>>;

export function Chip({ children, size, color, fill }: Props) {
  return <div className={cn({ size, color, fill })}>{children}</div>;
}
