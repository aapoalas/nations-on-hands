import { Month } from "../state/commonTypes.ts";
import { GameState } from "../state/state.ts";
import { createFactors, createReinforcement } from "./utils.ts";
import { EIGHT_PLAYER_CAMPAIGN_ORDER } from "./baseGameOrder.ts";
import { Commander, CommanderSeniority, Corps, CorpsStatus } from "../state/country/army/types.ts";

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
    phase: -1, // Setup phase
    step: 0,
    player: "swe",
  },
  configuration: {
    common: {
      phaseData: EIGHT_PLAYER_CAMPAIGN_ORDER,
    },
  },
  countries: new Map([
    [
      "aus",
      {
        name: "Austria",
        identifier: "aus",
        army: {
          corps: new Map<string, Corps>([
            ["Guards I", {
              status: CorpsStatus.Reserve,
              size: {
                artillery: 0,
                cavalry: 1,
                guard: 4,
                infantry: 0,
              },
              composition: {
                artillery: [],
                cavalry: [],
                guard: [],
                infantry: [],
              },
            }],
            ["I", {
              status: CorpsStatus.Reserve,
              size: {
                artillery: 0,
                cavalry: 0,
                guard: 0,
                infantry: 10,
              },
              composition: {
                artillery: [],
                cavalry: [],
                guard: [],
                infantry: [],
              },
            }],
            ["II", {
              status: CorpsStatus.Reserve,
              size: {
                artillery: 0,
                cavalry: 0,
                guard: 0,
                infantry: 10,
              },
              composition: {
                artillery: [],
                cavalry: [],
                guard: [],
                infantry: [],
              },
            }],
            ["III", {
              status: CorpsStatus.Reserve,
              size: {
                artillery: 0,
                cavalry: 0,
                guard: 0,
                infantry: 10,
              },
              composition: {
                artillery: [],
                cavalry: [],
                guard: [],
                infantry: [],
              },
            }],
            ["IV", {
              status: CorpsStatus.Reserve,
              size: {
                artillery: 0,
                cavalry: 0,
                guard: 0,
                infantry: 10,
              },
              composition: {
                artillery: [],
                cavalry: [],
                guard: [],
                infantry: [],
              },
            }],
            ["V", {
              status: CorpsStatus.Reserve,
              size: {
                artillery: 0,
                cavalry: 0,
                guard: 0,
                infantry: 10,
              },
              composition: {
                artillery: [],
                cavalry: [],
                guard: [],
                infantry: [],
              },
            }],
            ["VI", {
              status: CorpsStatus.Reserve,
              size: {
                artillery: 0,
                cavalry: 0,
                guard: 0,
                infantry: 10,
              },
              composition: {
                artillery: [],
                cavalry: [],
                guard: [],
                infantry: [],
              },
            }],
            ["VII", {
              status: CorpsStatus.Reserve,
              size: {
                artillery: 0,
                cavalry: 0,
                guard: 0,
                infantry: 10,
              },
              composition: {
                artillery: [],
                cavalry: [],
                guard: [],
                infantry: [],
              },
            }],
            ["VIII", {
              status: CorpsStatus.Reserve,
              size: {
                artillery: 0,
                cavalry: 0,
                guard: 0,
                infantry: 10,
              },
              composition: {
                artillery: [],
                cavalry: [],
                guard: [],
                infantry: [],
              },
            }],
            ["C I", {
              status: CorpsStatus.Reserve,
              size: {
                artillery: 0,
                cavalry: 3,
                guard: 0,
                infantry: 0,
              },
              composition: {
                artillery: [],
                cavalry: [],
                guard: [],
                infantry: [],
              },
            }],
            ["C II", {
              status: CorpsStatus.Reserve,
              size: {
                artillery: 0,
                cavalry: 3,
                guard: 0,
                infantry: 0,
              },
              composition: {
                artillery: [],
                cavalry: [],
                guard: [],
                infantry: [],
              },
            }],
            ["Insurrection I", {
              status: CorpsStatus.Reserve,
              size: {
                artillery: 0,
                cavalry: 3,
                guard: 0,
                infantry: 15,
              },
              composition: {
                artillery: [],
                cavalry: createFactors(3, "cavalry", "Insurrection cavalry #"),
                guard: [],
                infantry: createFactors(
                  3,
                  "infantry",
                  "Insurrection militia #",
                  2,
                ),
              },
            }],
            ["Insurrection II", {
              status: CorpsStatus.Reserve,
              size: {
                artillery: 0,
                cavalry: 3,
                guard: 0,
                infantry: 15,
              },
              composition: {
                artillery: [],
                cavalry: createFactors(3, "cavalry", "Insurrection cavalry #"),
                guard: [],
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
            createReinforcement(2, "guard", startDate, 5),
          ],
          commanders: new Map<string, Commander>([
            ["Beaulieu", {
              name: "Johann Peter Beaulieu",
              cavalry: false,
              royal: false,
              strategic: 3,
              tactical: 3,
              tacticalMaximum: 2,
              seniority: CommanderSeniority.B,
            }],
            ["Saxe-Coburg", {
              name: "Saxe-Coburg",
              cavalry: false,
              royal: false,
              strategic: 2,
              tactical: 2,
              tacticalMaximum: 3,
              seniority: CommanderSeniority.B,
            }],
            ["Alvintzi", {
              name: "Alvintzi",
              cavalry: false,
              royal: false,
              strategic: 1,
              tactical: 2,
              tacticalMaximum: 3,
              seniority: CommanderSeniority.C,
            }],
            ["Ott", {
              name: "Ott",
              cavalry: true,
              royal: false,
              strategic: 3,
              tactical: 2,
              tacticalMaximum: 2,
              seniority: CommanderSeniority.D,
            }],
            ["Wurmser", {
              name: "Wurmser",
              cavalry: false,
              royal: false,
              strategic: 1,
              tactical: 3,
              tacticalMaximum: 2,
              seniority: CommanderSeniority.B,
            }],
            /*
            ["Kray", {
              name: "Kray",
              cavalry: false,
              royal: false,
              strategic: 3,
              tactical: 2,
              tacticalMaximum: 3,
              seniority: CommanderSeniority.C,
            }],
            ["Bellegarde", {
              name: "Bellegarde",
              cavalry: false,
              royal: false,
              strategic: 2,
              tactical: 3,
              tacticalMaximum: 3,
              seniority: CommanderSeniority.B,
            }],
            ["Charles", {
              name: "Charles",
              cavalry: false,
              royal: true,
              strategic: 4,
              tactical: 4,
              tacticalMaximum: 6,
              seniority: CommanderSeniority.A,
            }],
            ["Johann", {
              name: "Johann",
              cavalry: false,
              royal: true,
              strategic: 1,
              tactical: 1,
              tacticalMaximum: 2,
              seniority: CommanderSeniority.D,
            }],
            ["Kolowrat", {
              name: "Kolowrat",
              cavalry: false,
              royal: false,
              strategic: 1,
              tactical: 2,
              tacticalMaximum: 3,
              seniority: CommanderSeniority.B,
            }],
            ["Mack", {
              name: "Mack",
              cavalry: false,
              royal: true,
              strategic: 1,
              tactical: 3,
              tacticalMaximum: 4,
              seniority: CommanderSeniority.B,
            }],
            ["Hiller", {
              name: "Hiller",
              cavalry: false,
              royal: false,
              strategic: 1,
              tactical: 2,
              tacticalMaximum: 2,
              seniority: CommanderSeniority.D,
            }],
            ["SwartzenBerg", {
              name: "SwartzenBerg",
              cavalry: false,
              royal: false,
              strategic: 2,
              tactical: 2,
              tacticalMaximum: 6,
              seniority: CommanderSeniority.B,
            }],
            */
            ["Default", {
              name: "Default",
              cavalry: false,
              royal: false,
              strategic: 1,
              tactical: 1,
              tacticalMaximum: 1,
              seniority: CommanderSeniority.D,
            }],
          ]),
        },
        general: {
          victoryPoints: 0,
          victoryCondition: 650,
        },
        finances: {
          currency: "krone",
          money: 25,
        },
      },
    ],
    [
      "fr",
      {
        name: "France",
        identifier: "fr",
        army: {
          corps: new Map<string, Corps>([
            [
              "Guards",
              {
                status: CorpsStatus.Reserve,
                size: {
                  artillery: 0,
                  cavalry: 0,
                  guard: 5,
                  infantry: 0,
                },
                composition: {
                  artillery: [],
                  cavalry: [],
                  guard: [],
                  infantry: [],
                },
              },
            ],
            [
              "I",
              {
                status: CorpsStatus.Reserve,
                size: {
                  artillery: 0,
                  cavalry: 2,
                  guard: 0,
                  infantry: 15,
                },
                composition: {
                  artillery: [],
                  cavalry: [],
                  guard: [],
                  infantry: [],
                },
              },
            ],
            [
              "II",
              {
                status: CorpsStatus.Reserve,
                size: {
                  artillery: 0,
                  cavalry: 1,
                  guard: 0,
                  infantry: 12,
                },
                composition: {
                  artillery: [],
                  cavalry: [],
                  guard: [],
                  infantry: [],
                },
              },
            ],
            [
              "II",
              {
                status: CorpsStatus.Reserve,
                size: {
                  artillery: 0,
                  cavalry: 1,
                  guard: 0,
                  infantry: 12,
                },
                composition: {
                  artillery: [],
                  cavalry: [],
                  guard: [],
                  infantry: [],
                },
              },
            ],
            [
              "III",
              {
                status: CorpsStatus.Reserve,
                size: {
                  artillery: 0,
                  cavalry: 1,
                  guard: 0,
                  infantry: 12,
                },
                composition: {
                  artillery: [],
                  cavalry: [],
                  guard: [],
                  infantry: [],
                },
              },
            ],
            [
              "IV",
              {
                status: CorpsStatus.Reserve,
                size: {
                  artillery: 0,
                  cavalry: 1,
                  guard: 0,
                  infantry: 12,
                },
                composition: {
                  artillery: [],
                  cavalry: [],
                  guard: [],
                  infantry: [],
                },
              },
            ],
            [
              "V",
              {
                status: CorpsStatus.Reserve,
                size: {
                  artillery: 0,
                  cavalry: 1,
                  guard: 0,
                  infantry: 12,
                },
                composition: {
                  artillery: [],
                  cavalry: [],
                  guard: [],
                  infantry: [],
                },
              },
            ],
            [
              "VI",
              {
                status: CorpsStatus.Reserve,
                size: {
                  artillery: 0,
                  cavalry: 1,
                  guard: 0,
                  infantry: 12,
                },
                composition: {
                  artillery: [],
                  cavalry: [],
                  guard: [],
                  infantry: [],
                },
              },
            ],
            [
              "VII",
              {
                status: CorpsStatus.Reserve,
                size: {
                  artillery: 0,
                  cavalry: 0,
                  guard: 0,
                  infantry: 10,
                },
                composition: {
                  artillery: [],
                  cavalry: [],
                  guard: [],
                  infantry: [],
                },
              },
            ],
            [
              "VIII",
              {
                status: CorpsStatus.Reserve,
                size: {
                  artillery: 0,
                  cavalry: 0,
                  guard: 0,
                  infantry: 10,
                },
                composition: {
                  artillery: [],
                  cavalry: [],
                  guard: [],
                  infantry: [],
                },
              },
            ],
            [
              "IX",
              {
                status: CorpsStatus.Reserve,
                size: {
                  artillery: 0,
                  cavalry: 0,
                  guard: 0,
                  infantry: 10,
                },
                composition: {
                  artillery: [],
                  cavalry: [],
                  guard: [],
                  infantry: [],
                },
              },
            ],
            [
              "CI",
              {
                status: CorpsStatus.Reserve,
                size: {
                  artillery: 0,
                  cavalry: 3,
                  guard: 0,
                  infantry: 0,
                },
                composition: {
                  artillery: [],
                  cavalry: [],
                  guard: [],
                  infantry: [],
                },
              },
            ],
            [
              "CII",
              {
                status: CorpsStatus.Reserve,
                size: {
                  artillery: 0,
                  cavalry: 3,
                  guard: 0,
                  infantry: 0,
                },
                composition: {
                  artillery: [],
                  cavalry: [],
                  guard: [],
                  infantry: [],
                },
              },
            ],
          ]),
          recruitment: [
            createReinforcement(38, "infantry", startDate),
            createReinforcement(4, "cavalry", startDate),
          ],
          commanders: new Map<string, Commander>([
            ["Broglie", {
              name: "Broglie",
              cavalry: false,
              royal: false,
              strategic: 3,
              tactical: 4,
              tacticalMaximum: 4,
              seniority: CommanderSeniority.B,
            }],
            ["Conde", {
              name: "Conde",
              cavalry: false,
              royal: true,
              strategic: 1,
              tactical: 2,
              tacticalMaximum: 4,
              seniority: CommanderSeniority.B,
            }],
            ["Angouleme", {
              name: "Angouleme",
              cavalry: false,
              royal: true,
              strategic: 1,
              tactical: 1,
              tacticalMaximum: 5,
              seniority: CommanderSeniority.B,
            }],
            ["Colgny", {
              name: "Colgny",
              cavalry: false,
              royal: false,
              strategic: 2,
              tactical: 2,
              tacticalMaximum: 3,
              seniority: CommanderSeniority.D,
            }],
            ["Bouille", {
              name: "Bouille",
              cavalry: false,
              royal: false,
              strategic: 3,
              tactical: 3,
              tacticalMaximum: 2,
              seniority: CommanderSeniority.C,
            }],
            ["Default", {
              name: "Default",
              cavalry: false,
              royal: false,
              strategic: 2,
              tactical: 2,
              tacticalMaximum: 1,
              seniority: CommanderSeniority.D,
            }],
          ])
        },
        general: {
          victoryPoints: 0,
          victoryCondition: 890,
        },
        finances: {
          currency: "frank",
          money: 15,
        },
      },
    ],
    [
      "gb",
      {
        name: "Great Britain",
        identifier: "gb",
        army: {
          corps: new Map<string, Corps>([
            [
              "I",
              {
                status: CorpsStatus.Reserve,
                size: {
                  artillery: 0,
                  cavalry: 0,
                  guard: 0,
                  infantry: 10,
                },
                composition: {
                  artillery: [],
                  cavalry: [],
                  guard: [],
                  infantry: [],
                },
              },
            ],
            [
              "II",
              {
                status: CorpsStatus.Reserve,
                size: {
                  artillery: 0,
                  cavalry: 0,
                  guard: 0,
                  infantry: 8,
                },
                composition: {
                  artillery: [],
                  cavalry: [],
                  guard: [],
                  infantry: [],
                },
              },
            ],
            [
              "III",
              {
                status: CorpsStatus.Reserve,
                size: {
                  artillery: 0,
                  cavalry: 0,
                  guard: 0,
                  infantry: 8,
                },
                composition: {
                  artillery: [],
                  cavalry: [],
                  guard: [],
                  infantry: [],
                },
              },
            ],
            [
              "IV",
              {
                status: CorpsStatus.Reserve,
                size: {
                  artillery: 0,
                  cavalry: 0,
                  guard: 0,
                  infantry: 6,
                },
                composition: {
                  artillery: [],
                  cavalry: [],
                  guard: [],
                  infantry: [],
                },
              },
            ],
            [
              "V",
              {
                status: CorpsStatus.Reserve,
                size: {
                  artillery: 0,
                  cavalry: 0,
                  guard: 0,
                  infantry: 6,
                },
                composition: {
                  artillery: [],
                  cavalry: [],
                  guard: [],
                  infantry: [],
                },
              },
            ],
            [
              "C",
              {
                status: CorpsStatus.Reserve,
                size: {
                  artillery: 0,
                  cavalry: 4,
                  guard: 0,
                  infantry: 0,
                },
                composition: {
                  artillery: [],
                  cavalry: [],
                  guard: [],
                  infantry: [],
                },
              },
            ],
          ]),
          recruitment: [
            createReinforcement(7, "infantry", startDate),
            createReinforcement(1, "cavalry", startDate),
          ],
          commanders: new Map<string, Commander>([
            ["York", {
              name: "York",
              royal: true,
              strategic: 2,
              tactical: 2,
              tacticalMaximum: 2,
              seniority: CommanderSeniority.A,
              cavalry: false,
            }],
            ["Moira", {
              name: "Moira",
              royal: false,
              strategic: 2,
              tactical: 3,
              tacticalMaximum: 2,
              seniority: CommanderSeniority.B,
              cavalry: false,
            }],
            ["Chatham", {
              name: "Chatham",
              royal: false,
              strategic: 1,
              tactical: 2,
              tacticalMaximum: 2,
              seniority: CommanderSeniority.B,
              cavalry: false,
            }],
            ["Default", {
              name: "Default",
              royal: false,
              strategic: 2,
              tactical: 2,
              tacticalMaximum: 1,
              seniority: CommanderSeniority.D,
              cavalry: false,
            }],
          ])
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
          corps: new Map<string, Corps>([
            [
              "I",
              {
                status: CorpsStatus.Reserve,
                size: {
                  artillery: 0,
                  cavalry: 2,
                  guard: 0,
                  infantry: 14,
                },
                composition: {
                  artillery: [],
                  cavalry: [],
                  guard: [],
                  infantry: [],
                },
              },
            ],
            [
              "II",
              {
                status: CorpsStatus.Reserve,
                size: {
                  artillery: 0,
                  cavalry: 1,
                  guard: 0,
                  infantry: 12,
                },
                composition: {
                  artillery: [],
                  cavalry: [],
                  guard: [],
                  infantry: [],
                },
              },
            ],
            [
              "III",
              {
                status: CorpsStatus.Reserve,
                size: {
                  artillery: 0,
                  cavalry: 1,
                  guard: 0,
                  infantry: 12,
                },
                composition: {
                  artillery: [],
                  cavalry: [],
                  guard: [],
                  infantry: [],
                },
              },
            ],
            [
              "IV",
              {
                status: CorpsStatus.Reserve,
                size: {
                  artillery: 0,
                  cavalry: 1,
                  guard: 0,
                  infantry: 12,
                },
                composition: {
                  artillery: [],
                  cavalry: [],
                  guard: [],
                  infantry: [],
                },
              },
            ],
            [
              "V",
              {
                status: CorpsStatus.Reserve,
                size: {
                  artillery: 0,
                  cavalry: 1,
                  guard: 0,
                  infantry: 12,
                },
                composition: {
                  artillery: [],
                  cavalry: [],
                  guard: [],
                  infantry: [],
                },
              },
            ],
            [
              "VI",
              {
                status: CorpsStatus.Reserve,
                size: {
                  artillery: 0,
                  cavalry: 1,
                  guard: 0,
                  infantry: 12,
                },
                composition: {
                  artillery: [],
                  cavalry: [],
                  guard: [],
                  infantry: [],
                },
              },
            ],
            [
              "VII",
              {
                status: CorpsStatus.Reserve,
                size: {
                  artillery: 0,
                  cavalry: 1,
                  guard: 0,
                  infantry: 12,
                },
                composition: {
                  artillery: [],
                  cavalry: [],
                  guard: [],
                  infantry: [],
                },
              },
            ],
          ]),
          recruitment: [
            createReinforcement(32, "infantry", startDate),
            createReinforcement(4, "cavalry", startDate),
          ],
          commanders: new Map<string, Commander>([
            ["F. Wilhelm II", {
              name: "F. Wilhelm II",
              royal: true,
              strategic: 1,
              tactical: 2,
              tacticalMaximum: 3,
              seniority: CommanderSeniority.A,
              cavalry: false,
            }],
            ["Brunswick", {
              name: "Brunswick",
              royal: false,
              strategic: 2,
              tactical: 2,
              tacticalMaximum: 4,
              seniority: CommanderSeniority.A,
              cavalry: false,
            }],
            ["Hohenlohe", {
              name: "Hohenlohe",
              royal: false,
              strategic: 1,
              tactical: 2,
              tacticalMaximum: 4,
              seniority: CommanderSeniority.B,
              cavalry: false,
            }],
            ["Mollendorf", {
              name: "Mollendorf",
              royal: false,
              strategic: 3,
              tactical: 2,
              tacticalMaximum: 2,
              seniority: CommanderSeniority.C,
              cavalry: false,
            }],
          ])
        },
        general: {
          victoryPoints: 0,
          victoryCondition: 790,
        },
        finances: {
          currency: "deutchmark",
          money: 20,
        },
      },
    ],
    [
      "ru",
      {
        name: "Russia",
        identifier: "ru",
        army: {
          corps: new Map<string, Corps>([
            [
              "I",
              {
                status: CorpsStatus.Reserve,
                size: {
                  artillery: 0,
                  cavalry: 1,
                  guard: 0,
                  infantry: 12,
                },
                composition: {
                  artillery: [],
                  cavalry: [],
                  guard: [],
                  infantry: [],
                },
              },
            ],
            [
              "II",
              {
                status: CorpsStatus.Reserve,
                size: {
                  artillery: 0,
                  cavalry: 0,
                  guard: 0,
                  infantry: 10,
                },
                composition: {
                  artillery: [],
                  cavalry: [],
                  guard: [],
                  infantry: [],
                },
              },
            ],
            [
              "III",
              {
                status: CorpsStatus.Reserve,
                size: {
                  artillery: 0,
                  cavalry: 0,
                  guard: 0,
                  infantry: 10,
                },
                composition: {
                  artillery: [],
                  cavalry: [],
                  guard: [],
                  infantry: [],
                },
              },
            ],
            [
              "IV",
              {
                status: CorpsStatus.Reserve,
                size: {
                  artillery: 0,
                  cavalry: 0,
                  guard: 0,
                  infantry: 6,
                },
                composition: {
                  artillery: [],
                  cavalry: [],
                  guard: [],
                  infantry: [],
                },
              },
            ],
            [
              "V",
              {
                status: CorpsStatus.Reserve,
                size: {
                  artillery: 0,
                  cavalry: 1,
                  guard: 5,
                  infantry: 0,
                },
                composition: {
                  artillery: [],
                  cavalry: [],
                  guard: [],
                  infantry: [],
                },
              },
            ],
            [
              "VI",
              {
                status: CorpsStatus.Reserve,
                size: {
                  artillery: 0,
                  cavalry: 0,
                  guard: 0,
                  infantry: 6,
                },
                composition: {
                  artillery: [],
                  cavalry: [],
                  guard: [],
                  infantry: [],
                },
              },
            ],
            [
              "VII",
              {
                status: CorpsStatus.Reserve,
                size: {
                  artillery: 0,
                  cavalry: 0,
                  guard: 0,
                  infantry: 6,
                },
                composition: {
                  artillery: [],
                  cavalry: [],
                  guard: [],
                  infantry: [],
                },
              },
            ],
            [
              "VIII",
              {
                status: CorpsStatus.Reserve,
                size: {
                  artillery: 0,
                  cavalry: 0,
                  guard: 0,
                  infantry: 6,
                },
                composition: {
                  artillery: [],
                  cavalry: [],
                  guard: [],
                  infantry: [],
                },
              },
            ],
            [
              "IX",
              {
                status: CorpsStatus.Reserve,
                size: {
                  artillery: 0,
                  cavalry: 0,
                  guard: 0,
                  infantry: 6,
                },
                composition: {
                  artillery: [],
                  cavalry: [],
                  guard: [],
                  infantry: [],
                },
              },
            ],
            [
              "X",
              {
                status: CorpsStatus.Reserve,
                size: {
                  artillery: 0,
                  cavalry: 0,
                  guard: 0,
                  infantry: 6,
                },
                composition: {
                  artillery: [],
                  cavalry: [],
                  guard: [],
                  infantry: [],
                },
              },
            ],
            [
              "XI",
              {
                status: CorpsStatus.Reserve,
                size: {
                  artillery: 0,
                  cavalry: 0,
                  guard: 0,
                  infantry: 6,
                },
                composition: {
                  artillery: [],
                  cavalry: [],
                  guard: [],
                  infantry: [],
                },
              },
            ],
            [
              "XII",
              {
                status: CorpsStatus.Reserve,
                size: {
                  artillery: 0,
                  cavalry: 0,
                  guard: 0,
                  infantry: 6,
                },
                composition: {
                  artillery: [],
                  cavalry: [],
                  guard: [],
                  infantry: [],
                },
              },
            ],
            [
              "XIII",
              {
                status: CorpsStatus.Reserve,
                size: {
                  artillery: 0,
                  cavalry: 0,
                  guard: 0,
                  infantry: 6,
                },
                composition: {
                  artillery: [],
                  cavalry: [],
                  guard: [],
                  infantry: [],
                },
              },
            ],
            [
              "C I",
              {
                status: CorpsStatus.Reserve,
                size: {
                  artillery: 0,
                  cavalry: 3,
                  guard: 0,
                  infantry: 0,
                },
                composition: {
                  artillery: [],
                  cavalry: [],
                  guard: [],
                  infantry: [],
                },
              },
            ],
            [
              "C II",
              {
                status: CorpsStatus.Reserve,
                size: {
                  artillery: 0,
                  cavalry: 3,
                  guard: 0,
                  infantry: 0,
                },
                composition: {
                  artillery: [],
                  cavalry: [],
                  guard: [],
                  infantry: [],
                },
              },
            ],
            [
              "C III",
              {
                status: CorpsStatus.Reserve,
                size: {
                  artillery: 0,
                  cavalry: 3,
                  guard: 0,
                  infantry: 0,
                },
                composition: {
                  artillery: [],
                  cavalry: [],
                  guard: [],
                  infantry: [],
                },
              },
            ],
            [
              "C IV",
              {
                status: CorpsStatus.Reserve,
                size: {
                  artillery: 0,
                  cavalry: 3,
                  guard: 0,
                  infantry: 0,
                },
                composition: {
                  artillery: [],
                  cavalry: [],
                  guard: [],
                  infantry: [],
                },
              },
            ],
          ]),
          recruitment: [
            createReinforcement(65, "infantry", startDate),
            createReinforcement(2, "cavalry", startDate),
            createReinforcement(2, "guard", startDate),
          ],
          commanders: new Map<string, Commander>([
            ["Potemkin", {
              name: "Potemkin",
              royal: false,
              strategic: 3,
              tactical: 4,
              tacticalMaximum: 4,
              seniority: CommanderSeniority.A,
              cavalry: false,
            }],
            ["Suvarov", {
              name: "Suvarov",
              royal: false,
              strategic: 4,
              tactical: 5,
              tacticalMaximum: 4,
              seniority: CommanderSeniority.B,
              cavalry: true,
            }],
            ["Buxhowden", {
              name: "Buxhowden",
              royal: false,
              strategic: 2,
              tactical: 1,
              tacticalMaximum: 2,
              seniority: CommanderSeniority.C,
              cavalry: false,
            }],
            ["Bagration", {
              name: "Bagration",
              royal: false,
              strategic: 2,
              tactical: 4,
              tacticalMaximum: 3,
              seniority: CommanderSeniority.C,
              cavalry: false,
            }],
            ["Kutuzov", {
              name: "Kutuzov",
              royal: false,
              strategic: 3,
              tactical: 4,
              tacticalMaximum: 4,
              seniority: CommanderSeniority.B,
              cavalry: false,
            }],
            ["Default", {
              name: "Default",
              royal: false,
              strategic: 1,
              tactical: 2,
              tacticalMaximum: 1,
              seniority: CommanderSeniority.D,
              cavalry: false,
            }],
          ])
        },
        general: {
          victoryPoints: 0,
          victoryCondition: 881,
        },
        finances: {
          currency: "ruble",
          money: 40,
        },
      },
    ],
    [
      "spa",
      {
        name: "Spain",
        identifier: "spa",
        army: {
          corps: new Map<string, Corps>([
            [
              "I",
              {
                status: CorpsStatus.Reserve,
                size: {
                  artillery: 0,
                  cavalry: 0,
                  guard: 0,
                  infantry: 10,
                },
                composition: {
                  artillery: [],
                  cavalry: [],
                  guard: [],
                  infantry: [],
                },
              },
            ],
            [
              "II",
              {
                status: CorpsStatus.Reserve,
                size: {
                  artillery: 0,
                  cavalry: 0,
                  guard: 0,
                  infantry: 10,
                },
                composition: {
                  artillery: [],
                  cavalry: [],
                  guard: [],
                  infantry: [],
                },
              },
            ],
            [
              "III",
              {
                status: CorpsStatus.Reserve,
                size: {
                  artillery: 0,
                  cavalry: 0,
                  guard: 0,
                  infantry: 10,
                },
                composition: {
                  artillery: [],
                  cavalry: [],
                  guard: [],
                  infantry: [],
                },
              },
            ],
            [
              "IV",
              {
                status: CorpsStatus.Reserve,
                size: {
                  artillery: 0,
                  cavalry: 0,
                  guard: 0,
                  infantry: 10,
                },
                composition: {
                  artillery: [],
                  cavalry: [],
                  guard: [],
                  infantry: [],
                },
              },
            ],
            [
              "V",
              {
                status: CorpsStatus.Reserve,
                size: {
                  artillery: 0,
                  cavalry: 0,
                  guard: 0,
                  infantry: 10,
                },
                composition: {
                  artillery: [],
                  cavalry: [],
                  guard: [],
                  infantry: [],
                },
              },
            ],
            [
              "VI",
              {
                status: CorpsStatus.Reserve,
                size: {
                  artillery: 0,
                  cavalry: 0,
                  guard: 0,
                  infantry: 10,
                },
                composition: {
                  artillery: [],
                  cavalry: [],
                  guard: [],
                  infantry: [],
                },
              },
            ],
            [
              "VII",
              {
                status: CorpsStatus.Reserve,
                size: {
                  artillery: 0,
                  cavalry: 0,
                  guard: 0,
                  infantry: 10,
                },
                composition: {
                  artillery: [],
                  cavalry: [],
                  guard: [],
                  infantry: [],
                },
              },
            ],
          ]),
          recruitment: [
            createReinforcement(11, "infantry", startDate),
          ],
          commanders: new Map<string, Commander>([
            ["Godyo", {
              name: "Godyo",
              royal: false,
              strategic: 1,
              tactical: 1,
              tacticalMaximum: 3,
              seniority: CommanderSeniority.A,
              cavalry: false,
            }],
            ["Castanos", {
              name: "Castanos",
              royal: false,
              strategic: 3,
              tactical: 3,
              tacticalMaximum: 3,
              seniority: CommanderSeniority.B,
              cavalry: false,
            }],
            ["La Romana", {
              name: "La Romana",
              royal: false,
              strategic: 2,
              tactical: 2,
              tacticalMaximum: 3,
              seniority: CommanderSeniority.B,
              cavalry: false,
            }],
            ["Caro", {
              name: "Caro",
              royal: false,
              strategic: 2,
              tactical: 2,
              tacticalMaximum: 1,
              seniority: CommanderSeniority.C,
              cavalry: false,
            }],
          ])
        },
        general: {
          victoryPoints: 0,
          victoryCondition: 775,
        },
        finances: {
          currency: "dublon",
          money: 40,
        },
      },
    ],
    [
      "swe",
      {
        name: "Sweden",
        identifier: "swe",
        army: {
          corps: new Map<string, Corps>([
            [
              "I",
              {
                status: CorpsStatus.Reserve,
                size: {
                  artillery: 0,
                  cavalry: 0,
                  guard: 0,
                  infantry: 10,
                },
                composition: {
                  artillery: [],
                  cavalry: [],
                  guard: [],
                  infantry: [],
                },
              },
            ],
            [
              "II",
              {
                status: CorpsStatus.Reserve,
                size: {
                  artillery: 0,
                  cavalry: 0,
                  guard: 0,
                  infantry: 10,
                },
                composition: {
                  artillery: [],
                  cavalry: [],
                  guard: [],
                  infantry: [],
                },
              },
            ],
            [
              "III",
              {
                status: CorpsStatus.Reserve,
                size: {
                  artillery: 0,
                  cavalry: 0,
                  guard: 0,
                  infantry: 6,
                },
                composition: {
                  artillery: [],
                  cavalry: [],
                  guard: [],
                  infantry: [],
                },
              },
            ],
            [
              "C",
              {
                status: CorpsStatus.Reserve,
                size: {
                  artillery: 0,
                  cavalry: 1,
                  guard: 0,
                  infantry: 0,
                },
                composition: {
                  artillery: [],
                  cavalry: [],
                  guard: [],
                  infantry: [],
                },
              },
            ],
          ]),
          recruitment: [
            createReinforcement(11, "infantry", startDate),
          ],
          commanders: new Map<string, Commander>([
            ["Gustav IV Adolf", {
              name: "Gustav IV Adolf",
              royal: true,
              strategic: 1,
              tactical: 1,
              tacticalMaximum: 3,
              seniority: CommanderSeniority.A,
              cavalry: false,
            }],
            ["Sandels", {
              name: "Sandels",
              royal: false,
              strategic: 2,
              tactical: 4,
              tacticalMaximum: 1,
              seniority: CommanderSeniority.D,
              cavalry: false,
            }],
            ["Adlercreutz", {
              name: "Adlercreutz",
              royal: false,
              strategic: 2,
              tactical: 2,
              tacticalMaximum: 3,
              seniority: CommanderSeniority.B,
              cavalry: false,
            }],
            ["Döbeln", {
              name: "Döbeln",
              royal: false,
              strategic: 3,
              tactical: 3,
              tacticalMaximum: 2,
              seniority: CommanderSeniority.C,
              cavalry: false,
            }],
            ["Default", {
              name: "Default",
              royal: false,
              strategic: 1,
              tactical: 2,
              tacticalMaximum: 1,
              seniority: CommanderSeniority.D,
              cavalry: false,
            }],
          ]),
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
          corps: new Map<string, Corps>([
            [
              "Janissar I",
              {
                status: CorpsStatus.Reserve,
                size: {
                  artillery: 0,
                  cavalry: 0,
                  guard: 0,
                  infantry: 12,
                },
                composition: {
                  artillery: [],
                  cavalry: [],
                  guard: [],
                  infantry: [],
                },
              },
            ],
            [
              "Janissar II",
              {
                status: CorpsStatus.Reserve,
                size: {
                  artillery: 0,
                  cavalry: 0,
                  guard: 0,
                  infantry: 12,
                },
                composition: {
                  artillery: [],
                  cavalry: [],
                  guard: [],
                  infantry: [],
                },
              },
            ],
            [
              "Imperial Cavalry",
              {
                status: CorpsStatus.Reserve,
                size: {
                  artillery: 0,
                  cavalry: 6,
                  guard: 0,
                  infantry: 0,
                },
                composition: {
                  artillery: [],
                  cavalry: [],
                  guard: [],
                  infantry: [],
                },
              },
            ],
            [
              "Albanian Feudal Infantry",
              {
                status: CorpsStatus.Reserve,
                size: {
                  artillery: 0,
                  cavalry: 0,
                  guard: 0,
                  infantry: 9,
                },
                composition: {
                  artillery: [],
                  cavalry: [],
                  guard: [],
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
                status: CorpsStatus.Reserve,
                size: {
                  artillery: 0,
                  cavalry: 0,
                  guard: 0,
                  infantry: 9,
                },
                composition: {
                  artillery: [],
                  cavalry: [],
                  guard: [],
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
                status: CorpsStatus.Reserve,
                size: {
                  artillery: 0,
                  cavalry: 0,
                  guard: 0,
                  infantry: 9,
                },
                composition: {
                  artillery: [],
                  cavalry: [],
                  guard: [],
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
                status: CorpsStatus.Reserve,
                size: {
                  artillery: 0,
                  cavalry: 0,
                  guard: 0,
                  infantry: 9,
                },
                composition: {
                  artillery: [],
                  cavalry: [],
                  guard: [],
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
                status: CorpsStatus.Reserve,
                size: {
                  artillery: 0,
                  cavalry: 0,
                  guard: 0,
                  infantry: 9,
                },
                composition: {
                  artillery: [],
                  cavalry: [],
                  guard: [],
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
                status: CorpsStatus.Reserve,
                size: {
                  artillery: 0,
                  cavalry: 0,
                  guard: 0,
                  infantry: 9,
                },
                composition: {
                  artillery: [],
                  cavalry: [],
                  guard: [],
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
                status: CorpsStatus.Reserve,
                size: {
                  artillery: 0,
                  cavalry: 0,
                  guard: 0,
                  infantry: 9,
                },
                composition: {
                  artillery: [],
                  cavalry: [],
                  guard: [],
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
                status: CorpsStatus.Reserve,
                size: {
                  artillery: 0,
                  cavalry: 0,
                  guard: 0,
                  infantry: 9,
                },
                composition: {
                  artillery: [],
                  cavalry: [],
                  guard: [],
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
                status: CorpsStatus.Reserve,
                size: {
                  artillery: 0,
                  cavalry: 8,
                  guard: 0,
                  infantry: 0,
                },
                composition: {
                  artillery: [],
                  cavalry: createFactors(8, "cavalry", "Feudal cavalry #", 2),
                  guard: [],
                  infantry: [],
                },
              },
            ],
            [
              "Anatolian Feudal Cavalry II",
              {
                status: CorpsStatus.Reserve,
                size: {
                  artillery: 0,
                  cavalry: 8,
                  guard: 0,
                  infantry: 0,
                },
                composition: {
                  artillery: [],
                  cavalry: createFactors(8, "cavalry", "Feudal cavalry #", 2),
                  guard: [],
                  infantry: [],
                },
              },
            ],
            [
              "Rumelian Feudal Cavalry",
              {
                status: CorpsStatus.Reserve,
                size: {
                  artillery: 0,
                  cavalry: 8,
                  guard: 0,
                  infantry: 0,
                },
                composition: {
                  artillery: [],
                  cavalry: createFactors(8, "cavalry", "Feudal cavalry #", 2),
                  guard: [],
                  infantry: [],
                },
              },
            ],
          ]),
          recruitment: [
            createReinforcement(3, "infantry", startDate),
          ],
          commanders: new Map<string, Commander>([
            ["Grand Vizier", {
              name: "Grand Vizier",
              royal: false,
              strategic: 2,
              tactical: 2,
              tacticalMaximum: 5,
              seniority: CommanderSeniority.A,
              cavalry: false,
            }],
            ["Selim II", {
              name: "Selim II",
              royal: true,
              strategic: 1,
              tactical: 1,
              tacticalMaximum: 6,
              seniority: CommanderSeniority.A,
              cavalry: false,
            }],
            ["Pehlivan Khan", {
              name: "Pehlivan Khan",
              royal: false,
              strategic: 3,
              tactical: 4,
              tacticalMaximum: 3,
              seniority: CommanderSeniority.B,
              cavalry: false,
            }],
            ["Ali Pasha", {
              name: "Ali Pasha",
              royal: false,
              strategic: 2,
              tactical: 3,
              tacticalMaximum: 2,
              seniority: CommanderSeniority.B,
              cavalry: false,
            }],
            ["Abdurrahman", {
              name: "Abdurrahman",
              royal: false,
              strategic: 2,
              tactical: 2,
              tacticalMaximum: 2,
              seniority: CommanderSeniority.C,
              cavalry: true,
            }],
            ["Husrev", {
              name: "Husrev",
              royal: false,
              strategic: 2,
              tactical: 2,
              tacticalMaximum: 3,
              seniority: CommanderSeniority.C,
              cavalry: false,
            }],
            ["Krûshid", {
              name: "Krûshid",
              royal: false,
              strategic: 2,
              tactical: 2,
              tacticalMaximum: 2,
              seniority: CommanderSeniority.C,
              cavalry: false,
            }],
            ["Beylerbey", {
              name: "Beylerbey",
              royal: true,
              strategic: 1,
              tactical: 2,
              tacticalMaximum: 3,
              seniority: CommanderSeniority.C,
              cavalry: false,
            }],
            ["Hakki", {
              name: "Hakki",
              royal: false,
              strategic: 2,
              tactical: 2,
              tacticalMaximum: 2,
              seniority: CommanderSeniority.D,
              cavalry: true,
            }],
            ["Default", {
              name: "Default",
              royal: false,
              strategic: 1,
              tactical: 1,
              tacticalMaximum: 1,
              seniority: CommanderSeniority.D,
              cavalry: false,
            }],
          ])
        },
        general: {
          victoryPoints: 0,
          victoryCondition: 780,
        },
        finances: {
          currency: "lira",
          money: 25,
        },
      },
    ],
  ]),
});
