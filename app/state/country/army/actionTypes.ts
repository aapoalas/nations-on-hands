import { Month } from "../../commonTypes.ts";
import { Recruitment } from "./types.ts";

export const doRecruitmentActionType = "country/army/doRecruitment";
export interface DoRecruitmentAction {
  type: typeof doRecruitmentActionType;
  payload: { month: Month; year: number };
}

export const recruitUnitsActionType = "country/army/recruitUnits";
export interface RecruitUnitsAction {
  type: typeof recruitUnitsActionType;
  payload: Recruitment[];
}
