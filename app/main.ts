import { CommonState } from "./state/common/reducers.ts";
import { EconomicMonth, Month, TurnPhase } from "./state/commonTypes.ts";
import {
  EconomicPhasesData,
  RecruitmentPhasesData,
} from "./state/countries/actionTypes.ts";
import { FactorType, ReserveCorps } from "./state/country/army/types.ts";
import {
  advanceStateActionCreator,
  GameState,
  stateReducer,
} from "./state/state.ts";
import PlayerController from "./controllers/PlayerController.ts";
import { automaticRecruitment } from "./state/country/army/utils.ts";

if (!("BroadcastChannel" in window)) {
  (window as any).BroadcastChannel =
    (await import("./BroadcastChannel.ts")).default;
}

const gameName = "myGame";

const playerControllers = [
  "Austria",
  "France",
  "Great Britain",
  "Prussia",
  "Russia",
  "Spain",
  "Sweden",
  "Turkey",
].sort(() => Math.random() - 0.5).map((name) =>
  new PlayerController(name, gameName)
);

await playerControllers[Math.trunc(Math.random() * 8)].setupGame(
  "TheRevolutionCampaign",
);

// if (playerControllers.length === 8) {
//   for (const player of playerControllers) {
//     player.qq();
//   }
//   Deno.exit(0);
// }

const getRecruitmentMonth = (
  { month: currentMonth }: CommonState,
  months: number,
): Month => ((currentMonth + months) % 11) as Month;

const getRecruitmentYear = (
  { year: currentYear, month: currentMonth }: CommonState,
  months: number,
): number => {
  if (currentMonth + months > 11) {
    return currentYear + 1;
  }
  return currentYear;
};
