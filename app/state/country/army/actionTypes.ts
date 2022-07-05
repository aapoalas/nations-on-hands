import { Placements, Recruitment } from "./types.ts";

export const doRecruitmentActionType = "country/army/doRecruitment";
export interface DoRecruitmentAction {
  readonly type: typeof doRecruitmentActionType;
  readonly payload: Placements;
}

export const recruitUnitsActionType = "country/army/recruitUnits";
export interface RecruitUnitsAction {
  readonly type: typeof recruitUnitsActionType;
  readonly payload: readonly Recruitment[];
}
