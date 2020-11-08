import {
  DoEconomicPhaseAction,
  doEconomicPhaseActionType,
  DoRecruitmentPhaseAction,
  doRecruitmentPhaseActionType,
  EconomicPhaseData,
  RecruitmentPhaseData,
} from "./actionTypes.ts";

export const doRecruitmentPhaseActionCreator = (
  payload: RecruitmentPhaseData,
): DoRecruitmentPhaseAction => ({
  type: doRecruitmentPhaseActionType,
  payload,
});

export const doEconomicPhaseActionCreator = (
  payload: EconomicPhaseData,
): DoEconomicPhaseAction => ({
  type: doEconomicPhaseActionType,
  payload,
});
