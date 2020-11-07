import { Month } from "../common.ts";
import {
  CountryArmy,
  countryArmyReducer,
  DoRecruitmentAction,
  doRecruitmentActionCreator,
  Recruitment,
  recruitUnitsActionCreator,
} from "./army.ts";
import {
  CountryFinances,
  countryFinancesReducer,
  saveMoneyActionCreator,
  useManpowerActionCreator,
} from "./finances.ts";
import {
  CountryGeneral,
  countryGeneralReducer,
  grantVictoryPointsActionCreator,
} from "./general.ts";

export interface CountryState {
  name: string;
  identifier: string;
  canStoreManpower?: boolean;
  army: CountryArmy;
  general: CountryGeneral;
  finances: CountryFinances;
}

const doRecruitmentPhaseActionType = "country/doRecruitmentPhase";
export type RecruitmentPhaseData = DoRecruitmentAction["payload"];
interface DoRecruitmentPhaseAction {
  type: typeof doRecruitmentPhaseActionType;
  payload: {
    month: Month;
    year: number;
  };
}
export const doRecruitmentPhaseActionCreator = (
  payload: RecruitmentPhaseData,
): DoRecruitmentPhaseAction => ({
  type: doRecruitmentPhaseActionType,
  payload,
});

const doEconomicPhaseActionType = "country/doEconomicPhase";
export interface EconomicPhaseData {
  income: number;
  manpower: number;
  expenses: number;
  recruitment: number;
  recruitments: Recruitment[];
  victoryPointGain: number;
}
interface DoEconomicPhaseAction {
  type: typeof doEconomicPhaseActionType;
  payload: EconomicPhaseData;
}
export const doEconomicPhaseActionCreator = (
  payload: EconomicPhaseData,
): DoEconomicPhaseAction => ({
  type: doEconomicPhaseActionType,
  payload,
});

export const countryReducer = (
  state: CountryState,
  action: DoRecruitmentPhaseAction | DoEconomicPhaseAction,
) => {
  if (action.type === doEconomicPhaseActionType) {
    const general = countryGeneralReducer(
      state.general,
      grantVictoryPointsActionCreator(action.payload.victoryPointGain),
    );

    let finances: CountryFinances;
    if (action.payload.income === action.payload.expenses) {
      finances = state.finances;
    } else if (action.payload.income > action.payload.expenses) {
      finances = countryFinancesReducer(
        state.finances,
        saveMoneyActionCreator(action.payload.income - action.payload.expenses),
      );
    } else {
      finances = countryFinancesReducer(
        state.finances,
        saveMoneyActionCreator(action.payload.expenses - action.payload.income),
      );
    }

    if (
      action.payload.recruitment !== action.payload.manpower &&
      state.canStoreManpower
    ) {
      finances = countryFinancesReducer(
        finances,
        useManpowerActionCreator(
          action.payload.manpower - action.payload.recruitment,
        ),
      );
    }

    let army: CountryArmy;
    if (action.payload.recruitments.length > 0) {
      army = countryArmyReducer(
        state.army,
        recruitUnitsActionCreator(action.payload.recruitments),
      );
    } else {
      army = state.army;
    }

    if (
      state.general !== general || state.finances !== finances ||
      state.army !== army
    ) {
      return {
        ...state,
        general,
        finances,
        army,
      };
    }
  } else if (action.type = doRecruitmentPhaseActionType) {
    return {
      ...state,
      army: countryArmyReducer(
        state.army,
        doRecruitmentActionCreator(action.payload),
      ),
    };
  }

  return state;
};
