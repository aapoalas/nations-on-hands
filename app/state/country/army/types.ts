import { Month } from "../../commonTypes.ts";

export enum CorpsStatus {
  "Inactive" = 0,
  "Reserve" = 1,
  "Active" = 2,
}

export type FactorType = "guards" | "infantry" | "cavalry" | "artillery";

export type CorpsSize = Record<FactorType, number>;

export interface Factor {
  name: string;
  type: FactorType;
  morale: number;
}

export type CorpsComposition = Record<FactorType, Factor[]>;

export interface InactiveCorps {
  status: CorpsStatus.Inactive;
  size: CorpsSize;
}

export interface ReserveCorps {
  status: CorpsStatus.Reserve;
  size: CorpsSize;
  composition: CorpsComposition;
}

export interface ActiveCorps {
  status: CorpsStatus.Active;
  size: CorpsSize;
  composition: CorpsComposition;
}

export type Corps = InactiveCorps | ReserveCorps | ActiveCorps;

export interface Recruitment {
  month: Month;
  year: number;
  type: FactorType;
  morale: number;
  count: number;
}

export interface CountryArmy {
  corps: Map<string, Corps>;
  recruitment: Recruitment[];
}

export interface Placement {
  type: FactorType;
  morale: number;
  count: number;
}

export type Placements = Record<string, Placement[]>;
