import Ajv2020 from "ajv/dist/2020";

import type { Destination } from "@/types/destination";

import Schema from "./schema.json";

const ajv = new Ajv2020({ allErrors: true });

export const validate = ajv.compile<Destination>(Schema);

export function parse(data: unknown): Destination {
  if (validate(data)) {
    return data;
  }

  throw new TypeError("[parse failure]: Destination");
}
