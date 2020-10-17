export interface CountryFinances {
    currency: string;
    money: number;
    manpower?: number;
}

const saveMoneyActionType = "country/finances/saveMoney";
export const useMoneyActionType = "country/finances/useMoney";
export const useManpowerActionType = "country/finances/useManpower";

export interface UseMoneyAction {
    type: typeof useMoneyActionType;
    payload: number;
};
export const useMoneyActionCreator = (payload: number): UseMoneyAction => ({
    type: useMoneyActionType,
    payload,
});

interface SaveMoneyAction {
    type: typeof saveMoneyActionType;
    payload: number;
};
export const saveMoneyActionCreator = (payload: number): SaveMoneyAction => ({
    type: saveMoneyActionType,
    payload,
});

export interface UseManpowerAction {
    type: typeof useManpowerActionType;
    payload: number;
};
export const useManpowerActionCreator = (payload: number): UseManpowerAction => ({
    type: useManpowerActionType,
    payload,
});

const useMoney = (state: CountryFinances, payload: number): CountryFinances => {
    if (state.money < payload) {
        throw new Error("Not enough money");
    }
    return {
        ...state,
        money: state.money - payload,
    };
};

const saveMoney = (state: CountryFinances, payload: number): CountryFinances => {
    return {
        ...state,
        money: state.money + payload
    };
}

const useManpower = (state: CountryFinances, payload: number): CountryFinances => {
    if ((state.manpower || 0) < payload) {
        throw new Error("Not enough saved manpower");
    }
    return {
        ...state,
        manpower: (state.manpower || 0) - payload,
    };
};

export const countryFinancesReducer = (state: CountryFinances, action: SaveMoneyAction | UseMoneyAction | UseManpowerAction): CountryFinances => {
    if (action.type === saveMoneyActionType && action.payload > 0) {
        return saveMoney(state, action.payload);
    } else if (action.type === useMoneyActionType && action.payload > 0) {
        return useMoney(state, action.payload);
    } else if (action.type === useManpowerActionType) {
        return useManpower(state, action.payload);
    }
    return state;
};