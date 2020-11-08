import { Month } from "../commonTypes.ts";
import { DoRecruitmentAction } from "./army/actionTypes.ts";
import { Recruitment } from "./army/types.ts";

export const doRecruitmentPhaseActionType = "country/doRecruitmentPhase";
export type RecruitmentPhaseData = DoRecruitmentAction["payload"];
export interface DoRecruitmentPhaseAction {
  type: typeof doRecruitmentPhaseActionType;
  payload: {
    month: Month;
    year: number;
  };
}

export const doEconomicPhaseActionType = "country/doEconomicPhase";
export interface EconomicPhaseData {
  income: number;
  manpower: number;
  expenses: number;
  recruitment: number;
  recruitments: Recruitment[];
  victoryPointGain: number;
}
export interface DoEconomicPhaseAction {
  type: typeof doEconomicPhaseActionType;
  payload: EconomicPhaseData;
}
