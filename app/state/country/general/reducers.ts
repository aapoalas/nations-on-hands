import {
  GrantVictoryPointsAction,
  grantVictoryPointsActionType,
} from "./actionTypes.ts";

export interface CountryGeneral {
  readonly victoryPoints: number;
  readonly victoryCondition: number;
}

export const countryGeneralReducer = (
  state: CountryGeneral,
  action: GrantVictoryPointsAction,
): CountryGeneral => {
  if (action.type === grantVictoryPointsActionType) {
    return {
      ...state,
      victoryPoints: state.victoryPoints + action.payload,
    };
  }
  return state;
};
