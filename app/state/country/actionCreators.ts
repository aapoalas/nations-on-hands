import {
  DoEconomicPhaseAction,
  doEconomicPhaseActionType,
  DoRecruitmentPhaseAction,
  doRecruitmentPhaseActionType,
  EconomicPhaseData,
} from "./actionTypes.ts";

export const doRecruitmentPhaseActionCreator = (
  payload: DoRecruitmentPhaseAction["payload"],
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
