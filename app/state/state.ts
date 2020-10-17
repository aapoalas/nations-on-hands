import {
  CommonState,
  commonReducer,
  EconomicMonth,
  advanceTurnAction,
} from "./common.ts";
import {
  CountriesState,
  countriesReducer,
  EconomicPhasesData,
  doEconomicPhasesActionCreator,
} from "./countries.ts";

export interface GameState {
  common: CommonState;
  countries: CountriesState;
}

const advanceStateActionType = "advanceState";
interface AdvanceStateAction {
  type: typeof advanceStateActionType;
  payload?: EconomicPhasesData;
}
export const advanceStateActionCreator = (payload?: EconomicPhasesData): AdvanceStateAction => ({
    type: advanceStateActionType,
    payload,
});

export const stateReducer = (state: GameState, action: AdvanceStateAction) => {
  let countries = state.countries;
  if (state.common.month in EconomicMonth) {
    if (!action.payload) {
      throw new Error("Missing economic phase data");
    }
    countries = countriesReducer(
      countries,
      doEconomicPhasesActionCreator(action.payload)
    );
  }
  const common = commonReducer(state.common, advanceTurnAction);
  return countries !== state.countries || common !== state.common
    ? {
        common,
        countries,
      }
    : state;
};
