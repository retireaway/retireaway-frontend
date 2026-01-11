import { Card } from "./card";

export function List({ children }: React.PropsWithChildren<{}>) {
  return <ul className="flex flex-col gap-4">{children}</ul>;
}

List.Item = function Item({ children }: React.PropsWithChildren<{}>) {
  return <li>{children}</li>;
};

List.Card = Card;
