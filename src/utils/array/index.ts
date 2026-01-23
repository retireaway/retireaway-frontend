export function preferentialSort<T, U>(
  xs: readonly T[],
  ordering: readonly U[],
  eq: (item: T, orderingItem: U) => boolean,
) {
  return Array.from(xs).sort((a, b) => {
    const idxA = ordering.findIndex((o) => eq(a, o));

    const idxB = ordering.findIndex((o) => eq(b, o));

    const bothAbsent = Math.max(idxA, idxB) < 0;
    const bothPresent = -1 < Math.min(idxA, idxB);

    return bothPresent || bothAbsent ? idxA - idxB : idxB - idxA;
  });
}
