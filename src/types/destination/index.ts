export type Country = Readonly<{
  id: string;
  name: string;
  region: string;
  subregion: string;
  climate: string;
  tags: readonly string[];
  image: string;
  grade: string;
  expenditure: {
    single: Readonly<{
      currency: string;
      amount: number;
    }>;
    couple: Readonly<{
      currency: string;
      amount: number;
    }>;
  };
  ratings: {
    affordability: {
      grade: string;
      text: string;
    };
    economy: {
      grade: string;
      text: string;
    };
    healthcareCost: {
      grade: string;
      text: string;
    };
    healthcareQuality: {
      grade: string;
      text: string;
    };
    infrastructure: {
      grade: string;
      text: string;
    };
    personalSafety: {
      grade: string;
      text: string;
    };
    politicalStability: {
      grade: string;
      text: string;
    };
    taxEnvironment: {
      grade: string;
      text: string;
    };
    visaEase: {
      grade: string;
      text: string;
    };
    weatherComfort: {
      grade: string;
      text: string;
    };
  };
}>;
