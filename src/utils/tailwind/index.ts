type Stringable =
  | string
  | number
  | boolean
  | bigint
  | null
  | undefined
  | {
      [index: string]: unknown;
      toString: <T extends unknown[]>(...x: T) => string;
    };

export function tw(xs: readonly string[], ...values: Stringable[]): string {
  return String.raw({ raw: xs }, ...values);
}
