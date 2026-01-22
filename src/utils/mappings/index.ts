import * as Lucide from "lucide-react";
import { tw } from "@/utils/tailwind";

export function gradeToColor(grade: string) {
  switch (grade) {
    case "A":
      return {
        color: `blue`,
        text: tw`text-blue-500`,
        bg: tw`bg-blue-500`,
      } as const;
    case "B":
      return {
        color: `green`,
        text: tw`text-green-500`,
        bg: tw`bg-green-500`,
      } as const;
    case "C":
      return {
        color: `yellow`,
        text: tw`text-yellow-500`,
        bg: tw`bg-yellow-500`,
      } as const;
    case "D":
      return {
        color: `red`,
        text: tw`text-red-500`,
        bg: tw`bg-red-500`,
      } as const;
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
