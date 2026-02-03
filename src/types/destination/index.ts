export type Destination = Readonly<{
  id: string;
  name: string;
  description: string;
  region: string;
  subregion: string;
  topCities: readonly string[];
  similarDestinations: readonly string[];
  climate: string;
  expenditure: Readonly<Record<"single" | "couple", Cost>>;
  tags: readonly string[];
  inflationRate: number;
  lifeExpectancy: number;
  lifeExpectancyAfter65: number;
  populationDensity: string;
  retirementCommunity: string;
  englishUsage: string;
  crowds: string;
  ratings: Readonly<Record<RatingKey, Rating>>;
  grade: string;
  pros: readonly string[];
  cons: readonly string[];
  internationalLiving: boolean;
}>;

export type Cost = Readonly<{
  amount: number;
  currency: string;
}>;

export type Rating = Readonly<{
  label: string;
  grade: string;
}>;

type RatingKey =
  | "affordability"
  | "healthcareQuality"
  | "personalSafety"
  | "politicalStability"
  | "visaEase"
  | "taxEnvironment"
  | "infrastructure"
  | "weatherComfort"
  | "healthcareCost"
  | "economy";
