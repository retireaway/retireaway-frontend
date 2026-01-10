import { Card } from "./card";
import { Slider } from "./slider";
import { Title } from "./title";

export function Preview({ children }: React.PropsWithChildren<{}>) {
  return <div className="flex flex-col gap-4">{children}</div>;
}

Preview.Card = Card;
Preview.Title = Title;
Preview.Slider = Slider;
