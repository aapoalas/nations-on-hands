import { PhaseData } from "../commonTypes.ts";

export const advanceGameActionType = "common/advanceGame";
export interface AdvanceGameAction {
  type: typeof advanceGameActionType;
  payload: { phaseData: PhaseData[] };
}
