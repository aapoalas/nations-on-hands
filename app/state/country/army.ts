import { Month } from "../common.ts";

export const enum CorpsStatus {
  "Inactive" = 0,
  "Reserve" = 1,
  "Active" = 2,
}

export type FactorType = "guards" | "infantry" | "cavalry" | "artillery";

export type CorpsSize = Record<FactorType, number>;

interface Factor {
  name: string;
  type: FactorType;
  morale: number;
}

export type CorpsComposition = Record<FactorType, Factor[]>;

export interface InactiveCorps {
  status: CorpsStatus.Inactive;
  size: CorpsSize;
}

export interface ReserveCorps {
  status: CorpsStatus.Reserve;
  size: CorpsSize;
  composition: CorpsComposition;
}

export interface ActiveCorps {
  status: CorpsStatus.Active;
  size: CorpsSize;
  composition: CorpsComposition;
}

type Corps = InactiveCorps | ReserveCorps | ActiveCorps;

export interface Recruitment {
  month: Month;
  year: number;
  type: FactorType;
  morale: number;
  count: number;
}

export interface CountryArmy {
  corps: Map<string, Corps>;
  recruitment: Recruitment[];
}

export interface Placement {
  type: FactorType;
  morale: number;
  count: number;
}

export type Placements = Record<string, Placement[]>;

const automaticRecruitment = (
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
        (corps.status === CorpsStatus.Active &&
          corps.size[type] > corps.composition[type].length) ||
        corps.status === CorpsStatus.Reserve
      ) {
        const addedFactors = Math.min(
          count,
          corps.size[type] - corps.composition[type].length,
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

const doRecruitmentActionType = "army/doRecruitment";
export interface DoRecruitmentAction {
  type: typeof doRecruitmentActionType;
  payload: { month: Month; year: number };
}
export const doRecruitmentActionCreator = (payload: {
  month: Month;
  year: number;
}): DoRecruitmentAction => ({
  type: doRecruitmentActionType,
  payload,
});

const recruitUnitsActionType = "army/recruitUnits";
export interface RecruitUnitsAction {
  type: typeof recruitUnitsActionType;
  payload: Recruitment[];
}
export const recruitUnitsActionCreator = (
  payload: Recruitment[],
): RecruitUnitsAction => ({
  type: recruitUnitsActionType,
  payload,
});

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
