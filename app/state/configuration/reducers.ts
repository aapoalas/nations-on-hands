import { PlayerCountryID, PhaseData } from "../commonTypes.ts";

export interface PlayOrder {
  land: PlayerCountryID[];
  landReinf: PlayerCountryID[];
  naval: PlayerCountryID[];
  navalReinf: PlayerCountryID[];
  setup: PlayerCountryID[];
}

export interface ConfigurationState {
  common: {
    phaseData: PhaseData[];
  }
  countrySpecificConfiguration?: Partial<Record<
    PlayerCountryID,
    Partial<Omit<ConfigurationState, "countrySpecificConfiguration">>
  >>;
}

export const configurationReducer = (state: ConfigurationState): ConfigurationState => {
    return state;
};