export const saveMoneyActionType = "country/finances/saveMoney";
export const useMoneyActionType = "country/finances/useMoney";
export const useManpowerActionType = "country/finances/useManpower";
export interface UseMoneyAction {
  readonly type: typeof useMoneyActionType;
  readonly payload: number;
}
export interface SaveMoneyAction {
  readonly type: typeof saveMoneyActionType;
  readonly payload: number;
}
export interface UseManpowerAction {
  readonly type: typeof useManpowerActionType;
  readonly payload: number;
}
