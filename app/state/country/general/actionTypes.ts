export const grantVictoryPointsActionType =
  "country/general/grantVictoryPoints";
export interface GrantVictoryPointsAction {
  type: typeof grantVictoryPointsActionType;
  payload: number;
}
