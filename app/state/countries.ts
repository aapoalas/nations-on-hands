import {
    countryReducer,
    CountryState,
    doEconomicPhaseActionCreator,
    EconomicPhaseData
} from "./country/country.ts";

const doEconomicPhasesActionType = "countries/doEconomicPhases";
export type EconomicPhasesData = Record<string, EconomicPhaseData>;
interface DoEconomicPhasesAction {
    type: typeof doEconomicPhasesActionType;
    payload: EconomicPhasesData;
}
export const doEconomicPhasesActionCreator = (payload: EconomicPhasesData): DoEconomicPhasesAction => ({
    type: doEconomicPhasesActionType,
    payload,
});

export type CountriesState = Map<string, CountryState>;

export const countriesReducer = (
  state: CountriesState,
  action: DoEconomicPhasesAction
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
  }
  return state;
};