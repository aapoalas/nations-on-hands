import { PhaseData } from "../commonTypes.ts";

export const advanceGameActionType = "common/advanceGame";
export interface AdvanceGameAction {
  readonly type: typeof advanceGameActionType;
  readonly payload: { phaseData: PhaseData[] };
}
