import { RecruitmentPhaseData, EconomicPhaseData } from "../country/actionTypes.ts";

export const doRecruitmentPhasesActionType = "countries/doRecruitmentPhases";
export type RecruitmentPhasesData = Record<string, RecruitmentPhaseData>;
export interface DoRecruitmentPhasesAction {
  type: typeof doRecruitmentPhasesActionType;
  payload: RecruitmentPhasesData;
}

export const doEconomicPhasesActionType = "countries/doEconomicPhases";
export type EconomicPhasesData = Record<string, EconomicPhaseData>;
export interface DoEconomicPhasesAction {
  type: typeof doEconomicPhasesActionType;
  payload: EconomicPhasesData;
}
