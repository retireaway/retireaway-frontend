import { tw } from "@/utils/tailwind";
import { cva, type VariantProps } from "class-variance-authority";

import { Title } from "./title";
import { Grade } from "./grade";

const base = tw`flex flex-row rounded-full border-1 text-xs`;

const blue = tw`border-blue-100`;
const green = tw`border-green-100`;
const red = tw`border-red-100`;
const yellow = tw`border-yellow-100`;

const variants = {
  color: { blue, green, red, yellow },
};

const cn = cva(base, { variants });

type RemoveNullish<T> = {
  [K in keyof T]: NonNullable<T[K]>;
};

type Variants = Required<VariantProps<typeof cn>>;

type Props = { title: string; grade: string } & RemoveNullish<Variants>;

export function Grading({
  color,
  title,
  grade,
}: React.PropsWithChildren<Props>) {
  return (
    <div className={cn({ color })}>
      <Title color={color}>{title}</Title>
      <Grade color={color}>{grade}</Grade>
    </div>
  );
}
