import * as Lucide from "lucide-react";
import { tw } from "@/utils/tailwind";

export function gradeToColor(grade: string) {
  switch (grade) {
    case "A":
      return {
        color: `deep-teal`,
        text: tw`text-[#005F55]`,
        bg: tw`bg-[#005F55]`,
      } as const;
    case "B":
      return {
        color: `teal-blue`,
        text: tw`text-[#0891B2]`,
        bg: tw`bg-[#0891B2]`,
      } as const;
    case "C":
      return {
        color: `amber`,
        text: tw`text-[64748B]`,
        bg: tw`bg-[64748B]`,
      } as const;
    case "D":
    default:
      return {
        color: `neutral`,
        text: tw`text-[#94A3B8]`,
        bg: tw`bg-[##94A3B8]`,
      } as const;
  }
}

export function climateToIcon(climate: string) {
  switch (climate) {
    case "Mediterranean":
      return Lucide.SunDim;
    case "Temperate":
      return Lucide.SunSnow;
    case "Tropical":
    case "Subtropical":
      return Lucide.TreePalm;
    case "Cold":
      return Lucide.Snowflake;
    case "Arid":
      return Lucide.Sun;
    case "Mixed":
    default:
      return Lucide.Globe;
  }
}
