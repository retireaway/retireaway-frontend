export type Answer = Readonly<{
  slug: string;
  title: string;
}>;

export type Question = Readonly<{
  slug: string;
  title: string;
  description: string;
  answers: readonly string[]; // Answer slugs
}>;

export type Criterion = Readonly<{
  slug: string;
  description: string;
}>;

export type AnswersToCriterionMapping = Readonly<Record<string, readonly string[]>>; // answerSlug -> criterionSlugs[]

export type MatchmakerResult = Readonly<{
  destinationId: string;
  score: number;
  matchedCriteria: readonly string[];
}>;
