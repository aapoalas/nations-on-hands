import { Month } from "../../commonTypes.ts";
import { ActiveCorps, CountryArmy, Placement, Placements } from "./types.ts";

export const automaticRecruitment = (
  state: CountryArmy,
  date: { month: Month; year: number },
): Placements => {
  if (state.recruitment.length === 0) {
    return {};
  }
  const nextRecruitment = state.recruitment.findIndex(
    (recr) => recr.year > date.year || recr.month > date.month,
  );
  if (nextRecruitment < 1) {
    return {};
  }

  const recruitments = state.recruitment.slice(0, nextRecruitment);

  const placements: Record<string, Placement[]> = {};
  for (const recruitment of recruitments) {
    let count = recruitment.count;
    const { type, morale } = recruitment;
    for (const [name, corps] of state.corps) {
      if (count === 0) {
        break;
      }
      if (
        (corps.status === 2 &&
          corps.size[type] > (corps as ActiveCorps).composition[type].length) ||
        corps.status === 1
      ) {
        const addedFactors = Math.min(
          count,
          corps.size[type] - (corps as ActiveCorps).composition[type].length,
        );
        if (!(name in placements)) {
          placements[name] = [];
        }
        placements[name].push({
          count: addedFactors,
          type,
          morale,
        });
        count -= addedFactors;
        if (count <= 0) {
          break;
        }
      }
    }
  }
  return placements;
};
