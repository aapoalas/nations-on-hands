import { Placements, Recruitment } from "./army/types.ts";

export const doRecruitmentPhaseActionType = "country/doRecruitmentPhase";
export type RecruitmentPhaseData = Placements;
export interface DoRecruitmentPhaseAction {
  type: typeof doRecruitmentPhaseActionType;
  payload: Placements;
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
