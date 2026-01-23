import * as Lucide from "lucide-react";
import { tw } from "@/utils/tailwind";

export function gradeToColor(grade: string) {
  switch (grade) {
    case "A":
      return {
        color: `deep-green`,
        text: tw`text-green-600`,
        bg: tw`bg-green-600`,
      } as const;
    case "B":
      return {
        color: `green`,
        text: tw`text-green-500`,
        bg: tw`bg-green-500`,
      } as const;
    case "C":
      return {
        color: `amber`,
        text: tw`text-amber-500`,
        bg: tw`bg-amber-500`,
      } as const;
    case "D":
    default:
      return {
        color: `neutral`,
        text: tw`text-neutral-500`,
        bg: tw`bg-neutral-500`,
      } as const;
  }
}

export function climateToIcon(climate: string) {
  switch (climate) {
    case "Mediterranean":
      return Lucide.Sun;
    case "Temperate":
      return Lucide.SunSnow;
    case "Tropical":
    case "Subtropical":
      return Lucide.TreePalm;
    case "Cold":
      return Lucide.Snowflake;
    case "Mixed":
    case "Arid":
    default:
      return Lucide.Globe;
  }
}
