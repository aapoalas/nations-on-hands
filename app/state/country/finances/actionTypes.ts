export const saveMoneyActionType = "country/finances/saveMoney";
export const useMoneyActionType = "country/finances/useMoney";
export const useManpowerActionType = "country/finances/useManpower";
export interface UseMoneyAction {
  type: typeof useMoneyActionType;
  payload: number;
}
export interface SaveMoneyAction {
  type: typeof saveMoneyActionType;
  payload: number;
}
export interface UseManpowerAction {
  type: typeof useManpowerActionType;
  payload: number;
}
