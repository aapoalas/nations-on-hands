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

export const chooseAttackerChit = (): AttackerOperationName => {
  const rand = Math.floor(Math.random() * 5);
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

export const chooseDefenderChit = (): DefenderOperationName => {
  const rand = Math.floor(Math.random() * 6);
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

export const prepareBattle = (): null | CombatState => {
  const attackerFactors = Math.round(Math.random() * 30) + 10;
  const defenderFactors = Math.round(Math.random() * 30) + 10;
  const terrain = chooseCombatTerrain();
  const attackerChit = chooseAttackerChit();
  const defenderChit = chooseDefenderChit();
  const attackingOverRiver = Math.random() > 0.8;
  const operationalPossibilityEntry = getOperationalPossibilityEntry(
    attackerChit,
    defenderChit,
    attackingOverRiver,
    terrain,
  );

  if (operationalPossibilityEntry === null) {
    return null;
  }

  return {
    attackerChit,
    attackerFactors,
    attackerMorale: 3,
    attackingOverRiver,
    defenderChit,
    defenderFactors,
    defenderMorale: 3,
    operationalPossibilityEntry,
    outflanked: false,
    terrain,
  };
};

export const runRound = (state: CombatState, round: 0 | 1 | 2) => {
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
  } else if (
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
  const attackerCasualtyDamage = Math.round(
    attackerEntry.casualty[attackerRoll] * state.attackerFactors,
  );
  const attackerMoraleDamage = attackerEntry.morale[attackerRoll];
  console.log("Attacker %LS:", attackerEntry.casualty[attackerRoll] * 100, "%");
  console.log("Attacker MRLS:", -1 * attackerEntry.morale[attackerRoll]);
  console.log(
    "Attacker deals",
    attackerCasualtyDamage,
    "factors of damage and",
    attackerMoraleDamage,
    "morale damage.",
  );

  const defenderRoll = Math.min(Math.max(0, rollD6()), 7);
  console.log("Defender rolls", defenderRoll);
  const defenderEntry = getDefenderCombatResolutionEntry(
    state.operationalPossibilityEntry,
    round,
    state.outflanked,
  );
  const defenderCasualtyDamage = Math.round(
    defenderEntry.casualty[defenderRoll] * state.defenderFactors,
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

  const attackerFactors = Math.max(
    0,
    state.attackerFactors - defenderCasualtyDamage,
  );
  const attackerMorale = Math.max(
    0,
    state.attackerMorale - defenderMoraleDamage,
  );
  const defenderFactors = Math.max(
    0,
    state.defenderFactors - attackerCasualtyDamage,
  );
  const defenderMorale = Math.max(
    0,
    state.defenderMorale - attackerMoraleDamage,
  );

  // Return new state
  return {
    ...state,
    attackerFactors,
    attackerMorale,
    defenderFactors,
    defenderMorale,
  };
};

const checkBattleStatus = (state: CombatState, round: 0 | 1 | 2): boolean => {
  if (state.attackerFactors === 0 && state.defenderFactors === 0) {
    console.log(
      `Battle ends in a draw on round ${
        round + 1
      } after both sides are destroyed.`,
    );
    return false;
  } else if (state.attackerMorale === 0 && state.defenderMorale === 0) {
    console.log(
      `Battle ends in a draw on round ${round + 1} after both sides break.`,
    );
    return false;
  } else if (state.attackerFactors === 0) {
    console.log(
      `Battle ends with defender's victory on round ${
        round + 1
      } after attacker is destroyed.`,
    );
    return false;
  } else if (state.defenderFactors === 0) {
    console.log(
      `Battle ends with attacker's victory on round ${
        round + 1
      } after defender is destroyed.`,
    );
    return false;
  } else if (state.attackerMorale === 0) {
    console.log(
      `Battle ends with defender's victory on round ${
        round + 1
      } after attacker breaks.`,
    );
    return false;
  } else if (state.defenderMorale === 0) {
    console.log(
      `Battle ends with attacker's victory on round ${
        round + 1
      } after defender breaks.`,
    );
    return false;
  }
  console.log(
    `Battle continues to round ${
      round + 2
    } with attacker controlling (${state.attackerFactors}, ${
      state.attackerMorale.toFixed(1)
    }) and defender controlling (${state.defenderFactors}, ${
      state.defenderMorale.toFixed(1)
    })`,
  );
  return true;
};

export const runBattle = () => {
  let state = prepareBattle();
  console.log("===== BATTLE STARTED =====");
  if (state) {
    if (state.terrain) {
      const terrainName =
        ["None", "Forest", "Mountain", "Desert", "Marsh"][state.terrain];
      console.log("Fighting in", terrainName);
    }
    console.log("Attacker brings", state.attackerFactors, "infantry");
    console.log("Defender brings", state.defenderFactors, "infantry");
  }
  console.log("Attacker chooses", state?.attackerChit ?? "Probe");
  console.log("Defender chooses", state?.defenderChit ?? "Withdraw");
  if (state === null) {
    console.log("Defender withdraws from battle.");
    return;
  }
  for (const round of ([0, 1, 2] as const)) {
    state = runRound(state, round);
    if (state === null) {
      console.log("Defender withdraws from battle.");
      return;
    } else if (!checkBattleStatus(state, round)) {
      return;
    }
  }
  console.log("Battle ends for the day.");
};

runBattle();
