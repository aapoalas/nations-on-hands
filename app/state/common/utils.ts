import { CommonConfiguration, Month, PhaseData } from "../commonTypes.ts";
import { CommonState } from "./reducers.ts";

export const getNextDate = (
  state: Pick<CommonState, "year" | "month">,
): Pick<CommonState, "year" | "month"> => ({
  year: state.month === Month.December ? state.year + 1 : state.year,
  month: state.month === Month.December ? Month.January : state.month + 1,
});

export const getPlayOrder = (
  state: Pick<CommonState, "step">,
  phaseData: PhaseData,
) => {
  if (phaseData.type === "joint") {
    const currentStep = phaseData.steps[state.step];
    return currentStep.order;
  } else if (phaseData.type === "sequential") {
    return phaseData.order;
  }
  throw new Error("Invalid phase");
};

export const getPlayerByIndex = (
  playerIndex: number,
  { phase, step }: Pick<CommonState, "phase" | "step">,
  commonConfiguration: CommonConfiguration,
) => {
  const playOrder = getPlayOrder(
    { step },
    commonConfiguration.phaseData[phase],
  );
  return playOrder?.[playerIndex] ?? null;
};

export const isLastPlayerOfStep = (
  state: CommonState,
  commonConfiguration: CommonConfiguration,
) => {
  const currentPlayOrder = getPlayOrder(
    state,
    commonConfiguration.phaseData[state.phase],
  );
  if (currentPlayOrder === null) {
    if (state.player !== null) {
      throw new TypeError("Invalid common state, player should be null");
    }
    return true;
  }
  if (
    typeof state.player !== "string" || !currentPlayOrder.includes(state.player)
  ) {
    throw new TypeError(
      "Invalid common state, player is null or not one of player countries",
    );
  }
  return currentPlayOrder[currentPlayOrder.length - 1] === state.player;
};

export const isLastStepOfPhase = (
  state: CommonState,
  commonConfiguration: CommonConfiguration,
) => {
  const currentPhase = commonConfiguration.phaseData[state.phase];
  return state.step === currentPhase.steps.length - 1;
};

export const isLastPhaseOfTurn = (
  state: CommonState,
  commonConfiguration: CommonConfiguration,
) => {
  return state.phase === commonConfiguration.phaseData.length - 1;
};
