import {
  GrantVictoryPointsAction,
  grantVictoryPointsActionType,
} from "./actionTypes.ts";

export const grantVictoryPointsActionCreator = (
  victoryPointsGain: number,
): GrantVictoryPointsAction => ({
  type: grantVictoryPointsActionType,
  payload: victoryPointsGain,
});
