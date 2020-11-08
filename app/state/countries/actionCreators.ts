import { RecruitmentPhasesData, DoRecruitmentPhasesAction, doRecruitmentPhasesActionType, EconomicPhasesData, DoEconomicPhasesAction, doEconomicPhasesActionType } from "./actionTypes.ts";

export const doRecruitmentPhasesActionCreator = (
  payload: RecruitmentPhasesData
): DoRecruitmentPhasesAction => ({
  type: doRecruitmentPhasesActionType,
  payload,
});

export const doEconomicPhasesActionCreator = (
  payload: EconomicPhasesData
): DoEconomicPhasesAction => ({
  type: doEconomicPhasesActionType,
  payload,
});
