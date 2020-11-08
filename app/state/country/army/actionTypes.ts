import { Placements, Recruitment } from "./types.ts";

export const doRecruitmentActionType = "country/army/doRecruitment";
export interface DoRecruitmentAction {
  type: typeof doRecruitmentActionType;
  payload: Placements;
}

export const recruitUnitsActionType = "country/army/recruitUnits";
export interface RecruitUnitsAction {
  type: typeof recruitUnitsActionType;
  payload: Recruitment[];
}
