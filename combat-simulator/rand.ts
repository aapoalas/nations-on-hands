import { getInitialState } from "../app/setups/TheRevolutionCampaign.ts";
import {
  ActiveCorps,
  Corps,
  CorpsStatus,
  FactorType,
} from "../app/state/country/army/types.ts";
import { CountryState } from "../app/state/country/reducers.ts";
import {
  AttackerOperationName,
  CombatState,
  DefenderOperationName,
  getAttackerCombatResolutionEntry,
  getDefenderCombatResolutionEntry,
  getOperationalPossibilityEntry,
  TerrainModifier,
} from "./mod.ts";

export const rollD6 = (mod: 0 | 1 | 2 | 3 = 0) =>
  (Math.floor(Math.random() * 6 + 1) + mod) as
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9;

export const chooseAttackerChit = (
  corpsCount: number,
): AttackerOperationName => {
  const rand = corpsCount === 1
    // Outflank not allowed
    ? Math.floor(Math.random() * 4) + 1
    : Math.floor(Math.random() * 5);
  if (rand === 0) {
    return "Outflank";
  } else if (rand === 1) {
    return "Assault";
  } else if (rand === 2) {
    return "EscalatedAssault";
  } else if (rand === 3) {
    return "Echelon";
  } else if (rand === 4) {
    return "Probe";
  }
  throw new Error("Wrong");
};

export const chooseDefenderChit = (
  corpsCount: number,
): DefenderOperationName => {
  const rand = corpsCount === 1
    // Outflank not allowed
    ? Math.floor(Math.random() * 5) + 1
    : Math.floor(Math.random() * 6);
  if (rand === 0) {
    return "Outflank";
  } else if (rand === 1) {
    return "Counterattack";
  } else if (rand === 2) {
    return "EscalatedCounterattack";
  } else if (rand === 3) {
    return "Cordon";
  } else if (rand === 4) {
    return "Withdraw";
  } else if (rand === 5) {
    return "Defend";
  }
  throw new Error("Wrong");
};

export const chooseCombatTerrain = (): TerrainModifier => {
  const rand = Math.random();
  if (rand < 0.6) {
    return TerrainModifier.None;
  } else if (rand < 0.75) {
    return TerrainModifier.Forest;
  } else if (rand < 0.9) {
    return TerrainModifier.Mountain;
  } else if (rand < 0.95) {
    return TerrainModifier.Desert;
  } else {
    return TerrainModifier.Marsh;
  }
};

const generateActiveCorps = (
  country: CountryState,
  corpsName: string,
  corps: Corps,
): ActiveCorps => {
  return {
    composition: {
      artillery: Array.from({ length: corps.size.artillery }, (_v, k) => ({
        morale: 3,
        name: `${country.name} ${corpsName} artillery regiment ${k}`,
        type: "artillery",
      })),
      cavalry: Array.from({ length: corps.size.cavalry }, (_v, k) => ({
        morale: 3,
        name: `${country.name} ${corpsName} cavalry regiment ${k}`,
        type: "cavalry",
      })),
      guard: Array.from({ length: corps.size.guard }, (_v, k) => ({
        morale: 5,
        name: `${country.name} ${corpsName} guard regiment ${k}`,
        type: "guard",
      })),
      infantry: Array.from({ length: corps.size.infantry }, (_v, k) => ({
        morale: 3,
        name: `${country.name} ${corpsName} infantry regiment ${k}`,
        type: "infantry",
      })),
    },
    size: corps.size,
    status: CorpsStatus.Active,
  };
};

export const prepareBattle = (): CombatState => {
  const gameStartState = getInitialState();

  const countries = [...gameStartState.countries.keys()];
  const attackerIndex = Math.floor(Math.random() * countries.length);
  let defenderIndex = Math.floor(Math.random() * countries.length);
  while (attackerIndex === defenderIndex) {
    defenderIndex = Math.floor(Math.random() * countries.length);
  }

  const attackerCountry = countries[attackerIndex];
  const defenderCountry = countries[defenderIndex];
  const attackerCountryData = gameStartState.countries.get(attackerCountry)!;
  const defenderCountryData = gameStartState.countries.get(defenderCountry)!;
  console.clear();
  console.log("Attacker:", attackerCountry);
  console.log("Defender:", defenderCountry);

  //   const attackerCorpsRandomizedCount = Math.min(
  //     Math.ceil(Math.random() * 4),
  //     attackerCountryData.army.corps.size,
  //   );
  //   const defenderCorpsRandomizedCount = Math.min(
  //     Math.ceil(Math.random() * 4),
  //     defenderCountryData.army.corps.size,
  //   );
  const attackerCorpsRandomizedCount = attackerCountryData.army.corps.size;
  const defenderCorpsRandomizedCount = defenderCountryData.army.corps.size;
  const corpsIsNonEmpty = (corpsMap: Map<string, Corps>) =>
    (corpsName: string) => {
      const corps = corpsMap.get(corpsName)!;
      return Boolean(
        corps.size.artillery || corps.size.cavalry || corps.size.guard ||
          corps.size.infantry,
      );
    };
  const attackerCorpsNames = [...attackerCountryData.army.corps.keys()].filter(
    corpsIsNonEmpty(attackerCountryData.army.corps),
  );
  const defenderCorpsNames = [...defenderCountryData.army.corps.keys()].filter(
    corpsIsNonEmpty(defenderCountryData.army.corps),
  );

  while (
    attackerCorpsNames.length &&
    attackerCorpsRandomizedCount < attackerCorpsNames.length
  ) {
    attackerCorpsNames.splice(
      Math.round(Math.random() * attackerCorpsNames.length),
      1,
    );
  }

  while (
    defenderCorpsNames.length &&
    defenderCorpsRandomizedCount < defenderCorpsNames.length
  ) {
    defenderCorpsNames.splice(
      Math.round(Math.random() * defenderCorpsNames.length),
      1,
    );
  }

  const attackerCorps = new Map(
    attackerCorpsNames.map(
      (name) => [
        name,
        generateActiveCorps(
          attackerCountryData,
          name,
          attackerCountryData.army.corps.get(name)!,
        ),
      ],
    ),
  );
  const defenderCorps = new Map(
    defenderCorpsNames.map(
      (name) => [
        name,
        generateActiveCorps(
          defenderCountryData,
          name,
          defenderCountryData.army.corps.get(name)!,
        ),
      ],
    ),
  );

  const terrain = chooseCombatTerrain();
  const attackerChit = chooseAttackerChit(attackerCorps.size);
  const defenderChit = chooseDefenderChit(defenderCorps.size);
  const attackingOverRiver = Math.random() > 0.8;
  const operationalPossibilityEntry = getOperationalPossibilityEntry(
    attackerChit,
    defenderChit,
    attackingOverRiver,
    terrain,
  );

  const attackerOriginalComposition: Record<FactorType, number> = {
    artillery: 0,
    cavalry: 0,
    guard: 0,
    infantry: 0,
  };
  let attackerMoraleTotal = 0;
  for (const corpsData of attackerCorps.values()) {
    attackerOriginalComposition.artillery +=
      corpsData.composition.artillery.length;
    attackerOriginalComposition.cavalry += corpsData.composition.cavalry.length;
    attackerOriginalComposition.guard += corpsData.composition.guard.length;
    attackerOriginalComposition.infantry +=
      corpsData.composition.infantry.length;
    // Morale
    attackerMoraleTotal +=
      corpsData.composition.artillery.reduce((acc, factor) =>
        acc + factor.morale, 0) +
      corpsData.composition.cavalry.reduce((acc, factor) =>
        acc + factor.morale, 0) +
      corpsData.composition.guard.reduce((acc, factor) =>
        acc + factor.morale, 0) +
      corpsData.composition.infantry.reduce((acc, factor) =>
        acc + factor.morale, 0);
  }
  const attackerTotalFactors = attackerOriginalComposition.artillery +
    attackerOriginalComposition.cavalry + attackerOriginalComposition.guard +
    attackerOriginalComposition.infantry;
  const attackerOriginalMorale = attackerMoraleTotal / attackerTotalFactors;

  const defenderOriginalComposition: Record<FactorType, number> = {
    artillery: 0,
    cavalry: 0,
    guard: 0,
    infantry: 0,
  };
  let defenderMoraleTotal = 0;
  for (const corpsData of defenderCorps.values()) {
    defenderOriginalComposition.artillery +=
      corpsData.composition.artillery.length;
    defenderOriginalComposition.cavalry += corpsData.composition.cavalry.length;
    defenderOriginalComposition.guard += corpsData.composition.guard.length;
    defenderOriginalComposition.infantry +=
      corpsData.composition.infantry.length;
    // Morale
    defenderMoraleTotal +=
      corpsData.composition.artillery.reduce((acc, factor) =>
        acc + factor.morale, 0) +
      corpsData.composition.cavalry.reduce((acc, factor) =>
        acc + factor.morale, 0) +
      corpsData.composition.guard.reduce((acc, factor) =>
        acc + factor.morale, 0) +
      corpsData.composition.infantry.reduce((acc, factor) =>
        acc + factor.morale, 0);
  }
  const defenderTotalFactors = defenderOriginalComposition.artillery +
    defenderOriginalComposition.cavalry + defenderOriginalComposition.guard +
    defenderOriginalComposition.infantry;
  const defenderOriginalMorale = defenderMoraleTotal / defenderTotalFactors;

  return {
    attackerChit,
    attackerCorps,
    attackerCountryData,
    attackerMorale: attackerOriginalMorale,
    attackerOriginalComposition,
    attackerOriginalMorale,
    attackingOverRiver,
    defenderChit,
    defenderCorps,
    defenderCountryData,
    defenderMorale: defenderOriginalMorale,
    defenderOriginalComposition,
    defenderOriginalMorale,
    operationalPossibilityEntry,
    outflanked: false,
    terrain,
  };
};

const calculateCorpsFactors = (corps: ActiveCorps) =>
  corps.composition.artillery.length + corps.composition.cavalry.length +
  corps.composition.guard.length + corps.composition.infantry.length;

const calculateFactors = (
  corpsMap: Map<string, ActiveCorps>,
  morale = Infinity,
) => {
  let factors = 0;
  for (const corps of corpsMap.values()) {
    factors += corps.composition.artillery.length +
      corps.composition.cavalry.length +
      corps.composition.guard.length +
      (morale >= 2 ? corps.composition.infantry.length : // TODO: Handle militia properly
        corps.composition.infantry.filter((inf) => inf.morale > 2).length);
  }
  return factors;
};

const calculateDamage = (
  corps: Map<string, ActiveCorps>,
  damage: number,
  mustTakeCavalryDamage: boolean,
): Map<string, ActiveCorps> => {
  if (damage === 0) {
    return corps;
  }
  // Recreate to avoid mutation
  corps = new Map(corps);
  let noInfantry = false;
  mainLoop:
  while (damage > 0) {
    if (corps.size === 0) {
      // Annihilated
      return corps;
    }
    for (const [corpsName, corpsData] of corps) {
      if (damage === 0) {
        return corps;
      }
      if (mustTakeCavalryDamage) {
        if (corpsData.composition.cavalry.length === 0) {
          // Keep searching for cavalry corps
          continue;
        } else {
          const corpsFactors = calculateCorpsFactors(corpsData);
          if (corpsFactors === 1) {
            corps.delete(corpsName);
          } else {
            corps.set(corpsName, {
              ...corpsData,
              composition: {
                ...corpsData.composition,
                cavalry: corpsData.composition.cavalry.slice(1),
              },
            });
          }
          damage--;
          // Start taking infantry damage
          mustTakeCavalryDamage = false;
          continue mainLoop;
        }
      } else if (
        noInfantry === false && corpsData.composition.infantry.length
      ) {
        const corpsFactors = calculateCorpsFactors(corpsData);
        if (
          corpsFactors === corpsData.composition.infantry.length &&
          damage >= corpsFactors
        ) {
          // Delete corps
          corps.delete(corpsName);
          damage -= corpsFactors;
          continue;
        }
        const damagePart = Math.min(
          damage,
          corpsData.composition.infantry.length,
        );
        corps.set(corpsName, {
          ...corpsData,
          composition: {
            ...corpsData.composition,
            infantry: corpsData.composition.infantry.slice(damagePart),
          },
        });
        damage -= damagePart;
      } else if (noInfantry) {
        // Just kill anything we have
        const corpsFactors = calculateCorpsFactors(corpsData);
        if (corpsFactors <= damage) {
          corps.delete(corpsName);
          damage -= corpsFactors;
          continue;
        }
        const mutatedCorpsData: Corps = {
          ...corpsData,
          composition: {
            ...corpsData.composition,
          },
        };
        corps.set(corpsName, mutatedCorpsData);
        const artilleryFactors = corpsData.composition.artillery.length;
        const cavalryFactors = corpsData.composition.cavalry.length;
        const guardFactors = corpsData.composition.guard.length;
        if (artilleryFactors) {
          const damagePart = Math.min(damage, artilleryFactors);
          mutatedCorpsData.composition.artillery.slice(damagePart);
          damage -= damagePart;
        }
        if (damage && cavalryFactors) {
          const damagePart = Math.min(damage, cavalryFactors);
          mutatedCorpsData.composition.cavalry.slice(damagePart);
          damage -= damagePart;
        }
        if (damage && guardFactors) {
          const damagePart = Math.min(damage, guardFactors);
          mutatedCorpsData.composition.guard.slice(damagePart);
          damage -= damagePart;
        }
      }
    }
    if (mustTakeCavalryDamage) {
      // No cavalry to lose
      mustTakeCavalryDamage = false;
    } else if (noInfantry === false) {
      noInfantry = true;
    }
  }
  return corps;
};

export const runRound = (
  state: CombatState,
  round: 0 | 1 | 2,
): null | CombatState => {
  console.log(`\n=== ROUND ${round + 1} ===\n`);

  if (round === 0 && state.defenderChit === "Withdraw") {
    const withdrawRoll = rollD6(
      state.attackerChit === "Outflank" || state.attackerChit === "Echelon"
        ? 1
        : 0,
    );
    if (withdrawRoll > 3) {
      return null;
    }
  }
  if (
    round > 0 &&
    !state.outflanked &&
    (Number(state.attackerChit === "Outflank") +
        Number(state.defenderChit === "Outflank")) === 1
  ) {
    const outflankRoll = rollD6();
    if (outflankRoll > 4) {
      console.log(
        `${
          state.attackerChit === "Outflank" ? "Attacker" : "Defender"
        } succeeds in outflanking.`,
      );
      state = {
        ...state,
        outflanked: true,
      };
    } else {
      console.log(
        `${
          state.attackerChit === "Outflank" ? "Attacker" : "Defender"
        } fails in outflanking.`,
      );
    }
  }
  const attackerRoll = Math.min(Math.max(0, rollD6()), 7);
  console.log("Attacker rolls", attackerRoll);
  const attackerEntry = getAttackerCombatResolutionEntry(
    state.operationalPossibilityEntry,
    round,
    state.outflanked,
  );
  const attackerFactors = calculateFactors(
    state.attackerCorps,
    state.attackerMorale,
  );
  const attackerCasualtyDamage = Math.round(
    attackerEntry.casualty[attackerRoll] * attackerFactors,
  );
  const attackerMoraleDamage = attackerEntry.morale[attackerRoll];
  console.log("Attacker %LS:", attackerEntry.casualty[attackerRoll] * 100, "%");
  console.log("Attacker MRLS:", -1 * attackerEntry.morale[attackerRoll]);
  console.log(
    "Attacker deals",
    attackerCasualtyDamage,
    "factors of damage and",
    attackerMoraleDamage,
    "morale damage.\n",
  );

  const defenderRoll = Math.min(Math.max(0, rollD6()), 7);
  console.log("Defender rolls", defenderRoll);
  const defenderEntry = getDefenderCombatResolutionEntry(
    state.operationalPossibilityEntry,
    round,
    state.outflanked,
  );
  const defenderFactors = calculateFactors(
    state.defenderCorps,
    state.defenderMorale,
  );
  const defenderCasualtyDamage = Math.round(
    defenderEntry.casualty[defenderRoll] * defenderFactors,
  );
  const defenderMoraleDamage = defenderEntry.morale[defenderRoll];
  console.log("Defender %LS:", defenderEntry.casualty[defenderRoll] * 100, "%");
  console.log("Defender MRLS:", -1 * defenderEntry.morale[defenderRoll]);
  console.log(
    "Defender deals",
    defenderCasualtyDamage,
    "factors of damage and",
    defenderMoraleDamage,
    "morale damage.",
  );

  const attackerMorale = Math.max(
    0,
    state.attackerMorale - defenderMoraleDamage,
  );
  const defenderMorale = Math.max(
    0,
    state.defenderMorale - attackerMoraleDamage,
  );
  const attackerCorps = calculateDamage(
    state.attackerCorps,
    defenderCasualtyDamage,
    attackerMorale === 0,
  );
  const defenderCorps = calculateDamage(
    state.defenderCorps,
    attackerCasualtyDamage,
    defenderMorale === 0,
  );

  // Return new state
  return {
    ...state,
    attackerMorale,
    attackerCorps,
    defenderMorale,
    defenderCorps,
  };
};

const calculatePursuitDamage = (
  corps: Map<string, ActiveCorps>,
  damage: number,
): Map<string, ActiveCorps> => {
  if (damage === 0) {
    return corps;
  }

  const armyFactors = getArmyFactors(corps);

  // TODO: Handle militia
  const weightedTotalFactors = armyFactors.cavalry +
    (armyFactors.guard + armyFactors.artillery + armyFactors.infantry) / 3;

  if (weightedTotalFactors < damage) {
    // Annihilated
    return new Map();
  }

  // Recreate to avoid mutation
  corps = new Map(corps);
  let targetType: undefined | FactorType;
  while (damage > 0) {
    if (armyFactors.cavalry) {
      targetType = "cavalry";
    } else if (armyFactors.infantry) {
      if (targetType === "cavalry" || targetType === undefined) {
        damage *= 3;
      }
      targetType = "infantry";
    } else if (armyFactors.artillery) {
      if (targetType === "cavalry" || targetType === undefined) {
        damage *= 3;
      }
      targetType = "artillery";
    } else {
      if (targetType === "cavalry" || targetType === undefined) {
        damage *= 3;
      }
      targetType = "guard";
    }
    if (corps.size === 0) {
      // Annihilated
      return corps;
    }
    for (const [corpsName, corpsData] of corps) {
      if (damage === 0) {
        return corps;
      }
      const corpsFactors = calculateCorpsFactors(corpsData);
      if (corpsFactors === 0) {
        // Annihilated
        corps.delete(corpsName);
        continue;
      }
      const factors = corpsData.composition[targetType].length;
      if (factors === 0) {
        // Keep searching for targetType
        continue;
      }
      if (corpsFactors === factors && factors <= damage) {
        corps.delete(corpsName);
        damage -= factors;
        continue;
      }
      corps.set(corpsName, {
        ...corpsData,
        composition: {
          ...corpsData.composition,
          [targetType]: factors <= damage
            ? []
            : corpsData.composition[targetType].slice(damage),
        },
      });
      damage -= Math.min(factors, damage);
    }
  }
  return corps;
};

const PURSUIT_TABLE = [[
  0,
  0,
  0,
  0,
  0.1,
  0.15,
  0.15,
], [
  0,
  0,
  0,
  0.1,
  0.15,
  0.3,
  0.45,
], [
  0,
  0.1,
  0.15,
  0.2,
  0.3,
  0.45,
  0.6,
], [
  0.1,
  0.1,
  0.15,
  0.3,
  0.45,
  0.6,
  0.75,
], [
  0.1,
  0.15,
  0.3,
  0.45,
  0.6,
  0.75,
  0.9,
], [
  0.15,
  0.15,
  0.3,
  0.45,
  0.6,
  0.9,
  1.2,
]] as const;
const PURSUIT_CLASS_TABLE = [[6, 5, 4, 3, 2], [5, 4, 3, 2, 0], [
  4,
  3,
  2,
  0,
  0,
]] as const;

const runPursuit = (state: CombatState, round: 0 | 1 | 2): CombatState => {
  const victorMorale = state.attackerMorale || state.defenderMorale;
  const victorCavalryFactors = [
    ...(victorMorale === state.attackerMorale
      ? state.attackerCorps
      : state.defenderCorps).values(),
  ].reduce((acc, corps) => acc + corps.composition.cavalry.length, 0);
  if (!victorCavalryFactors) {
    console.log("No cavalry to pursue");
    return state;
  }
  const victorOriginalMorale = victorMorale === state.attackerMorale
    ? state.attackerOriginalMorale
    : state.defenderOriginalMorale;
  const victorMoraleDamageIndex = Math.min(
    4,
    Math.floor(victorOriginalMorale - victorMorale),
  ) as 0 | 1 | 2 | 3 | 4;
  const pursuitClassNumber =
    PURSUIT_CLASS_TABLE[round][victorMoraleDamageIndex];
  if (pursuitClassNumber === 0) {
    // NONE
    console.log("No pursuit");
    return state;
  }
  const pursuitClassIndex = Math.max(
    0,
    pursuitClassNumber - 1 -
      (2 * Number(state.terrain === TerrainModifier.Marsh) ||
        Number(state.terrain !== TerrainModifier.None)),
  );
  console.log("Pursuit class", pursuitClassIndex + 1);
  const pursuitTableRow = PURSUIT_TABLE[pursuitClassIndex];

  const pursuitRoll = rollD6(/* Number(hasCavalryLeader) */);
  const pursuitCasualty = pursuitTableRow[pursuitRoll - 1];
  if (pursuitCasualty === 0) {
    console.log("No pursuit");
    return state;
  }
  console.log(
    "Pursuit roll",
    pursuitRoll,
    "leads to damage casualty rate of",
    Math.round(pursuitCasualty * 100),
    "%",
  );
  const damage = Math.round(pursuitCasualty * victorCavalryFactors);
  if (damage === 0) {
    console.log("Pursuit causes no casualties");
    return state;
  }
  console.log("Pursuit causes", damage, "casualties");
  let loserCorps = victorMorale === state.attackerMorale
    ? state.defenderCorps
    : state.attackerCorps;
  loserCorps = calculatePursuitDamage(loserCorps, damage);
  if (victorMorale === state.attackerMorale) {
    return {
      ...state,
      defenderCorps: loserCorps,
    };
  } else {
    return {
      ...state,
      attackerCorps: loserCorps,
    };
  }
};

const reportCombatResult = (
  startState: CombatState,
  endState: CombatState,
  _round: 0 | 1 | 2,
) => {
  console.log("\n=== COMBAT RESULT ===");
  const attackerCasualties = calculateFactors(startState.attackerCorps) -
    calculateFactors(endState.attackerCorps);
  const defenderCasualties = calculateFactors(startState.defenderCorps) -
    calculateFactors(endState.defenderCorps);
  console.log(
    " * Attacker lost",
    attackerCasualties,
    "with",
    calculateFactors(endState.attackerCorps),
    "remaining",
  );
  console.log(
    " * Defender lost",
    defenderCasualties,
    "with",
    calculateFactors(endState.defenderCorps),
    "remaining",
  );
};

const getArmyFactors = (corps: Map<string, ActiveCorps>) => {
  let artillery = 0;
  let cavalry = 0;
  let guard = 0;
  let infantry = 0;

  for (const corpsData of corps.values()) {
    artillery += corpsData.composition.artillery.length;
    cavalry += corpsData.composition.cavalry.length;
    guard += corpsData.composition.guard.length;
    infantry += corpsData.composition.infantry.length;
  }
  return {
    artillery,
    cavalry,
    guard,
    infantry,
  };
};

const getArmyFactorsData = (
  corps: Map<string, ActiveCorps>,
): (string | number)[] => {
  let artillery = 0;
  let cavalry = 0;
  let guard = 0;
  let infantry = 0;

  for (const corpsData of corps.values()) {
    artillery += corpsData.composition.artillery.length;
    cavalry += corpsData.composition.cavalry.length;
    guard += corpsData.composition.guard.length;
    infantry += corpsData.composition.infantry.length;
  }

  const logParts: (string | number)[] = [];
  if (artillery) {
    logParts.push("\n *", artillery, "Artillery");
  }
  if (guard) {
    logParts.push("\n *", guard, "Guards");
  }
  if (cavalry) {
    logParts.push("\n *", cavalry, "Cavalry");
  }
  if (infantry) {
    logParts.push("\n *", infantry, "Infantry");
  }
  logParts.push(
    "\n   TOTAL:",
    artillery + cavalry + guard + infantry,
    "factors",
  );

  return logParts;
};

export const runBattle = () => {
  const startState = prepareBattle();
  let state: null | CombatState = startState;
  if (
    state.attackerChit === "Probe" &&
    state.defenderChit === "Withdraw"
  ) {
    console.log("Defender withdraws from attacker's probe.");
    return;
  }

  console.log("===== BATTLE STARTED =====");
  if (state.terrain) {
    const terrainName =
      ["None", "Forest", "Mountain", "Desert", "Marsh"][state.terrain];
    console.log("Fighting in", terrainName);
  }
  console.log(
    "Attacker brings",
    state.attackerCorps.size,
    "corps containing:",
    ...getArmyFactorsData(state.attackerCorps),
  );
  console.log(
    "Defender brings",
    state.defenderCorps.size,
    "corps containing:",
    ...getArmyFactorsData(state.defenderCorps),
  );
  console.log("\n");
  console.log("Attacker chooses", state.attackerChit);
  console.log("Defender chooses", state.defenderChit);

  for (const round of ([0, 1, 2] as const)) {
    state = runRound(state, round);
    if (state === null) {
      console.log("Defender withdraws from battle.");
      return;
    } else {
      const attackerFactors = calculateFactors(state.attackerCorps);
      const defenderFactors = calculateFactors(state.defenderCorps);
      if (attackerFactors === 0 && defenderFactors === 0) {
        console.log(
          `Battle ends in a draw on round ${
            round + 1
          } after both sides are destroyed.`,
        );
        reportCombatResult(startState, state, round);
      } else if (state.attackerMorale === 0 && state.defenderMorale === 0) {
        console.log(
          `Battle ends in a draw on round ${round + 1} after both sides break.`,
        );
        reportCombatResult(startState, state, round);
      } else if (attackerFactors === 0) {
        console.log(
          `Battle ends with defender's victory on round ${
            round + 1
          } after attacker is destroyed.`,
        );
        reportCombatResult(startState, state, round);
      } else if (defenderFactors === 0) {
        console.log(
          `Battle ends with attacker's victory on round ${
            round + 1
          } after defender is destroyed.`,
        );
        reportCombatResult(startState, state, round);
      } else if (state.attackerMorale === 0) {
        console.log(
          `Battle ends with defender's victory on round ${
            round + 1
          } after attacker breaks.`,
        );
        state = runPursuit(state, round);
        reportCombatResult(startState, state, round);
      } else if (state.defenderMorale === 0) {
        console.log(
          `Battle ends with attacker's victory on round ${
            round + 1
          } after defender breaks.`,
        );
        state = runPursuit(state, round);
        reportCombatResult(startState, state, round);
      } else {
        console.log(
          `Battle continues to round ${
            round + 2
          } with attacker controlling (${attackerFactors}, ${
            state.attackerMorale.toFixed(1)
          }) and defender controlling (${defenderFactors}, ${
            state.defenderMorale.toFixed(1)
          })`,
        );
        continue;
      }
      return;
    }
  }
};

runBattle();
