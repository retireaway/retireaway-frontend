import type { Destination } from "@/types/destination";
import answersToCriterion from "@/data/answers_to_criterion.json" with { type: "json" };

/**
 * Evaluates if a destination meets a specific criterion slug.
 * This is based on the rules defined in criteria.json but implemented in code.
 */
export function evaluateCriterion(destination: Destination, slug: string): boolean {
  switch (slug) {
    case "affordability-high":
      return ["A", "B"].includes(destination.ratings.affordability.grade);
    case "healthcare-cost-low":
      return ["A", "B"].includes(destination.ratings.healthcareCost.grade);
    case "affordability-mid":
      return ["B", "C"].includes(destination.ratings.affordability.grade);
    case "infrastructure-high":
      return destination.ratings.infrastructure.grade === "A";
    case "grade-high":
      return ["A", "B"].includes(destination.grade);
    case "climate-tropical":
      return ["Tropical", "Subtropical"].includes(destination.climate);
    case "tag-beach-living":
      return destination.tags.includes("Beach Living");
    case "climate-mediterranean":
      return destination.climate === "Mediterranean";
    case "tag-warm-weather":
      return destination.tags.includes("Warm Weather");
    case "climate-temperate":
      return destination.climate === "Temperate";
    case "climate-cold":
      return destination.climate === "Cold";
    case "tag-mountain-living":
      return destination.tags.includes("Mountain Living");
    case "healthcare-quality-high":
      return destination.ratings.healthcareQuality.grade === "A";
    case "pro-healthcare-access":
      return destination.pros.includes("strong-healthcare-access");
    case "healthcare-quality-good":
      return ["A", "B"].includes(destination.ratings.healthcareQuality.grade);
    case "pro-improving-healthcare":
      return destination.pros.includes("improving-healthcare");
    case "english-widely-spoken":
      return destination.englishUsage === "Widely Spoken";
    case "pro-english-friendly":
      return destination.pros.includes("english-friendly");
    case "english-commonly-used":
      return destination.englishUsage === "Commonly Used";
    case "community-thriving":
      return destination.retirementCommunity === "Thriving Hub";
    case "pro-expat-community":
      return destination.pros.includes("strong-expat-community");
    case "community-established":
      return destination.retirementCommunity === "Established";
    case "crowds-tranquil":
      return destination.crowds === "Tranquil";
    case "pro-low-crowds":
      return destination.pros.includes("low-crowds");
    case "visa-ease-high":
      return ["A", "B"].includes(destination.ratings.visaEase.grade);
    case "pro-easy-visa-access":
      return destination.pros.includes("easy-visa-access");
    default:
      return false;
  }
}

export interface MatchResult {
  destination: Destination;
  score: number;
  matchedCriteria: string[];
  totalCriteria: number;
}

/**
 * Ranks destinations based on user answers.
 */
export function rankDestinations(
  destinations: readonly Destination[],
  selectedAnswers: Record<string, string>
): MatchResult[] {
  // 1. Get all corresponding criteria slugs from answers
  const selectedCriteriaSlugs = Object.values(selectedAnswers).flatMap(
    (answerSlug) => (answersToCriterion as Record<string, string[]>)[answerSlug] || []
  );

  const totalCriteria = selectedCriteriaSlugs.length;

  // 2. Map over destinations and calculate scores
  const results: MatchResult[] = destinations.map((destination) => {
    const matchedCriteria: string[] = [];

    selectedCriteriaSlugs.forEach((slug) => {
      if (evaluateCriterion(destination, slug)) {
        matchedCriteria.push(slug);
      }
    });

    const score = totalCriteria > 0 
      ? Math.round((matchedCriteria.length / totalCriteria) * 100) 
      : 0;

    return {
      destination,
      score,
      matchedCriteria,
      totalCriteria,
    };
  });

  // 3. Sort by score descending
  return results.sort((a, b) => b.score - a.score);
}
