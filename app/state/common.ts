export type Month = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;

export enum EconomicMonth {
  March = 2,
  June = 5,
  September = 8,
  Deceomber = 11,
}

export const enum TurnPhase {
  // Diplomatic = 0,
  Reinforcement = 1,
  // Naval = 2,
  Land = 3,
  Economic = 4,
}

export interface CommonState {
  year: number;
  month: Month;
  phase: TurnPhase;
}

const advanceTurnActionType = "common/advanceTurn";
export interface AdvanceTurnAction {
  type: typeof advanceTurnActionType;
}
export const advanceTurnAction: AdvanceTurnAction = Object.freeze({
  type: advanceTurnActionType,
});

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
      };
    }
    return {
      year: state.year,
      month: (state.month + 1) as Month,
      phase: TurnPhase.Reinforcement,
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
  action: AdvanceTurnAction
) => {
  if (action.type === advanceTurnActionType) {
    return advanceTurn(state);
  }
  return state;
};
