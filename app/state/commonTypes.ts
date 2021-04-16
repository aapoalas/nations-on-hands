export type Month = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;

export enum EconomicMonth {
  March = 2,
  June = 5,
  September = 8,
  Deceomber = 11,
}

export enum TurnPhase {
  Setup = -1,
  // Diplomatic = 0,
  Reinforcement = 1,
  // Naval = 2,
  Land = 3,
  Economic = 4,
}

export type PlayerCountryID =
  | "fr"
  | "aus"
  | "pr"
  | "ru"
  | "swe"
  | "gb"
  | "spa"
  | "tur";
