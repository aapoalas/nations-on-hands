import {
  SaveMoneyAction,
  saveMoneyActionType,
  UseManpowerAction,
  useManpowerActionType,
  UseMoneyAction,
  useMoneyActionType,
} from "./actionTypes.ts";

export const useMoneyActionCreator = (payload: number): UseMoneyAction => ({
  type: useMoneyActionType,
  payload,
});

export const saveMoneyActionCreator = (payload: number): SaveMoneyAction => ({
  type: saveMoneyActionType,
  payload,
});

export const useManpowerActionCreator = (
  payload: number,
): UseManpowerAction => ({
  type: useManpowerActionType,
  payload,
});
