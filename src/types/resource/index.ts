export type Resource = Readonly<{
  destination: string;
  title: string;
  description: string;
  url: string;
  author: string;
  platform: string;
  date: string;
  tags: readonly string[];
}>;
