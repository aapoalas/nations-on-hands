import {
  doEconomicPhaseActionCreator,
  doRecruitmentPhaseActionCreator,
} from "../country/actionCreators.ts";
import { countryReducer, CountryState } from "../country/reducers.ts";
import {
  DoRecruitmentPhasesAction,
  DoEconomicPhasesAction,
  doEconomicPhasesActionType,
  doRecruitmentPhasesActionType,
} from "./actionTypes.ts";

export type CountriesState = Map<string, CountryState>;

export const countriesReducer = (
  state: CountriesState,
  action: DoRecruitmentPhasesAction | DoEconomicPhasesAction
): CountriesState => {
  if (action.type === doEconomicPhasesActionType) {
    const nextState: CountriesState = new Map();
    for (const [countryId, countryState] of state) {
      if (!(countryId in action.payload)) {
        throw new TypeError(
          "Missing country id in economic phases action payload"
        );
      }
      nextState.set(
        countryId,
        countryReducer(
          countryState,
          doEconomicPhaseActionCreator(action.payload[countryId])
        )
      );
    }
    return nextState;
  } else if (action.type === doRecruitmentPhasesActionType) {
    const nextState: CountriesState = new Map(state);
    for (const [countryId, countryState] of state) {
      if (!(countryId in action.payload)) {
          // Nothing to recruit
        continue;
      }
      nextState.set(
        countryId,
        countryReducer(
          countryState,
          doRecruitmentPhaseActionCreator(action.payload[countryId])
        )
      );
    }
    return nextState;
  }
  return state;
};
