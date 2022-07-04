import { Month } from "../state/commonTypes.ts";
import { FactorType, Recruitment } from "../state/country/army/types.ts";

const romanBaseNumerals = {
  1: "I",
  2: "II",
  3: "III",
  4: "IV",
  5: "V",
  6: "VI",
  7: "VII",
  8: "VIII",
  9: "IX",
  10: "X",
};

const getRomanNumeral = (number: number): string => {
  if (number <= 10) {
    return romanBaseNumerals[number as keyof typeof romanBaseNumerals];
  }
  let value = "";
  const tens = Math.trunc(number / 10);
  for (let i = 0; i < tens; i++) {
    value += "X";
  }
  value +=
    romanBaseNumerals[(number - tens * 10) as keyof typeof romanBaseNumerals];
  return value;
};

export const createFactors = (
  count: number,
  type: FactorType,
  baseText: string,
  morale: 2 | 2.5 | 3 | 3.5 | 4 | 4.5 | 5 = 3,
) =>
  Array.from({ length: count }, (_v, index) => ({
    type,
    morale,
    name: baseText.replace("#", getRomanNumeral(index + 1)),
  }));

export const createReinforcement = (
  count: number,
  type: FactorType,
  { month, year }: { month: Month; year: number },
  morale?: 2 | 2.5 | 3 | 3.5 | 4 | 4.5 | 5,
): Recruitment => ({
  count,
  type,
  morale: morale as number,
  month,
  year,
});
