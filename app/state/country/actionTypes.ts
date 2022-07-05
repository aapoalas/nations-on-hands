import { Placements, Recruitment } from "./army/types.ts";

export const doRecruitmentPhaseActionType = "country/doRecruitmentPhase";
export type RecruitmentPhaseData = Placements;
export interface DoRecruitmentPhaseAction {
  readonly type: typeof doRecruitmentPhaseActionType;
  readonly payload: Placements;
}

export const doEconomicPhaseActionType = "country/doEconomicPhase";
export interface EconomicPhaseData {
  readonly income: number;
  readonly manpower: number;
  readonly expenses: number;
  readonly recruitment: number;
  readonly recruitments: Recruitment[];
  readonly victoryPointGain: number;
}
export interface DoEconomicPhaseAction {
  readonly type: typeof doEconomicPhaseActionType;
  readonly payload: EconomicPhaseData;
}
