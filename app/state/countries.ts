import {
  countryReducer,
  CountryState,
  doRecruitmentPhaseActionCreator,
  RecruitmentPhaseData,
  doEconomicPhaseActionCreator,
  EconomicPhaseData,
} from "./country/country.ts";

const doRecruitmentPhasesActionType = "countries/doRecruitmentPhases";
export type RecruitmentPhasesData = RecruitmentPhaseData;
interface DoRecruitmentPhasesAction {
  type: typeof doRecruitmentPhasesActionType;
  payload: RecruitmentPhasesData;
}
export const doRecruitmentPhasesActionCreator = (
  payload: RecruitmentPhasesData
): DoRecruitmentPhasesAction => ({
  type: doRecruitmentPhasesActionType,
  payload,
});

const doEconomicPhasesActionType = "countries/doEconomicPhases";
export type EconomicPhasesData = Record<string, EconomicPhaseData>;
interface DoEconomicPhasesAction {
  type: typeof doEconomicPhasesActionType;
  payload: EconomicPhasesData;
}
export const doEconomicPhasesActionCreator = (
  payload: EconomicPhasesData
): DoEconomicPhasesAction => ({
  type: doEconomicPhasesActionType,
  payload,
});

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
    const nextState: CountriesState = new Map();
    for (const [countryId, countryState] of state) {
      if (!(countryId in action.payload)) {
        nextState.set(countryId, countryState);
      } else {
        nextState.set(
          countryId,
          countryReducer(
            countryState,
            doRecruitmentPhaseActionCreator(action.payload)
          )
        );
      }
    }
    return nextState;
  }
  return state;
};
