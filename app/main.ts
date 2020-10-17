import { EconomicMonth } from "./state/common.ts";
import { EconomicPhasesData } from "./state/countries.ts";
import {
    advanceStateActionCreator,
    GameState,
    stateReducer,
} from "./state/state.ts";

const main = async () => {
    const foo = new Set([1]);
    
    let state: GameState = {
      common: {
        month: 0,
        year: 1789,
      },
      countries: new Map([
        [
          "fr",
          {
            name: "France",
            identifier: "fr",
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
        let payload: undefined | EconomicPhasesData;
        if (state.common.month in EconomicMonth) {
            payload = {
              fr: {
                expenses: 30,
                income: 60,
                manpower: 20,
                recruitment: 20,
                victoryPointGain: 9,
              },
              pr: {
                expenses: 21,
                income: 28,
                manpower: 14,
                recruitment: 15,
                victoryPointGain: 7,
              },
            } as EconomicPhasesData;
        }
        state = stateReducer(state, advanceStateActionCreator(payload));
        for (const country of state.countries.values()) {
            if (country.general.victoryPoints >= country.general.victoryCondition) {
                console.log("\n\nWINNER OF THE GAME IS:", country.name);
                return 1;
            }
        }
        
        for (const country of state.countries.values()) {
            console.log("\n", country.name);
            console.table(country.general);
            console.table(country.finances);
        }

        foo.add(round + 1);

        await new Promise(res => setTimeout(res, 100));
    }
}

main();