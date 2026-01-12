import { tw } from "@/utils/tailwind";
import { cva, type VariantProps } from "class-variance-authority";

const base = tw`flex flex-row items-center justify-center gap-1 rounded-e-full py-1 pr-3 pl-2.5 font-medium text-white`;

const blue = tw`bg-blue-600`;
const green = tw`bg-green-600`;
const red = tw`bg-red-600`;
const yellow = tw`bg-yellow-400`;

const variants = {
  color: { blue, green, red, yellow },
};

const cn = cva(base, { variants });

type RemoveNullish<T> = {
  [K in keyof T]: NonNullable<T[K]>;
};

type Variants = Required<VariantProps<typeof cn>>;

type Props = React.PropsWithChildren<RemoveNullish<Variants>>;

export function Grade({ children, color }: Props) {
  return (
    <div className={cn({ color })}>
      <span>{children}</span>
    </div>
  );
}
