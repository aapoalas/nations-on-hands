type CombatResolutionLine = readonly [
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
];

interface CombatResolutionEntry {
  /**
   * Percentage Loss. Thisi steh percentage of factors in your force that
   * is inflicted as casualties on the enemy force during a combat round.
   *
   * Values between 0..25%.
   */
  casualty: CombatResolutionLine;
  /**
   * Morale Loss. This is the morale loss inflicted on the enemy force
   * during a combat round.
   *
   * Values between 0..-5.
   */
  morale: CombatResolutionLine;
}

type CombatResolutionTableIndex = 1 | 2 | 3 | 4 | 5;

/**
 * CASUALTY LEVEL - MORALE LEVEL
 */
type CombatResolutionName =
  `${CombatResolutionTableIndex}-${CombatResolutionTableIndex}`;

const COMBAT_RESOLUTION_CHART: Record<
  CombatResolutionName,
  CombatResolutionEntry
> = {
  "1-1": {
    casualty: [0, 0, 0, 0, 0, 0, 0.05, 0.05],
    morale: [0, 0, 0, 0, 0.2, 0.4, 0.6, 0.8],
  },
  "1-2": {
    casualty: [0, 0, 0, 0, 0.05, 0.05, 0.05, 0.1],
    morale: [0, 0, 0.2, 0.5, 0.8, 1.1, 1.5, 1.9],
  },
  "1-3": {
    casualty: [0, 0, 0, 0.05, 0.05, 0.05, 0.1, 0.1],
    morale: [0, 0.3, 0.6, 0.9, 1.3, 1.8, 2.3, 2.8],
  },
  "1-4": {
    casualty: [0, 0, 0.05, 0.05, 0.05, 0.1, 0.1, 0.1],
    morale: [0.4, 0.6, 0.9, 1.3, 1.8, 2.4, 3.0, 3.6],
  },
  "1-5": {
    casualty: [0, 0.05, 0.05, 0.05, 0.05, 0.1, 0.1, 0.15],
    morale: [0.9, 1.1, 1.4, 1.8, 2.3, 2.9, 3.5, 4.1],
  },
  "2-1": {
    casualty: [0, 0, 0, 0.05, 0.05, 0.05, 0.1, 0.1],
    morale: [0, 0, 0, 0.2, 0.5, 0.8, 1.1, 1.4],
  },
  "2-2": {
    casualty: [0, 0, 0.05, 0.05, 0.05, 0.1, 0.1, 0.1],
    morale: [0, 0.2, 0.4, 0.7, 1.0, 1.4, 1.9, 2.4],
  },
  "2-3": {
    casualty: [0, 0, 0.05, 0.05, 0.1, 0.1, 0.1, 0.15],
    morale: [0.3, 0.5, 0.8, 1.1, 1.5, 2.0, 2.6, 3.2],
  },
  "2-4": {
    casualty: [0, 0.05, 0.05, 0.05, 0.1, 0.1, 0.15, 0.15],
    morale: [0.6, 0.9, 1.2, 1.6, 2.1, 2.6, 3.2, 3.8],
  },
  "2-5": {
    casualty: [0.05, 0.05, 0.05, 0.1, 0.1, 0.1, 0.15, 0.15],
    morale: [1.1, 1.4, 1.7, 2.1, 2.6, 3.1, 3.7, 4.3],
  },
  "3-1": {
    casualty: [0, 0, 0.05, 0.05, 0.1, 0.1, 0.1, 0.15],
    morale: [0, 0, 0.2, 0.5, 0.8, 1.1, 1.5, 1.9],
  },
  "3-2": {
    casualty: [0, 0.05, 0.05, 0.05, 0.1, 0.1, 0.15, 0.15],
    morale: [0.1, 0.3, 0.6, 1.0, 1.4, 1.8, 2.2, 2.6],
  },
  "3-3": {
    casualty: [0, 0.05, 0.05, 0.1, 0.1, 0.15, 0.15, 0.15],
    morale: [0.5, 0.8, 1.1, 1.4, 1.8, 2.3, 2.8, 3.3],
  },
  "3-4": {
    casualty: [0.05, 0.05, 0.05, 0.1, 0.1, 0.15, 0.15, 0.2],
    morale: [0.9, 1.1, 1.4, 1.8, 2.3, 2.9, 3.5, 4.1],
  },
  "3-5": {
    casualty: [0.05, 0.05, 0.1, 0.1, 0.15, 0.15, 0.15, 0.2],
    morale: [1.4, 1.6, 1.9, 2.3, 2.8, 3.4, 4.0, 4.6],
  },
  "4-1": {
    casualty: [0, 0.05, 0.05, 0.1, 0.1, 0.15, 0.15, 0.15],
    morale: [0, 0.2, 0.4, 0.7, 1.0, 1.4, 1.9, 2.4],
  },
  "4-2": {
    casualty: [0, 0.05, 0.05, 0.1, 0.15, 0.15, 0.15, 0.2],
    morale: [0.4, 0.7, 1.0, 1.3, 1.6, 1.9, 2.3, 2.8],
  },
  "4-3": {
    casualty: [0.05, 0.05, 0.1, 0.1, 0.15, 0.15, 0.15, 0.2],
    morale: [0.8, 1.0, 1.3, 1.6, 2.0, 2.5, 3.1, 3.7],
  },
  "4-4": {
    casualty: [0.05, 0.1, 0.1, 0.1, 0.15, 0.15, 0.2, 0.2],
    morale: [1.1, 1.4, 1.7, 2.1, 2.6, 3.1, 3.7, 4.3],
  },
  "4-5": {
    casualty: [0.05, 0.1, 0.1, 0.15, 0.15, 0.2, 0.2, 0.2],
    morale: [1.6, 1.9, 2.2, 2.6, 3.1, 3.6, 4.2, 4.8],
  },
  "5-1": {
    casualty: [0.05, 0.05, 0.1, 0.1, 0.15, 0.15, 0.15, 0.2],
    morale: [0.1, 0.3, 0.6, 1.0, 1.4, 1.8, 2.2, 2.6],
  },
  "5-2": {
    casualty: [0.05, 0.1, 0.1, 0.1, 0.15, 0.15, 0.2, 0.2],
    morale: [0.5, 0.8, 1.1, 1.4, 1.8, 2.3, 2.8, 3.3],
  },
  "5-3": {
    casualty: [0.05, 0.1, 0.1, 0.15, 0.15, 0.2, 0.2, 0.2],
    morale: [0.9, 1.1, 1.4, 1.8, 2.3, 2.9, 3.5, 4.1],
  },
  "5-4": {
    casualty: [0.05, 0.1, 0.15, 0.15, 0.15, 0.2, 0.2, 0.25],
    morale: [1.3, 1.6, 2.0, 2.4, 2.9, 3.4, 3.9, 4.5],
  },
  "5-5": {
    casualty: [0.05, 0.1, 0.15, 0.15, 0.2, 0.2, 0.25, 0.25],
    morale: [1.8, 2.1, 2.5, 2.9, 3.4, 3.9, 4.4, 5.0],
  },
} as const;

type OperationalPossibilityLine = readonly [
  CombatResolutionName,
  CombatResolutionName,
  CombatResolutionName,
];
type OutflankedPossibilityLine = readonly [
  CombatResolutionName,
  CombatResolutionName,
];

interface OperationalPossibilityEntry {
  A: OperationalPossibilityLine;
  D: OperationalPossibilityLine;
}

interface OutflankOperationalPossibilityEntry
  extends OperationalPossibilityEntry {
  A__2nd__: OutflankedPossibilityLine;
  D__2nd__: OutflankedPossibilityLine;
}

export type AttackerOperationName =
  | "Outflank"
  | "Assault"
  | "EscalatedAssault"
  | "Echelon"
  | "Probe";

export type DefenderOperationName =
  | "Outflank"
  | "Counterattack"
  | "EscalatedCounterattack"
  | "Cordon"
  | "Withdraw"
  | "Defend";

type ExtendedDefenderOperationName = DefenderOperationName | "Cordon(River)";

type OperationalPossibilityName =
  `${AttackerOperationName}-${ExtendedDefenderOperationName}`;

const OPERATIONAL_POSSIBILITIES_CHART: Record<
  OperationalPossibilityName,
  OperationalPossibilityEntry
> = {
  "Outflank-Outflank": {
    A: ["1-2", "1-4", "2-4"],
    D: ["1-2", "1-4", "2-4"],
  },
  "Outflank-Counterattack": {
    A: ["2-1", "2-1", "2-2"],
    D: ["2-3", "3-3", "3-3"],
    A__2nd__: ["4-4", "4-4"],
    D__2nd__: ["3-1", "3-1"],
  } as OutflankOperationalPossibilityEntry,
  "Outflank-EscalatedCounterattack": {
    A: ["3-1", "3-1", "3-2"],
    D: ["3-3", "4-3", "4-3"],
    A__2nd__: ["5-4", "5-4"],
    D__2nd__: ["4-1", "4-1"],
  } as OutflankOperationalPossibilityEntry,
  "Outflank-Cordon": {
    A: ["2-1", "3-2", "2-1"],
    D: ["3-2", "4-2", "4-3"],
  },
  "Outflank-Cordon(River)": {
    A: ["2-1", "3-2", "2-1"],
    D: ["3-2", "4-2", "4-3"],
  },
  // If outflank fails, withdraw automatically succeeds
  "Outflank-Withdraw": {
    A: ["2-2", "3-4", "3-4"],
    D: ["1-1", "1-1", "1-1"],
  },
  "Outflank-Defend": {
    A: ["2-1", "3-1", "3-1"],
    D: ["3-1", "4-1", "4-2"],
    A__2nd__: ["2-4", "4-4"],
    D__2nd__: ["1-1", "1-1"],
  } as OutflankOperationalPossibilityEntry,
  "Assault-Outflank": {
    A: ["2-3", "3-3", "3-3"],
    D: ["2-1", "2-1", "2-2"],
    A__2nd__: ["3-1", "3-1"],
    D__2nd__: ["4-4", "4-4"],
  } as OutflankOperationalPossibilityEntry,
  "Assault-Counterattack": {
    A: ["3-1", "4-2", "3-2"],
    D: ["3-1", "4-2", "3-2"],
  },
  "Assault-EscalatedCounterattack": {
    A: ["4-1", "5-2", "4-2"],
    D: ["4-1", "5-2", "4-2"],
  },
  "Assault-Cordon": {
    A: ["4-1", "4-3", "4-1"],
    D: ["2-1", "2-1", "3-1"],
  },
  "Assault-Cordon(River)": {
    A: ["4-1", "4-2", "4-1"],
    D: ["2-1", "3-1", "4-1"],
  },
  "Assault-Withdraw": {
    A: ["4-2", "4-2", "4-3"],
    D: ["1-1", "1-1", "1-1"],
  },
  "Assault-Defend": {
    A: ["3-1", "3-1", "2-1"],
    D: ["4-1", "4-2", "4-3"],
  },
  "EscalatedAssault-Outflank": {
    A: ["3-3", "4-3", "3-3"],
    D: ["3-1", "3-1", "3-2"],
    A__2nd__: ["4-1", "4-1"],
    D__2nd__: ["5-4", "5-4"],
  } as OutflankOperationalPossibilityEntry,
  "EscalatedAssault-Counterattack": {
    A: ["4-1", "5-2", "4-2"],
    D: ["4-1", "5-2", "4-2"],
  },
  "EscalatedAssault-EscalatedCounterattack": {
    A: ["4-1", "5-2", "4-2"],
    D: ["4-1", "5-2", "4-2"],
  },
  "EscalatedAssault-Cordon": {
    A: ["5-1", "5-3", "5-1"],
    D: ["3-1", "3-1", "4-1"],
  },
  "EscalatedAssault-Cordon(River)": {
    A: ["5-2", "5-2", "5-1"],
    D: ["3-1", "4-1", "5-1"],
  },
  "EscalatedAssault-Withdraw": {
    A: ["5-2", "5-2", "5-3"],
    D: ["2-1", "2-1", "2-1"],
  },
  "EscalatedAssault-Defend": {
    A: ["3-1", "3-1", "2-1"],
    D: ["5-1", "5-2", "5-3"],
  },
  "Echelon-Outflank": {
    A: ["2-1", "3-1", "3-2"],
    D: ["2-1", "2-1", "2-1"],
    A__2nd__: ["2-1", "1-1"],
    D__2nd__: ["3-3", "3-4"],
  } as OutflankOperationalPossibilityEntry,
  "Echelon-Counterattack": {
    A: ["1-2", "3-4", "2-4"],
    D: ["3-1", "4-1", "2-1"],
  },
  "Echelon-EscalatedCounterattack": {
    A: ["2-2", "4-4", "3-4"],
    D: ["3-1", "4-1", "2-1"],
  },
  "Echelon-Cordon": {
    A: ["2-1", "3-1", "4-1"],
    D: ["3-1", "4-2", "4-3"],
  },
  "Echelon-Cordon(River)": {
    A: ["2-1", "3-1", "3-1"],
    D: ["4-1", "4-2", "4-3"],
  },
  "Echelon-Withdraw": {
    A: ["3-1", "3-2", "3-3"],
    D: ["1-1", "1-1", "1-2"],
  },
  "Echelon-Defend": {
    A: ["1-3", "2-3", "2-4"],
    D: ["4-1", "3-1", "2-1"],
  },
  "Probe-Outflank": {
    A: ["2-1", "4-2", "4-3"],
    D: ["2-1", "2-1", "1-1"],
    A__2nd__: ["4-2", "4-2"],
    D__2nd__: ["2-3", "2-2"],
  } as OutflankOperationalPossibilityEntry,
  "Probe-Counterattack": {
    A: ["1-1", "1-3", "2-2"],
    D: ["3-2", "3-2", "4-2"],
  },
  "Probe-EscalatedCounterattack": {
    A: ["2-1", "2-3", "3-2"],
    D: ["4-2", "4-2", "5-2"],
  },
  "Probe-Cordon": {
    A: ["1-1", "4-2", "3-2"],
    D: ["1-2", "2-1", "5-2"],
  },
  "Probe-Cordon(River)": {
    A: ["1-1", "4-1", "4-1"],
    D: ["1-2", "3-1", "3-1"],
  },
  // Probe-Withdraw is an automatic withdraw, this will never be accessed.
  "Probe-Withdraw": null as unknown as OperationalPossibilityEntry,
  "Probe-Defend": {
    A: ["1-1", "3-1", "3-3"],
    D: ["3-2", "3-1", "2-1"],
  },
} as const;

const splitCombatResolutionName = (
  combatResolutionName: CombatResolutionName,
): [CombatResolutionTableIndex, CombatResolutionTableIndex] => [
  parseInt(combatResolutionName[0], 10) as CombatResolutionTableIndex,
  parseInt(combatResolutionName[2], 10) as CombatResolutionTableIndex,
];

const FOREST_MODIFIER_FUNCTION = (
  name: CombatResolutionName,
): CombatResolutionName => {
  const [casualty, morale] = splitCombatResolutionName(name);
  return `${Math.max(1, casualty - 1) as CombatResolutionTableIndex}-${morale}`;
};

const MOUNTAIN_ATTACKER_MODIFIER_FUNCTION = FOREST_MODIFIER_FUNCTION;

const DESERT_MODIFIER_FUNCTION = (
  name: CombatResolutionName,
): CombatResolutionName => {
  const [casualty, morale] = splitCombatResolutionName(name);
  return `${casualty}-${Math.min(morale + 1, 5) as CombatResolutionTableIndex}`;
};

const MARSH_MODIFIER_FUNCTION = (
  name: CombatResolutionName,
): CombatResolutionName => {
  const [casualty, morale] = splitCombatResolutionName(name);
  return `${Math.max(1, casualty - 1) as CombatResolutionTableIndex}-${Math.min(
    morale + 1,
    5,
  ) as CombatResolutionTableIndex}`;
};

const isOutflankOperationalPossibilityEntry = (
  entry: OperationalPossibilityEntry,
): entry is OutflankOperationalPossibilityEntry => "A__2nd__" in entry;

const MODIFIER_FUNCTIONS = {
  Forest: (entry: OperationalPossibilityEntry) => {
    if (isOutflankOperationalPossibilityEntry(entry)) {
      return {
        A: entry.A.map(
          FOREST_MODIFIER_FUNCTION,
        ) as unknown as OperationalPossibilityLine,
        D: entry.D.map(
          FOREST_MODIFIER_FUNCTION,
        ) as unknown as OperationalPossibilityLine,
        A__2nd__: entry.A__2nd__.map(
          FOREST_MODIFIER_FUNCTION,
        ) as unknown as OutflankedPossibilityLine,
        D__2nd__: entry.D__2nd__.map(
          FOREST_MODIFIER_FUNCTION,
        ) as unknown as OutflankedPossibilityLine,
      } as OutflankOperationalPossibilityEntry;
    } else {
      return {
        A: entry.A.map(
          FOREST_MODIFIER_FUNCTION,
        ) as unknown as OperationalPossibilityLine,
        D: entry.D.map(
          FOREST_MODIFIER_FUNCTION,
        ) as unknown as OperationalPossibilityLine,
      };
    }
  },
  Mountain: (
    entry: OperationalPossibilityEntry,
  ): OperationalPossibilityEntry => {
    if (isOutflankOperationalPossibilityEntry(entry)) {
      // Outflank
      return {
        ...entry,
        A: entry.A.map(
          MOUNTAIN_ATTACKER_MODIFIER_FUNCTION,
        ) as unknown as OperationalPossibilityLine,
        A__2nd__: entry.A__2nd__.map(
          MOUNTAIN_ATTACKER_MODIFIER_FUNCTION,
        ) as unknown as OutflankedPossibilityLine,
      } as OutflankOperationalPossibilityEntry;
    } else {
      return {
        ...entry,
        A: entry.A.map(
          MOUNTAIN_ATTACKER_MODIFIER_FUNCTION,
        ) as unknown as OperationalPossibilityLine,
      };
    }
  },
  Desert: (
    entry: OperationalPossibilityEntry,
  ): OperationalPossibilityEntry => {
    if (isOutflankOperationalPossibilityEntry(entry)) {
      return {
        A: entry.A.map(
          DESERT_MODIFIER_FUNCTION,
        ) as unknown as OperationalPossibilityLine,
        D: entry.D.map(
          DESERT_MODIFIER_FUNCTION,
        ) as unknown as OperationalPossibilityLine,
        A__2nd__: entry.A__2nd__.map(
          DESERT_MODIFIER_FUNCTION,
        ) as unknown as OutflankedPossibilityLine,
        D__2nd__: entry.D__2nd__.map(
          DESERT_MODIFIER_FUNCTION,
        ) as unknown as OutflankedPossibilityLine,
      } as OutflankOperationalPossibilityEntry;
    } else {
      return {
        A: entry.A.map(
          DESERT_MODIFIER_FUNCTION,
        ) as unknown as OperationalPossibilityLine,
        D: entry.D.map(
          DESERT_MODIFIER_FUNCTION,
        ) as unknown as OperationalPossibilityLine,
      };
    }
  },
  Marsh: (
    entry: OperationalPossibilityEntry,
  ): OperationalPossibilityEntry => {
    if (isOutflankOperationalPossibilityEntry(entry)) {
      return {
        A: entry.A.map(
          MARSH_MODIFIER_FUNCTION,
        ) as unknown as OperationalPossibilityLine,
        D: entry.D.map(
          MARSH_MODIFIER_FUNCTION,
        ) as unknown as OperationalPossibilityLine,
        A__2nd__: entry.A__2nd__.map(
          MARSH_MODIFIER_FUNCTION,
        ) as unknown as OutflankedPossibilityLine,
        D__2nd__: entry.D__2nd__.map(
          MARSH_MODIFIER_FUNCTION,
        ) as unknown as OutflankedPossibilityLine,
      } as OutflankOperationalPossibilityEntry;
    } else {
      return {
        A: entry.A.map(
          MARSH_MODIFIER_FUNCTION,
        ) as unknown as OperationalPossibilityLine,
        D: entry.D.map(
          MARSH_MODIFIER_FUNCTION,
        ) as unknown as OperationalPossibilityLine,
      };
    }
  },
} as const;

export const enum TerrainModifier {
  None,
  Forest,
  Mountain,
  Desert,
  Marsh,
}

type ChitsToOperationalPossibilityEntryType<
  A extends AttackerOperationName,
  D extends DefenderOperationName,
> = A extends "Probe"
  ? D extends "Withdraw" ? null : OperationalPossibilityEntry
  : A extends "Outflank"
    ? D extends "Outflank" | "Cordon" ? OperationalPossibilityEntry
    : OutflankOperationalPossibilityEntry
  : D extends "Outflank" ? A extends "Outflank" ? OperationalPossibilityEntry
    : OutflankOperationalPossibilityEntry
  : OperationalPossibilityEntry;

export const getOperationalPossibilityEntry = (
  attackerChit: AttackerOperationName,
  defenderChit: DefenderOperationName,
  attackingAcrossRiver: boolean,
  terrain: TerrainModifier,
): ChitsToOperationalPossibilityEntryType<
  typeof attackerChit,
  typeof defenderChit
> => {
  if (defenderChit === "Withdraw" && attackerChit === "Probe") {
    return null;
  }

  const modifiedDefenderChit: ExtendedDefenderOperationName =
    attackingAcrossRiver && defenderChit === "Cordon"
      ? "Cordon(River)"
      : defenderChit;

  const baseEntry =
    OPERATIONAL_POSSIBILITIES_CHART[`${attackerChit}-${modifiedDefenderChit}`];

  if (terrain === TerrainModifier.Forest) {
    return MODIFIER_FUNCTIONS.Forest(baseEntry);
  } else if (terrain === TerrainModifier.Mountain) {
    return MODIFIER_FUNCTIONS.Mountain(baseEntry);
  } else if (terrain === TerrainModifier.Desert) {
    return MODIFIER_FUNCTIONS.Desert(baseEntry);
  } else if (terrain === TerrainModifier.Marsh) {
    return MODIFIER_FUNCTIONS.Marsh(baseEntry);
  }
  return baseEntry;
};

export const getAttackerCombatResolutionEntry = (
  operationalEntry: OperationalPossibilityEntry,
  round: 0 | 1 | 2,
  outflanked: boolean,
): CombatResolutionEntry => {
  if (
    round > 0 && outflanked &&
    isOutflankOperationalPossibilityEntry(operationalEntry)
  ) {
    return COMBAT_RESOLUTION_CHART[operationalEntry.A__2nd__[round - 1]];
  }
  return COMBAT_RESOLUTION_CHART[operationalEntry.A[round]];
};

export const getDefenderCombatResolutionEntry = (
  operationalEntry: OperationalPossibilityEntry,
  round: 0 | 1 | 2,
  outflanked: boolean,
): CombatResolutionEntry => {
  if (
    round > 0 && outflanked &&
    isOutflankOperationalPossibilityEntry(operationalEntry)
  ) {
    return COMBAT_RESOLUTION_CHART[operationalEntry.D__2nd__[round - 1]];
  }
  return COMBAT_RESOLUTION_CHART[operationalEntry.D[round]];
};

export interface CombatState {
  attackerChit: AttackerOperationName;
  attackerFactors: number;
  attackerMorale: number;
  attackingOverRiver: boolean;
  defenderChit: DefenderOperationName;
  defenderFactors: number;
  defenderMorale: number;
  operationalPossibilityEntry: OperationalPossibilityEntry;
  outflanked: boolean;
  terrain: TerrainModifier;
}
