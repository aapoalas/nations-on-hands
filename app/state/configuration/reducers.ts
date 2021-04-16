import { PlayerCountryID } from "../commonTypes.ts";

export interface PlayOrder {
  land: PlayerCountryID[];
  landReinf: PlayerCountryID[];
  naval: PlayerCountryID[];
  navalReinf: PlayerCountryID[];
  setup: PlayerCountryID[];
}

export interface ConfigurationState {
  playOrder: PlayOrder;
  countrySpecificConfiguration?: Partial<
    Record<
      PlayerCountryID,
      Partial<ConfigurationState>
    >
  >;
}

export const configurationReducer = (
  state: ConfigurationState,
): ConfigurationState => {
  return state;
};
