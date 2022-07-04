import { PlayerCountryID } from "../commonTypes.ts";
import {
  EconomicPhaseData,
  RecruitmentPhaseData,
} from "../country/actionTypes.ts";

export const doRecruitmentPhasesActionType = "countries/doRecruitmentPhases";
export type RecruitmentPhasesData = Record<
  PlayerCountryID,
  RecruitmentPhaseData
>;
export interface DoRecruitmentPhasesAction {
  type: typeof doRecruitmentPhasesActionType;
  payload: RecruitmentPhasesData;
}

export const doEconomicPhasesActionType = "countries/doEconomicPhases";
export type EconomicPhasesData = Record<PlayerCountryID, EconomicPhaseData>;
export interface DoEconomicPhasesAction {
  type: typeof doEconomicPhasesActionType;
  payload: EconomicPhasesData;
}
