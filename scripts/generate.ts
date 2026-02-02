import assert from "node:assert";
import fs from "node:fs/promises";
import path from "node:path";
import url from "node:url";

import { parse } from "csv-parse/sync";

const ROOT = path.resolve(url.fileURLToPath(import.meta.url), "../../");

async function generateDestinations() {
  type ColName =
    | "id"
    | "name"
    | "description"
    | "region"
    | "subregion"
    | "top_cities"
    | "similar_destinations"
    | "climate"
    | "expenditure_single"
    | "expenditure_single_30_year"
    | "expenditure_single_30_year_with_inflation"
    | "expenditure_couple"
    | "expenditure_couple_30_year"
    | "expenditure_couple_30_year_with_inflation"
    | "tags"
    | "inflation"
    | "life_expectancy"
    | "life_expectancy_after_65"
    | "population_density"
    | "retirement_community"
    | "english_usage"
    | "crowds"
    | "affordability"
    | "healthcare_quality"
    | "personal_safety"
    | "political_stability"
    | "visa_ease"
    | "tax_environment"
    | "infrastructure"
    | "weather_comfort"
    | "healthcare_cost"
    | "economy"
    | "grade"
    | "pros"
    | "cons"
    | "international_living";

  type Row = Readonly<Record<ColName, string>>;

  const source = path.resolve(ROOT, "./data/csv/destinations.csv");
  const sink = path.resolve(ROOT, "./src/data/destinations.json");

  const csv = await fs.readFile(source, { encoding: "utf8" });
  const parsed: readonly Row[] = parse(csv, { columns: true });

  const destinations = parsed.map((row) => {
    return {
      id: row["id"],
      name: row["name"],
      description: row["description"],
      region: row["region"],
      subregion: row["subregion"],
      topCities: row["top_cities"].split(":"),
      similarDestinations: row["similar_destinations"].split(":"),
      climate: row["climate"],
      expenditure: {
        single: {
          monthly: toMoney(row["expenditure_single"]),
          thirtyYearWithInflation: toMoney(
            row["expenditure_single_30_year_with_inflation"],
          ),
        },
        couple: {
          monthly: toMoney(row["expenditure_couple"]),
          thirtyYearWithInflation: toMoney(
            row["expenditure_couple_30_year_with_inflation"],
          ),
        },
      },
      tags: row["tags"].split(":"),
      inflation: parseFloat(row["inflation"]) / 100,
      lifeExpectancy: parseInt(row["life_expectancy"]),
      lifeExpectancyAfter65: parseInt(row["life_expectancy_after_65"]),
      populationDensity: row["population_density"],
      retirementCommunity: row["retirement_community"],
      englishUsage: row["english_usage"],
      crowds: row["crowds"],
      ratings: {
        affordability: toRating(row["affordability"]),
        healthcareQuality: toRating(row["healthcare_quality"]),
        personalSafety: toRating(row["personal_safety"]),
        politicalStability: toRating(row["political_stability"]),
        visaEase: toRating(row["visa_ease"]),
        taxEnvironment: toRating(row["tax_environment"]),
        infrastructure: toRating(row["infrastructure"]),
        weatherComfort: toRating(row["weather_comfort"]),
        healthcareCost: toRating(row["healthcare_cost"]),
        economy: toRating(row["economy"]),
      },
      grade: row["grade"],
      pros: row["pros"].split(":"),
      cons: row["cons"].split(":"),
      internationalLiving: row["international_living"] === "TRUE",
    };
  });

  fs.writeFile(sink, JSON.stringify(destinations, null, 2));
}

function toMoney(value: string): { currency: string; amount: number } {
  const currency = "$";
  const amount = parseInt(value.replaceAll(",", ""));

  const message = `unable to parse amonut from ${value}`;
  assert.notStrictEqual(amount, NaN, message);

  return { currency, amount };
}

function toRating(value: string): { label: string; grade: string } {
  const [grade, label] = value.split(":");

  assert(grade, `unable to read grade from ${value}`);
  assert(label, `unable to read label from ${value}`);

  assert(grade.length === 1, `invalid grade ${grade} from ${value}`);

  return { label, grade };
}

async function generateCities() {
  type ColName = "id" | "name" | "country" | "description";
  type Row = Readonly<Record<ColName, string>>;

  const source = path.resolve(ROOT, "./data/csv/cities.csv");
  const sink = path.resolve(ROOT, "./src/data/cities.json");

  const csv = await fs.readFile(source, { encoding: "utf8" });
  const parsed: readonly Row[] = parse(csv, { columns: true });

  const cities = parsed.map((row) => {
    return {
      id: row["id"],
      name: row["name"],
      country: row["country"],
      description: row["description"],
    };
  });

  fs.writeFile(sink, JSON.stringify(cities, null, 2));
}

generateDestinations();
generateCities();
