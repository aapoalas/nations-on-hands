import { Month } from "../../commonTypes.ts";

export enum CorpsStatus {
  "Inactive" = 0,
  "Reserve" = 1,
  "Active" = 2,
}

export type FactorType = "guard" | "infantry" | "cavalry" | "artillery";

export type CorpsSize = Readonly<Record<FactorType, number>>;

export interface Factor {
  readonly name: string;
  readonly type: FactorType;
  readonly morale: number;
}

export type CorpsComposition = Readonly<Record<FactorType, readonly Factor[]>>;

export interface InactiveCorps {
  readonly status: CorpsStatus.Inactive;
  readonly size: CorpsSize;
}

export interface ReserveCorps {
  readonly status: CorpsStatus.Reserve;
  readonly size: CorpsSize;
  readonly composition: CorpsComposition;
}

export interface ActiveCorps {
  readonly status: CorpsStatus.Active;
  readonly size: CorpsSize;
  readonly composition: CorpsComposition;
}

export type Corps = InactiveCorps | ReserveCorps | ActiveCorps;

export type CommanderRating = 1 | 2 | 3 | 4 | 5 | 6;

export const enum CommanderSeniority {
  A = 0,
  B = 1,
  C = 2,
  D = 3,
}

export interface Commander {
  readonly name: string;
  readonly strategic: CommanderRating;
  readonly tactical: CommanderRating;
  readonly tacticalMaximum: CommanderRating;
  readonly seniority: CommanderSeniority;
  readonly cavalry: boolean;
  readonly royal: boolean;
}

export interface Recruitment {
  readonly month: Month;
  readonly year: number;
  readonly type: FactorType;
  readonly morale: number;
  readonly count: number;
}

export interface CountryArmy {
  readonly corps: Map<string, Corps>;
  readonly commanders: Map<string, Commander>;
  readonly recruitment: readonly Recruitment[];
}

export interface Placement {
  readonly type: FactorType;
  readonly morale: number;
  readonly count: number;
}

export type Placements = Readonly<Record<string, readonly Placement[]>>;
