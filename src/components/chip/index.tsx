import { tw } from "@/utils/tailwind";
import { cva, type VariantProps } from "class-variance-authority";

const base = tw`rounded-full`;

const xs = tw`px-2 py-1 text-xs`;
const sm = tw`px-4 py-2 text-sm`;

const neutral = tw`bg-neutral-100 text-neutral-500`;
const yellow = tw`bg-yellow-100 text-yellow-500`;
const green = tw`bg-green-100 text-green-500`;
const red = tw`bg-red-100 text-red-500`;

const variants = {
  color: { neutral, yellow, green, red },
  size: { xs, sm },
} as const;

const cn = cva(base, { variants });

type RemoveNullish<T> = {
  [K in keyof T]: NonNullable<T[K]>;
};

type Variants = Required<VariantProps<typeof cn>>;

type Props = React.PropsWithChildren<RemoveNullish<Variants>>;

export function Chip({ children, size, color }: Props) {
  return <div className={cn({ size, color })}>{children}</div>;
}
