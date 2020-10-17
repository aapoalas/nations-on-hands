export interface CountryGeneral {
  victoryPoints: number;
  victoryCondition: number;
}

const grantVictoryPointsActionType = "country/general/grantVictoryPoints";
interface GrantVictoryPointsAction {
  type: typeof grantVictoryPointsActionType;
  payload: number;
}

export const grantVictoryPointsActionCreator = (
  victoryPointsGain: number
): GrantVictoryPointsAction => ({
  type: grantVictoryPointsActionType,
  payload: victoryPointsGain,
});

export const countryGeneralReducer = (
  state: CountryGeneral,
  action: GrantVictoryPointsAction
): CountryGeneral => {
  if (action.type === grantVictoryPointsActionType) {
    return {
      ...state,
      victoryPoints: state.victoryPoints + action.payload,
    };
  }
  return state;
};
