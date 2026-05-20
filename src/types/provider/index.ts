export type ProviderCategory =
  | "Visa / Immigration"
  | "Banking"
  | "Tax & Financial Planning"
  | "Relocation Services"
  | "Healthcare"
  | "Health Insurance";

export type Provider = Readonly<{
  id: string;
  destination: string;
  name: string;
  website: string;
  contact: string;
  address?: string;
  description: string;
  category: ProviderCategory;
  partnered: boolean;
}>;

export type ProviderCategoryInfo = Readonly<{
  id: ProviderCategory;
  description: string;
}>;
