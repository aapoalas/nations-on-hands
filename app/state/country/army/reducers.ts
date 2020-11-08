import {
  DoRecruitmentAction,
  doRecruitmentActionType,
  RecruitUnitsAction,
  recruitUnitsActionType,
} from "./actionTypes.ts";
import { ActiveCorps, CorpsStatus, CountryArmy, Placements } from "./types.ts";
import { automaticRecruitment } from "./utils.ts";

const doRecruitmentPhase = (
  state: CountryArmy,
  placements: Placements,
): CountryArmy => {
  const recruitment = state.recruitment;
  const { month, year } = recruitment[0];

  const newState = {
    recruitment: recruitment.filter(
      (recr) => recr.year > year || recr.month > month,
    ),
    corps: new Map(state.corps),
  };
  const newCorps = newState.corps;

  for (const corpsName in placements) {
    if (!newCorps.has(corpsName)) {
      throw new TypeError("Invalid corps name, not found in country corps");
    }
    const prevCorps = newCorps.get(corpsName)!;
    if (prevCorps.status === CorpsStatus.Inactive) {
      throw new TypeError("Invalid corps name, corps is inactive");
    }
    const nextCorps: ActiveCorps = {
      composition: { ...prevCorps.composition },
      size: prevCorps.size, // Corps size never changes
      status: CorpsStatus.Active,
    };
    newCorps.set(corpsName, nextCorps);
    for (const placement of placements[corpsName]) {
      const { count, type, morale } = placement;
      if (count + nextCorps.composition[type].length > nextCorps.size[type]) {
        throw new TypeError("Invalid placement, corps overflows");
      }
      nextCorps.composition[type] = nextCorps.composition[type].concat(
        ...Array.from({ length: count }, (_v, k) => ({
          name: "Foo",
          type,
          morale,
        })),
      );
    }
  }

  return newState;
};

export const countryArmyReducer = (
  state: CountryArmy,
  action: DoRecruitmentAction | RecruitUnitsAction,
): CountryArmy => {
  if (action.type === doRecruitmentActionType) {
    const placement = automaticRecruitment(state, action.payload);
    if (Object.keys(placement).length === 0) {
      return state;
    }
    return doRecruitmentPhase(state, placement);
  } else if (action.type === recruitUnitsActionType) {
    if (action.payload.length === 0) {
      return state;
    }
    return {
      ...state,
      recruitment: state.recruitment
        .concat(...action.payload)
        .sort((a, b) => a.year - b.year || a.month - b.month),
    };
  }
  return state;
};
