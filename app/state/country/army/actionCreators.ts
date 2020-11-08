import { Month } from "../../commonTypes.ts";
import {
  DoRecruitmentAction,
  doRecruitmentActionType,
  RecruitUnitsAction,
  recruitUnitsActionType,
} from "./actionTypes.ts";
import { Placements, Recruitment } from "./types.ts";

export const doRecruitmentActionCreator = (
  payload: Placements,
): DoRecruitmentAction => ({
  type: doRecruitmentActionType,
  payload,
});

export const recruitUnitsActionCreator = (
  payload: Recruitment[],
): RecruitUnitsAction => ({
  type: recruitUnitsActionType,
  payload,
});
