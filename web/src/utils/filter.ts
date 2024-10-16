export const filterEven = <T>(array: T[]): T[] =>
  array?.filter((_, indice) => indice % 2 !== 0);

export const filterOdd = <T>(array: T[]): T[] =>
  array?.filter((_, indice) => indice % 2 === 0);