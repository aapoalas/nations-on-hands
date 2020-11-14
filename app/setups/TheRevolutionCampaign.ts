import { Month } from "../state/commonTypes.ts";
import { GameState } from "../state/state.ts";
import { createFactors, createReinforcement } from "./utils.ts";

const startDate: {
  month: Month;
  year: number;
} = {
  month: 0,
  year: 1789,
};

export const getInitialState = (): GameState => ({
  common: {
    ...startDate,
    phase: 1, // Reinforcement phase
    player: null,
  },
  configuration: {
    playOrder: {
      land: ["fr", "ru", "tur", "aus", "pr", "swe", "gb", "spa"],
      landReinf: ["spa", "gb", "swe", "pr", "aus", "tur", "ru", "fr"],
      naval: ["gb", "ru", "tur", "aus", "pr", "swe", "fr", "spa"],
      navalReinf: ["spa", "fr", "swe", "pr", "aus", "tur", "ru", "gb"],
      setup: ["fr", "ru", "tur", "aus", "pr", "gb", "spa", "swe"],
    },
  },
  countries: new Map([
    [
      "aus",
      {
        name: "Austria",
        identifier: "aus",
        army: {
          corps: new Map([
            ["Guards I", {
              status: 1,
              size: {
                artillery: 0,
                cavalry: 1,
                guards: 4,
                infantry: 0,
              },
              composition: {
                artillery: [],
                cavalry: [],
                guards: [],
                infantry: [],
              },
            }],
            ["I", {
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
            }],
            ["II", {
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
            }],
            ["III", {
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
            }],
            ["IV", {
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
            }],
            ["V", {
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
            }],
            ["VI", {
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
            }],
            ["VII", {
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
            }],
            ["VIII", {
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
            }],
            ["C I", {
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
            }],
            ["C II", {
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
            }],
            ["Insurrection I", {
              status: 1,
              size: {
                artillery: 0,
                cavalry: 3,
                guards: 0,
                infantry: 15,
              },
              composition: {
                artillery: [],
                cavalry: createFactors(3, "cavalry", "Insurrection cavalry #"),
                guards: [],
                infantry: createFactors(
                  3,
                  "infantry",
                  "Insurrection militia #",
                  2,
                ),
              },
            }],
            ["Insurrection II", {
              status: 1,
              size: {
                artillery: 0,
                cavalry: 3,
                guards: 0,
                infantry: 15,
              },
              composition: {
                artillery: [],
                cavalry: createFactors(3, "cavalry", "Insurrection cavalry #"),
                guards: [],
                infantry: createFactors(
                  3,
                  "infantry",
                  "Insurrection militia #",
                  2,
                ),
              },
            }],
          ]),
          recruitment: [
            createReinforcement(42, "infantry", startDate),
            createReinforcement(3, "cavalry", startDate),
            createReinforcement(2, "guards", startDate, 5),
          ],
        },
        general: {
          victoryPoints: 0,
          victoryCondition: 650,
        },
        finances: {
          currency: "krone",
          money: 15,
        },
      },
    ],
    [
      "fr",
      {
        name: "France",
        identifier: "fr",
        army: {
          corps: new Map([
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
          recruitment: [
            createReinforcement(38, "infantry", startDate),
            createReinforcement(4, "cavalry", startDate),
          ],
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
      "gb",
      {
        name: "Great Britain",
        identifier: "gb",
        army: {
          corps: new Map([
            [
              "I",
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
              "II",
              {
                status: 1,
                size: {
                  artillery: 0,
                  cavalry: 0,
                  guards: 0,
                  infantry: 8,
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
                  cavalry: 0,
                  guards: 0,
                  infantry: 8,
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
                  cavalry: 0,
                  guards: 0,
                  infantry: 6,
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
                  cavalry: 0,
                  guards: 0,
                  infantry: 6,
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
              "C",
              {
                status: 1,
                size: {
                  artillery: 0,
                  cavalry: 4,
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
          recruitment: [
            createReinforcement(7, "infantry", startDate),
            createReinforcement(1, "cavalry", startDate),
          ],
        },
        general: {
          victoryPoints: 0,
          victoryCondition: 940,
        },
        finances: {
          currency: "pound",
          money: 15,
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
          recruitment: [
            createReinforcement(32, "infantry", startDate),
            createReinforcement(4, "cavalry", startDate),
          ],
        },
        general: {
          victoryPoints: 0,
          victoryCondition: 790,
        },
        finances: {
          currency: "deutchmark",
          money: 15,
        },
      },
    ],
    [
      "ru",
      {
        name: "Russia",
        identifier: "ru",
        army: {
          corps: new Map([
            [
              "I",
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
              "III",
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
              "IV",
              {
                status: 1,
                size: {
                  artillery: 0,
                  cavalry: 0,
                  guards: 0,
                  infantry: 6,
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
              "VI",
              {
                status: 1,
                size: {
                  artillery: 0,
                  cavalry: 0,
                  guards: 0,
                  infantry: 6,
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
                  infantry: 6,
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
                  infantry: 6,
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
                  infantry: 6,
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
              "X",
              {
                status: 1,
                size: {
                  artillery: 0,
                  cavalry: 0,
                  guards: 0,
                  infantry: 6,
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
              "XI",
              {
                status: 1,
                size: {
                  artillery: 0,
                  cavalry: 0,
                  guards: 0,
                  infantry: 6,
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
              "XII",
              {
                status: 1,
                size: {
                  artillery: 0,
                  cavalry: 0,
                  guards: 0,
                  infantry: 6,
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
              "XIII",
              {
                status: 1,
                size: {
                  artillery: 0,
                  cavalry: 0,
                  guards: 0,
                  infantry: 6,
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
              "C I",
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
              "C II",
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
              "C III",
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
              "C IV",
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
          recruitment: [
            createReinforcement(65, "infantry", startDate),
            createReinforcement(2, "cavalry", startDate),
            createReinforcement(2, "guards", startDate),
          ],
        },
        general: {
          victoryPoints: 0,
          victoryCondition: 881,
        },
        finances: {
          currency: "ruble",
          money: 15,
        },
      },
    ],
    [
      "spa",
      {
        name: "Spain",
        identifier: "spa",
        army: {
          corps: new Map([
            [
              "I",
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
              "II",
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
              "III",
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
              "IV",
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
              "V",
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
              "VI",
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
          ]),
          recruitment: [
            createReinforcement(11, "infantry", startDate),
          ],
        },
        general: {
          victoryPoints: 0,
          victoryCondition: 775,
        },
        finances: {
          currency: "dublon",
          money: 15,
        },
      },
    ],
    [
      "swe",
      {
        name: "Sweden",
        identifier: "swe",
        army: {
          corps: new Map([
            [
              "I",
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
              "II",
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
              "III",
              {
                status: 1,
                size: {
                  artillery: 0,
                  cavalry: 0,
                  guards: 0,
                  infantry: 6,
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
              "C",
              {
                status: 1,
                size: {
                  artillery: 0,
                  cavalry: 1,
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
          recruitment: [
            createReinforcement(11, "infantry", startDate),
          ],
        },
        general: {
          victoryPoints: 0,
          victoryCondition: 665,
        },
        finances: {
          currency: "krona",
          money: 15,
        },
      },
    ],
    [
      "tur",
      {
        name: "Turkey",
        identifier: "tur",
        army: {
          corps: new Map([
            [
              "Janissar I",
              {
                status: 1,
                size: {
                  artillery: 0,
                  cavalry: 0,
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
              "Janissar II",
              {
                status: 1,
                size: {
                  artillery: 0,
                  cavalry: 0,
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
              "Imperial Cavalry",
              {
                status: 1,
                size: {
                  artillery: 0,
                  cavalry: 6,
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
              "Albanian Feudal Infantry",
              {
                status: 1,
                size: {
                  artillery: 0,
                  cavalry: 0,
                  guards: 0,
                  infantry: 9,
                },
                composition: {
                  artillery: [],
                  cavalry: [],
                  guards: [],
                  infantry: createFactors(
                    9,
                    "infantry",
                    "Feudal infantry #",
                    2,
                  ),
                },
              },
            ],
            [
              "Anatolian Feudal Infantry I",
              {
                status: 1,
                size: {
                  artillery: 0,
                  cavalry: 0,
                  guards: 0,
                  infantry: 9,
                },
                composition: {
                  artillery: [],
                  cavalry: [],
                  guards: [],
                  infantry: createFactors(
                    9,
                    "infantry",
                    "Feudal infantry #",
                    2,
                  ),
                },
              },
            ],
            [
              "Bosnian Feudal Infantry",
              {
                status: 1,
                size: {
                  artillery: 0,
                  cavalry: 0,
                  guards: 0,
                  infantry: 9,
                },
                composition: {
                  artillery: [],
                  cavalry: [],
                  guards: [],
                  infantry: createFactors(
                    9,
                    "infantry",
                    "Feudal infantry #",
                    2,
                  ),
                },
              },
            ],
            [
              "Bulgarian Feudal Infantry",
              {
                status: 1,
                size: {
                  artillery: 0,
                  cavalry: 0,
                  guards: 0,
                  infantry: 9,
                },
                composition: {
                  artillery: [],
                  cavalry: [],
                  guards: [],
                  infantry: createFactors(
                    9,
                    "infantry",
                    "Feudal infantry #",
                    2,
                  ),
                },
              },
            ],
            [
              "Greek Feudal Infantry",
              {
                status: 1,
                size: {
                  artillery: 0,
                  cavalry: 0,
                  guards: 0,
                  infantry: 9,
                },
                composition: {
                  artillery: [],
                  cavalry: [],
                  guards: [],
                  infantry: createFactors(
                    9,
                    "infantry",
                    "Feudal infantry #",
                    2,
                  ),
                },
              },
            ],
            [
              "Macedonian Feudal Infantry",
              {
                status: 1,
                size: {
                  artillery: 0,
                  cavalry: 0,
                  guards: 0,
                  infantry: 9,
                },
                composition: {
                  artillery: [],
                  cavalry: [],
                  guards: [],
                  infantry: createFactors(
                    9,
                    "infantry",
                    "Feudal infantry #",
                    2,
                  ),
                },
              },
            ],
            [
              "Serbian Feudal Infantry",
              {
                status: 1,
                size: {
                  artillery: 0,
                  cavalry: 0,
                  guards: 0,
                  infantry: 9,
                },
                composition: {
                  artillery: [],
                  cavalry: [],
                  guards: [],
                  infantry: createFactors(
                    9,
                    "infantry",
                    "Feudal infantry #",
                    2,
                  ),
                },
              },
            ],
            [
              "Albanian Feudal Infantry",
              {
                status: 1,
                size: {
                  artillery: 0,
                  cavalry: 0,
                  guards: 0,
                  infantry: 9,
                },
                composition: {
                  artillery: [],
                  cavalry: [],
                  guards: [],
                  infantry: createFactors(
                    9,
                    "infantry",
                    "Feudal infantry #",
                    2,
                  ),
                },
              },
            ],
            [
              "Anatolian Feudal Cavalry I",
              {
                status: 1,
                size: {
                  artillery: 0,
                  cavalry: 8,
                  guards: 0,
                  infantry: 0,
                },
                composition: {
                  artillery: [],
                  cavalry: createFactors(8, "cavalry", "Feudal cavalry #", 2),
                  guards: [],
                  infantry: [],
                },
              },
            ],
            [
              "Anatolian Feudal Cavalry II",
              {
                status: 1,
                size: {
                  artillery: 0,
                  cavalry: 8,
                  guards: 0,
                  infantry: 0,
                },
                composition: {
                  artillery: [],
                  cavalry: createFactors(8, "cavalry", "Feudal cavalry #", 2),
                  guards: [],
                  infantry: [],
                },
              },
            ],
            [
              "Rumelian Feudal Cavalry",
              {
                status: 1,
                size: {
                  artillery: 0,
                  cavalry: 8,
                  guards: 0,
                  infantry: 0,
                },
                composition: {
                  artillery: [],
                  cavalry: createFactors(8, "cavalry", "Feudal cavalry #", 2),
                  guards: [],
                  infantry: [],
                },
              },
            ],
          ]),
          recruitment: [
            createReinforcement(3, "infantry", startDate),
          ],
        },
        general: {
          victoryPoints: 0,
          victoryCondition: 780,
        },
        finances: {
          currency: "lira",
          money: 15,
        },
      },
    ],
  ]),
});
