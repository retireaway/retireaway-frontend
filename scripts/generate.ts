import assert from "node:assert";
import fs from "node:fs/promises";
import path from "node:path";
import url from "node:url";

import { parse } from "csv-parse/sync";

const root = path.resolve(url.fileURLToPath(import.meta.url), "../../");

async function getCountries() {
  type Row = Readonly<{
    id: string;
    name: string;
    region: string;
    subregion: string;
    climate: string;
    expenditure_single: string;
    expenditure_couple: string;
    tags: string;
    cover_image: string;
    grade: string;
  }>;

  const source = path.resolve(root, "./data/csv/countries.csv");

  const csv = await fs.readFile(source, { encoding: "utf8" });
  const parsed: readonly Row[] = parse(csv, { columns: true });

  const countries = parsed.map((row) => {
    return {
      id: row["id"],
      name: row["name"],
      region: row["region"],
      subregion: row["subregion"],
      climate: row["climate"],
      tags: row["tags"].split(":"),
      image: row["cover_image"],
      grade: row["grade"],
      expenditure: {
        single: {
          currency: row["expenditure_single"].slice(0, 1),
          amount: parseInt(row["expenditure_single"].slice(1).replace(",", "")),
        },
        couple: {
          currency: row["expenditure_couple"].slice(0, 1),
          amount: parseInt(row["expenditure_couple"].slice(1).replace(",", "")),
        },
      },
    } as const;
  });

  return countries;
}

async function getRatingGrade() {
  type Row = Readonly<{
    country: string;
    affordability: string;
    economy: string;
    healthcare_cost: string;
    healthcare_quality: string;
    infrastructure: string;
    personal_safety: string;
    political_stability: string;
    tax_environment: string;
    visa_ease: string;
    weather_comfort: string;
  }>;

  const source = path.resolve(root, "./data/csv/rating-grade.csv");

  const csv = await fs.readFile(source, { encoding: "utf8" });
  const parsed: readonly Row[] = parse(csv, { columns: true });

  const ratings = parsed.map((row) => {
    return {
      id: row["country"],
      affordability: row["affordability"],
      economy: row["economy"],
      healthcareCost: row["healthcare_cost"],
      healthcareQuality: row["healthcare_quality"],
      infrastructure: row["infrastructure"],
      personalSafety: row["personal_safety"],
      politicalStability: row["political_stability"],
      taxEnvironment: row["tax_environment"],
      visaEase: row["visa_ease"],
      weatherComfort: row["weather_comfort"],
    } as const;
  });

  return ratings;
}

async function getRatingText() {
  type Row = Readonly<{
    country: string;
    affordability: string;
    economy: string;
    healthcare_cost: string;
    healthcare_quality: string;
    infrastructure: string;
    personal_safety: string;
    political_stability: string;
    tax_environment: string;
    visa_ease: string;
    weather_comfort: string;
  }>;

  const source = path.resolve(root, "./data/csv/rating-text.csv");

  const csv = await fs.readFile(source, { encoding: "utf8" });
  const parsed: readonly Row[] = parse(csv, { columns: true });

  const ratings = parsed.map((row) => {
    return {
      id: row["country"],
      affordability: row["affordability"],
      economy: row["economy"],
      healthcareCost: row["healthcare_cost"],
      healthcareQuality: row["healthcare_quality"],
      infrastructure: row["infrastructure"],
      personalSafety: row["personal_safety"],
      politicalStability: row["political_stability"],
      taxEnvironment: row["tax_environment"],
      visaEase: row["visa_ease"],
      weatherComfort: row["weather_comfort"],
    } as const;
  });

  return ratings;
}

async function final() {
  const countries = await getCountries();
  const ratingsGrade = await getRatingGrade();
  const ratingsText = await getRatingText();

  return countries.map((country, index) => {
    const ratingGrade = ratingsGrade[index];
    const ratingText = ratingsText[index];

    const keys = [
      "affordability",
      "economy",
      "healthcareCost",
      "healthcareQuality",
      "infrastructure",
      "personalSafety",
      "politicalStability",
      "taxEnvironment",
      "visaEase",
      "weatherComfort",
    ] as const;

    assert(ratingGrade);
    assert(ratingText);

    const entries = [
      ...keys.map((rating) => {
        const grade = ratingGrade[rating];
        const text = ratingText[rating];
        return [rating, { grade, text } as const] as const;
      }),
    ] as const;

    const ratings = Object.fromEntries(entries);

    return {
      ...country,
      ratings: ratings,
    };
  });
}

{
  const countries = await final();
  const output = path.resolve(root, "./src/data/countries.json");
  await fs.writeFile(output, JSON.stringify(countries, null, 2));
}
