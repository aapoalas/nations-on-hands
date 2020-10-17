type Month = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;

export enum EconomicMonth {
    March = 2,
    June = 5,
    September = 8,
    Deceomber = 11,
};

export interface CommonState {
    year: number;
    month: Month;
}

const advanceTurnActionType = "common/advanceTurn";
export interface AdvanceTurnAction {
    type: typeof advanceTurnActionType;
}
export const advanceTurnAction: AdvanceTurnAction = Object.freeze({
    type: advanceTurnActionType,
});

const advanceTurn = (state: CommonState): CommonState => {
    if (state.month === EconomicMonth.Deceomber) {
        return {
            year: state.year + 1,
            month: 0,
        };
    }
    return {
        year: state.year,
        month: (state.month + 1) as Month,
    };
};

export const commonReducer = (state: CommonState, action: AdvanceTurnAction) => {
    if (action.type === advanceTurnActionType) {
        return advanceTurn(state);
    }
    return state;
};