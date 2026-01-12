import { tw } from "@/utils/tailwind";
import { cva, type VariantProps } from "class-variance-authority";

const base = tw`font-medium text-white`;

const xs = tw`text-xs`;

const variants = {
  size: { xs },
};

const cn = cva(base, { variants });

type RemoveNullish<T> = {
  [K in keyof T]: NonNullable<T[K]>;
};

type Variants = Required<VariantProps<typeof cn>>;

type Props = React.PropsWithChildren<RemoveNullish<Variants>>;

export function Text({ children, size }: Props) {
  return <span className={cn({ size })}>{children}</span>;
}
