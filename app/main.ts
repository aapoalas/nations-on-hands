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
//import { GameController } from "./controllers/GameController.ts";
//import { PlayerController } from "./controllers/PlayerController.ts";
//import { JoinMessage } from "./messages/messageTypes.ts";
import { automaticRecruitment } from "./state/country/army/utils.ts";

if (!("BroadcastChannel" in window)) {
  (window as any).BroadcastChannel = await import("./BroadcastChannel.ts");
}

//const game = new GameController("myGame");
//const france = new PlayerController("France", "myGame");
//const prussia = new PlayerController("Prussia", "myGame");

// france.broadcastData({ type: "player/join", sender: france.name, data: null });
// prussia.broadcastData({ type: "player/join", sender: prussia.name, data: null });

let state: GameState = {
  common: {
    month: 0,
    year: 1789,
    phase: 1, // Reinforcement phase
  },
  countries: new Map([
    [
      "fr",
      {
        name: "France",
        identifier: "fr",
        army: {
          corps: new Map<string, ReserveCorps>([
            [
              "Guards",
              {
                status: 1,
                size: {
                  artillery: 0,
                  cavalry: 0,
                  guards: 5,
                  infantry: 0,
                },
                composition: {
                  artillery: [],
                  cavalry: [],
                  guards: [],
                  infantry: [],
                },
              },
            ],
            [
              "I",
              {
                status: 1,
                size: {
                  artillery: 0,
                  cavalry: 2,
                  guards: 0,
                  infantry: 15,
                },
                composition: {
                  artillery: [],
                  cavalry: [],
                  guards: [],
                  infantry: [],
                },
              },
            ],
            [
              "II",
              {
                status: 1,
                size: {
                  artillery: 0,
                  cavalry: 1,
                  guards: 0,
                  infantry: 12,
                },
                composition: {
                  artillery: [],
                  cavalry: [],
                  guards: [],
                  infantry: [],
                },
              },
            ],
            [
              "II",
              {
                status: 1,
                size: {
                  artillery: 0,
                  cavalry: 1,
                  guards: 0,
                  infantry: 12,
                },
                composition: {
                  artillery: [],
                  cavalry: [],
                  guards: [],
                  infantry: [],
                },
              },
            ],
            [
              "III",
              {
                status: 1,
                size: {
                  artillery: 0,
                  cavalry: 1,
                  guards: 0,
                  infantry: 12,
                },
                composition: {
                  artillery: [],
                  cavalry: [],
                  guards: [],
                  infantry: [],
                },
              },
            ],
            [
              "IV",
              {
                status: 1,
                size: {
                  artillery: 0,
                  cavalry: 1,
                  guards: 0,
                  infantry: 12,
                },
                composition: {
                  artillery: [],
                  cavalry: [],
                  guards: [],
                  infantry: [],
                },
              },
            ],
            [
              "V",
              {
                status: 1,
                size: {
                  artillery: 0,
                  cavalry: 1,
                  guards: 0,
                  infantry: 12,
                },
                composition: {
                  artillery: [],
                  cavalry: [],
                  guards: [],
                  infantry: [],
                },
              },
            ],
            [
              "VI",
              {
                status: 1,
                size: {
                  artillery: 0,
                  cavalry: 1,
                  guards: 0,
                  infantry: 12,
                },
                composition: {
                  artillery: [],
                  cavalry: [],
                  guards: [],
                  infantry: [],
                },
              },
            ],
            [
              "VII",
              {
                status: 1,
                size: {
                  artillery: 0,
                  cavalry: 0,
                  guards: 0,
                  infantry: 10,
                },
                composition: {
                  artillery: [],
                  cavalry: [],
                  guards: [],
                  infantry: [],
                },
              },
            ],
            [
              "VIII",
              {
                status: 1,
                size: {
                  artillery: 0,
                  cavalry: 0,
                  guards: 0,
                  infantry: 10,
                },
                composition: {
                  artillery: [],
                  cavalry: [],
                  guards: [],
                  infantry: [],
                },
              },
            ],
            [
              "IX",
              {
                status: 1,
                size: {
                  artillery: 0,
                  cavalry: 0,
                  guards: 0,
                  infantry: 10,
                },
                composition: {
                  artillery: [],
                  cavalry: [],
                  guards: [],
                  infantry: [],
                },
              },
            ],
            [
              "CI",
              {
                status: 1,
                size: {
                  artillery: 0,
                  cavalry: 3,
                  guards: 0,
                  infantry: 0,
                },
                composition: {
                  artillery: [],
                  cavalry: [],
                  guards: [],
                  infantry: [],
                },
              },
            ],
            [
              "CII",
              {
                status: 1,
                size: {
                  artillery: 0,
                  cavalry: 3,
                  guards: 0,
                  infantry: 0,
                },
                composition: {
                  artillery: [],
                  cavalry: [],
                  guards: [],
                  infantry: [],
                },
              },
            ],
          ]),
          recruitment: [],
        },
        general: {
          victoryPoints: 0,
          victoryCondition: 890,
        },
        finances: {
          currency: "frank",
          money: 30,
        },
      },
    ],
    [
      "pr",
      {
        name: "Prussia",
        identifier: "pr",
        canStoreManpower: true,
        army: {
          corps: new Map([
            [
              "I",
              {
                status: 1,
                size: {
                  artillery: 0,
                  cavalry: 2,
                  guards: 0,
                  infantry: 14,
                },
                composition: {
                  artillery: [],
                  cavalry: [],
                  guards: [],
                  infantry: [],
                },
              },
            ],
            [
              "II",
              {
                status: 1,
                size: {
                  artillery: 0,
                  cavalry: 1,
                  guards: 0,
                  infantry: 12,
                },
                composition: {
                  artillery: [],
                  cavalry: [],
                  guards: [],
                  infantry: [],
                },
              },
            ],
            [
              "III",
              {
                status: 1,
                size: {
                  artillery: 0,
                  cavalry: 1,
                  guards: 0,
                  infantry: 12,
                },
                composition: {
                  artillery: [],
                  cavalry: [],
                  guards: [],
                  infantry: [],
                },
              },
            ],
            [
              "IV",
              {
                status: 1,
                size: {
                  artillery: 0,
                  cavalry: 1,
                  guards: 0,
                  infantry: 12,
                },
                composition: {
                  artillery: [],
                  cavalry: [],
                  guards: [],
                  infantry: [],
                },
              },
            ],
            [
              "V",
              {
                status: 1,
                size: {
                  artillery: 0,
                  cavalry: 1,
                  guards: 0,
                  infantry: 12,
                },
                composition: {
                  artillery: [],
                  cavalry: [],
                  guards: [],
                  infantry: [],
                },
              },
            ],
            [
              "VI",
              {
                status: 1,
                size: {
                  artillery: 0,
                  cavalry: 1,
                  guards: 0,
                  infantry: 12,
                },
                composition: {
                  artillery: [],
                  cavalry: [],
                  guards: [],
                  infantry: [],
                },
              },
            ],
            [
              "VII",
              {
                status: 1,
                size: {
                  artillery: 0,
                  cavalry: 1,
                  guards: 0,
                  infantry: 12,
                },
                composition: {
                  artillery: [],
                  cavalry: [],
                  guards: [],
                  infantry: [],
                },
              },
            ],
          ]),
          recruitment: [],
        },
        general: {
          victoryPoints: 0,
          victoryCondition: 650,
        },
        finances: {
          currency: "deutchmark",
          money: 15,
        },
      },
    ],
  ]),
};

//game.broadcastData({ type: "game/initialize", sender: "GameController", data: state });

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

while (true) {
  let payload: undefined | RecruitmentPhasesData | EconomicPhasesData;
  if (state.common.phase === TurnPhase.Reinforcement) {
    payload = {
      fr: automaticRecruitment(state.countries.get("fr")!.army, {
        month: state.common.month as Month,
        year: state.common.year,
      }),
      pr: automaticRecruitment(state.countries.get("pr")!.army, {
        month: state.common.month as Month,
        year: state.common.year,
      }),
    };
  } else if (
    state.common.month in EconomicMonth &&
    state.common.phase === TurnPhase.Economic
  ) {
    payload = {
      fr: {
        expenses: 30,
        income: 60,
        manpower: 20,
        recruitment: 20,
        victoryPointGain: 9,
        recruitments: [
          {
            count: 10,
            month: getRecruitmentMonth(state.common, 3),
            year: getRecruitmentYear(state.common, 3),
            morale: 3.5,
            type: "infantry",
          },
        ],
      },
      pr: {
        expenses: 21,
        income: 28,
        manpower: 14,
        recruitment: 15,
        victoryPointGain: 7,
        recruitments: [
          {
            count: 7,
            month: getRecruitmentMonth(state.common, 3),
            year: getRecruitmentYear(state.common, 3),
            morale: 3,
            type: "infantry",
          },
        ],
      },
    } as EconomicPhasesData;
  }
  state = stateReducer(state, advanceStateActionCreator(payload));
  for (const country of state.countries.values()) {
    if (country.general.victoryPoints >= country.general.victoryCondition) {
      console.log("\n\nWINNER OF THE GAME IS:", country.name);
      Deno.exit(1);
    }
  }

  if (state.common.phase === TurnPhase.Economic) {
    for (const country of state.countries.values()) {
      console.log("\n", country.name);
      console.table(country.general);
      console.table(country.finances);
      for (const key of country.army.corps.keys()) {
        const value = country.army.corps.get(key)!;
        if (value.status === 2) {
          console.log(key);
          for (const type in value.size) {
            if (value.size[type as FactorType] > 0) {
              console.log(
                type,
                (value as any).composition[type as FactorType].length,
              );
            }
          }
        }
      }
    }
  }

  await new Promise((res) => setTimeout(res));
}
