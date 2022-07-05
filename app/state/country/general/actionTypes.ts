export const grantVictoryPointsActionType =
  "country/general/grantVictoryPoints";
export interface GrantVictoryPointsAction {
  readonly type: typeof grantVictoryPointsActionType;
  readonly payload: number;
}
