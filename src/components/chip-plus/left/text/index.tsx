import { tw } from "@/utils/tailwind";
import { cva, type VariantProps } from "class-variance-authority";

const base = tw``;

const xs = tw`text-xs`;

const blue = tw`text-blue-600`;
const green = tw`text-green-600`;
const red = tw`text-red-600`;
const yellow = tw`text-yellow-600`;

const variants = {
  size: { xs },
  color: { blue, green, red, yellow },
};

const cn = cva(base, { variants });

type RemoveNullish<T> = {
  [K in keyof T]: NonNullable<T[K]>;
};

type Variants = Required<VariantProps<typeof cn>>;

type Props = React.PropsWithChildren<RemoveNullish<Variants>>;

export function Text({ children, size, color }: Props) {
  return <span className={cn({ size, color })}>{children}</span>;
}
