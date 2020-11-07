import { EconomicMonth, Month, TurnPhase } from "./state/common.ts";
import {
  EconomicPhasesData,
  RecruitmentPhasesData,
} from "./state/countries.ts";
import {
  advanceStateActionCreator,
  GameState,
  stateReducer,
} from "./state/state.ts";

const foo = new Set([1]);

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
          corps: new Map(),
          recruitment: [],
        },
        general: {
          victoryPoints: 0,
          victoryCondition: 800,
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
          corps: new Map(),
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

for await (const round of foo) {
  let payload: undefined | RecruitmentPhasesData | EconomicPhasesData;
  if (state.common.phase === TurnPhase.Reinforcement) {
    payload = {
      month: state.common.month as Month,
      year: state.common.year,
    } as RecruitmentPhasesData;
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
        recruitments: [],
      },
      pr: {
        expenses: 21,
        income: 28,
        manpower: 14,
        recruitment: 15,
        victoryPointGain: 7,
        recruitments: [],
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

  for (const country of state.countries.values()) {
    console.log("\n", country.name);
    console.table(country.general);
    console.table(country.finances);
  }

  foo.add(round + 1);

  await new Promise((res) => setTimeout(res));
}
