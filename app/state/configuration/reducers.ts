import { PhaseData, PlayerCountryID } from "../commonTypes.ts";

export interface PlayOrder {
  readonly land: readonly PlayerCountryID[];
  readonly landReinf: readonly PlayerCountryID[];
  readonly naval: readonly PlayerCountryID[];
  readonly navalReinf: readonly PlayerCountryID[];
  readonly setup: readonly PlayerCountryID[];
}

export interface ConfigurationState {
  readonly common: {
    readonly phaseData: PhaseData[];
  };
  readonly countrySpecificConfiguration?: Partial<
    Record<
      PlayerCountryID,
      Partial<Omit<ConfigurationState, "countrySpecificConfiguration">>
    >
  >;
}

export const configurationReducer = (
  state: ConfigurationState,
): ConfigurationState => {
  return state;
};
