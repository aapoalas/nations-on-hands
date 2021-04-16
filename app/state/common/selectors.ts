import { CommonState } from "./reducers.ts";
import { PlayerCountryID } from "../commonTypes.ts";

export const getNextPlayer = (state: CommonState): PlayerCountryID | null => 
    state.player;
