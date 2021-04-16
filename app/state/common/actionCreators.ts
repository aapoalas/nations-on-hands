import { PhaseData } from "../commonTypes.ts";
import { AdvanceGameAction, advanceGameActionType } from "./actionTypes.ts";

export const advanceGameActionCreator = (
  configurationCommonSlice: { phaseData: PhaseData[] },
): AdvanceGameAction => ({
  type: advanceGameActionType,
  payload: configurationCommonSlice,
});
