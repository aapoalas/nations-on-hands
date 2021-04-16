import * as commonSelectors from "./common/selectors.ts";
import { GameState } from "./state.ts";

export const getNextPlayer = (state: GameState) => commonSelectors.getNextPlayer(state.common);