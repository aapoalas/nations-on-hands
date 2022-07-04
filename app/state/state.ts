import { advanceGameActionCreator } from "./common/actionCreators.ts";
import { commonReducer, CommonState } from "./common/reducers.ts";
import { EconomicMonth, TurnPhase } from "./commonTypes.ts";
import {
  configurationReducer,
  ConfigurationState,
} from "./configuration/reducers.ts";
import {
  doEconomicPhasesActionCreator,
  doRecruitmentPhasesActionCreator,
} from "./countries/actionCreators.ts";
import {
  EconomicPhasesData,
  RecruitmentPhasesData,
} from "./countries/actionTypes.ts";
import { countriesReducer, CountriesState } from "./countries/reducers.ts";

export interface GameState {
  common: CommonState;
  configuration: ConfigurationState;
  countries: CountriesState;
}

const advanceStateActionType = "advanceState";
export interface AdvanceStateAction {
  type: typeof advanceStateActionType;
  payload?: RecruitmentPhasesData | EconomicPhasesData;
}
export const advanceStateActionCreator = (
  payload?: RecruitmentPhasesData | EconomicPhasesData,
): AdvanceStateAction => ({
  type: advanceStateActionType,
  payload,
});

export const stateReducer = (state: GameState, action: AdvanceStateAction) => {
  let countries = state.countries;
  if (
    state.common.month in EconomicMonth &&
    state.common.phase === TurnPhase.Economic
  ) {
    if (!action.payload) {
      throw new Error("Missing economic phase data");
    }
    countries = countriesReducer(
      countries,
      doEconomicPhasesActionCreator(action.payload as EconomicPhasesData),
    );
  } else if (state.common.phase === TurnPhase.Reinforcement) {
    countries = countriesReducer(
      countries,
      doRecruitmentPhasesActionCreator(action.payload as RecruitmentPhasesData),
    );
  }
  const common = commonReducer(
    state.common,
    advanceGameActionCreator(state.configuration.common),
  );
  const configuration = configurationReducer(state.configuration);
  return countries !== state.countries || common !== state.common ||
      configuration !== state.configuration
    ? {
      common,
      countries,
      configuration,
    }
    : state;
};
