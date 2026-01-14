import type { Destination } from "@/types/destination";
import { Card } from "./card";
import {
  GlobeIcon,
  SunIcon,
  SunSnowIcon,
  TreePalmIcon,
  type LucideIcon,
} from "lucide-react";
import { Grading } from "../grading";

export function List({ children }: React.PropsWithChildren<{}>) {
  return <ul className="flex flex-col gap-8">{children}</ul>;
}

List.Item = function Item({ children }: React.PropsWithChildren<{}>) {
  return <li>{children}</li>;
};

List.Card = Card;

export function DestinationCard({
  destination: d,
}: {
  destination: Destination;
}) {
  const color = {
    A: "green",
    B: "green",
    C: "yellow",
    D: "yellow",
    E: "red",
    F: "red",
  } as const;

  const icons = {
    Tropical: TreePalmIcon,
    Temperate: SunSnowIcon,
    Mediterranean: SunIcon,
  } as Record<string, LucideIcon>;

  type GradeLetter = "A" | "B" | "C" | "D" | "E" | "F";

  const grades = ["A", "B", "C", "D", "E", "F"] as const;

  const grading: { name: string; grade: GradeLetter }[] = [
    {
      name: "healthcare",
      grade: grades[Math.floor(Math.random() * grades.length)] as GradeLetter,
    },
    {
      name: "affordability",
      grade: grades[Math.floor(Math.random() * grades.length)] as GradeLetter,
    },
    {
      name: "safety",
      grade: grades[Math.floor(Math.random() * grades.length)] as GradeLetter,
    },
    {
      name: "culture",
      grade: grades[Math.floor(Math.random() * grades.length)] as GradeLetter,
    },
  ];

  return (
    <List.Card>
      <List.Card.Hero>
        <List.Card.ControlBar>
          <List.Card.Expenditure
            single={d.expenses.single.amount}
            family={d.expenses.family.amount}
          />
        </List.Card.ControlBar>

        <List.Card.Image alt="image" src={`/images/destinations/${d.id}.jpg`} />

        <List.Card.Header>
          <List.Card.Country>
            <List.Card.Flag src={`/flags/${d.id}.svg`} />
            <List.Card.Title>{d.country}</List.Card.Title>
          </List.Card.Country>

          <List.Card.NoName>
            <List.Card.Subtitle>
              <List.Card.Subtitle.Text>{d.continent}</List.Card.Subtitle.Text>
              <List.Card.Subtitle.Divider />
              <List.Card.Subtitle.Climate
                icon={icons[d.climate] ?? GlobeIcon}
                text={d.climate}
              />
            </List.Card.Subtitle>

            <List.Card.CountryRating
              rating={[1, 2, 3][Math.floor(Math.random() * 3)] as 1 | 2 | 3}
            />
          </List.Card.NoName>
        </List.Card.Header>
      </List.Card.Hero>

      <List.Card.Details>
        <List.Card.KeyFactors>
          {grading.map((g) => {
            return (
              <List.Card.KeyFactors.Item key={g.name}>
                <Grading
                  color={color[g.grade]}
                  title={g.name}
                  grade={g.grade}
                />
              </List.Card.KeyFactors.Item>
            );
          })}
        </List.Card.KeyFactors>

        <div className="h-0.5" />

        <div className="flex flex-row gap-1">
          <List.Card.Description href="#" text={d.description} />
          <div className="w-px bg-neutral-100" />

          <List.Card.RatingList>
            <List.Card.RatingItem
              rating={[1, 2, 3][Math.floor(Math.random() * 3)] as 1 | 2 | 3}
              text="English Proficiency"
            />
            <List.Card.RatingItem
              rating={[1, 2, 3][Math.floor(Math.random() * 3)] as 1 | 2 | 3}
              text="Expat Friendly"
            />
            <List.Card.RatingItem
              rating={[1, 2, 3][Math.floor(Math.random() * 3)] as 1 | 2 | 3}
              text="Visa Access"
            />
          </List.Card.RatingList>
        </div>
      </List.Card.Details>
    </List.Card>
  );
}
