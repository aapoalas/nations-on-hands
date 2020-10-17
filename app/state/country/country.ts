import {
    CountryFinances,
    countryFinancesReducer,
    saveMoneyActionCreator,
    useManpowerActionCreator,
} from "./finances.ts";
import {
    CountryGeneral,
    countryGeneralReducer,
    grantVictoryPointsActionCreator,
} from "./general.ts";

export interface CountryState {
    name: string;
    identifier: string;
    canStoreManpower?: boolean;
    general: CountryGeneral;
    finances: CountryFinances;
}

const doEconomicPhaseActionType = "country/doEconomicPhase";
export interface EconomicPhaseData {
    income: number;
    manpower: number;
    expenses: number;
    recruitment: number;
    victoryPointGain: number;
}
interface DoEconomicPhaseAction {
    type: typeof doEconomicPhaseActionType;
    payload: EconomicPhaseData;
}
export const doEconomicPhaseActionCreator = (payload: EconomicPhaseData): DoEconomicPhaseAction => ({
    type: doEconomicPhaseActionType,
    payload,
});

export const countryReducer = (state: CountryState, action: DoEconomicPhaseAction) => {
    if (action.type === doEconomicPhaseActionType) {
        const general = countryGeneralReducer(
          state.general,
          grantVictoryPointsActionCreator(action.payload.victoryPointGain),
        );

        let finances: CountryFinances;
        if (action.payload.income === action.payload.expenses) {
            finances = state.finances;
        } else if (action.payload.income > action.payload.expenses) {
            finances = countryFinancesReducer(
                state.finances,
                saveMoneyActionCreator(action.payload.income - action.payload.expenses)
            );
        } else {
            finances = countryFinancesReducer(
                state.finances,
                saveMoneyActionCreator(action.payload.expenses - action.payload.income)
            );
        }

        if (action.payload.recruitment !== action.payload.manpower && state.canStoreManpower) {
            finances = countryFinancesReducer(
                finances,
                useManpowerActionCreator(action.payload.manpower - action.payload.recruitment)
            );
        }

        if (state.general !== general || state.finances !== finances) {
            return {
                ...state,
                general,
                finances,
            }
        }
    }

    return state;
};