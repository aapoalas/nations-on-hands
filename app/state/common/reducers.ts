import { EconomicMonth, Month, PlayerCountryID, TurnPhase } from "../commonTypes.ts";
import { AdvanceTurnAction, advanceTurnActionType } from "./actionTypes.ts";

export interface CommonState {
  year: number;
  month: Month;
  phase: TurnPhase;
  player: null | PlayerCountryID;
}

const advanceTurn = (state: CommonState): CommonState => {
  if (state.month in EconomicMonth && state.phase === TurnPhase.Economic) {
    /**
     * Economic phase leads into the next month's reinforcement phase.
     * Year changes after December, of course.
     */
    if (state.month === EconomicMonth.Deceomber) {
      return {
        year: state.year + 1,
        month: 0,
        phase: TurnPhase.Reinforcement,
        player: null,
      };
    }
    return {
      year: state.year,
      month: (state.month + 1) as Month,
      phase: TurnPhase.Reinforcement,
      player: null,
    };
  } else if (state.phase === TurnPhase.Reinforcement) {
    /**
     * Reinforcement phase leads to the Land phase.
     */
    return {
      ...state,
      phase: TurnPhase.Land,
    };
  } else {
    /**
     * Land phase leads to Economic phase in selected
     * months, otherwise it leads to the next month's
     * Reinforcement phase. Year ends in Economic phase
     * so no need to turn the year here.
     */
    return state.month in EconomicMonth
      ? {
        ...state,
        phase: TurnPhase.Economic,
      }
      : {
        ...state,
        month: (state.month + 1) as Month,
        phase: TurnPhase.Reinforcement,
      };
  }
};

export const commonReducer = (
  state: CommonState,
  action: AdvanceTurnAction,
) => {
  if (action.type === advanceTurnActionType) {
    return advanceTurn(state);
  }
  return state;
};
