import {
  DoEconomicPhaseAction,
  doEconomicPhaseActionType,
  DoRecruitmentPhaseAction,
  doRecruitmentPhaseActionType,
} from "./actionTypes.ts";
import {
  doRecruitmentActionCreator,
  recruitUnitsActionCreator,
} from "./army/actionCreators.ts";
import { countryArmyReducer } from "./army/reducers.ts";
import { CountryArmy } from "./army/types.ts";
import {
  saveMoneyActionCreator,
  useManpowerActionCreator,
} from "./finances/actionCreators.ts";
import {
  CountryFinances,
  countryFinancesReducer,
} from "./finances/reducers.ts";
import { grantVictoryPointsActionCreator } from "./general/actionCreators.ts";
import { CountryGeneral, countryGeneralReducer } from "./general/reducers.ts";

export interface CountryState {
  name: string;
  identifier: string;
  canStoreManpower?: boolean;
  army: CountryArmy;
  general: CountryGeneral;
  finances: CountryFinances;
}

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
