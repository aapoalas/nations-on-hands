import {
  SaveMoneyAction,
  saveMoneyActionType,
  UseManpowerAction,
  useManpowerActionType,
  UseMoneyAction,
  useMoneyActionType,
} from "./actionTypes.ts";

export interface CountryFinances {
  currency: string;
  money: number;
  manpower?: number;
}

const useMoney = (state: CountryFinances, payload: number): CountryFinances => {
  if (state.money < payload) {
    throw new Error("Not enough money");
  }
  return {
    ...state,
    money: state.money - payload,
  };
};

const saveMoney = (
  state: CountryFinances,
  payload: number,
): CountryFinances => {
  return {
    ...state,
    money: state.money + payload,
  };
};

const useManpower = (
  state: CountryFinances,
  payload: number,
): CountryFinances => {
  if ((state.manpower || 0) < payload) {
    throw new Error("Not enough saved manpower");
  }
  return {
    ...state,
    manpower: (state.manpower || 0) - payload,
  };
};

export const countryFinancesReducer = (
  state: CountryFinances,
  action: SaveMoneyAction | UseMoneyAction | UseManpowerAction,
): CountryFinances => {
  if (action.type === saveMoneyActionType && action.payload > 0) {
    return saveMoney(state, action.payload);
  } else if (action.type === useMoneyActionType && action.payload > 0) {
    return useMoney(state, action.payload);
  } else if (action.type === useManpowerActionType) {
    return useManpower(state, action.payload);
  }
  return state;
};
