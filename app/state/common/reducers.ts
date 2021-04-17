import {
  CommonConfiguration,
  EconomicSteps,
  JointPhaseData,
  LandSteps,
  NavalSteps,
  PoliticalSteps,
  ReinforcementSteps,
  SequentialPhaseData,
  SetupSteps,
} from "../commonTypes.ts";
import { AdvanceGameAction, advanceGameActionType } from "./actionTypes.ts";
import {
  getNextDate,
  getPlayerByIndex,
  getPlayOrder,
  isLastPhaseOfTurn,
  isLastPlayerOfStep,
  isLastStepOfPhase,
} from "./utils.ts";

export type CommonState =
  | SetupSteps
  | PoliticalSteps
  | ReinforcementSteps
  | NavalSteps
  | LandSteps
  | EconomicSteps;

const reduceJointPhaseCommonState = (
  state: CommonState,
  currentPhaseData: JointPhaseData,
  commonConfiguration: CommonConfiguration,
) => {
  const {
    phase: currentPhase,
    step: currentStep,
    player: currentPlayer,
  } = state;

  const isLastPlayer = isLastPlayerOfStep(state, commonConfiguration);
  const isLastStep = isLastStepOfPhase(state, commonConfiguration);
  const isLastPhase = isLastPhaseOfTurn(state, commonConfiguration);

  // Joint phase, steps are iterated in order and players take turns within the step.
  // If the player is the last of the step, then the next step will begin. If the step
  // is the last one, then the next phase will begin.
  // If the phase is the last one, then the next turn will being.
  if (!isLastPlayer) {
    // Joint phase, parallel step: next player takes over
    const currentPlayOrder = getPlayOrder(state, currentPhaseData)!; // Current play order cannot be null
    const nextPlayer = getPlayerByIndex(
      currentPlayOrder.indexOf(currentPlayer!) + 1,
      state,
      commonConfiguration,
    );
    return {
      ...state,
      player: nextPlayer,
    };
  } else if (isLastPlayer && !isLastStep) {
    // Joint phase, parallel or joint step, not last step: Next step starts
    const nextPlayer = getPlayerByIndex(
      0,
      { phase: currentPhase, step: currentStep + 1 },
      commonConfiguration,
    );
    return {
      ...state,
      step: currentStep + 1,
      player: nextPlayer,
    };
  } else if (isLastPlayer && isLastStep && !isLastPhase) {
    // Joint phase, parallel or joint step, last step: Next phase starts
    const nextPlayer = getPlayerByIndex(
      0,
      { phase: currentPhase + 1, step: 0 },
      commonConfiguration,
    );
    return {
      ...state,
      phase: currentPhase + 1,
      step: 0,
      player: nextPlayer,
    };
  } else if (isLastPlayer && isLastStep && isLastPhase) {
    // Joint phase, parallel or joint step, last step, last phase: Next turn starts
    const nextPlayer = getPlayerByIndex(
      0,
      { phase: 0, step: 0 },
      commonConfiguration,
    );
    const nextDate = getNextDate(state);
    return {
      ...nextDate,
      phase: 0,
      step: 0,
      player: nextPlayer,
    };
  }
  throw new TypeError("Maybe invalid state?");
};

const reduceSequentialPhaseCommonState = (
  state: CommonState,
  currentPhaseData: SequentialPhaseData,
  commonConfiguration: CommonConfiguration,
) => {
  const {
    phase: currentPhase,
    step: currentStep,
    player: currentPlayer,
  } = state;

  const isLastPlayer = isLastPlayerOfStep(state, commonConfiguration);
  const isLastStep = isLastStepOfPhase(state, commonConfiguration);
  const isLastPhase = isLastPhaseOfTurn(state, commonConfiguration);

  // Sequential phase: Players are iterated in order and players take turn
  // in running through the steps. If the step is the last of the phase,
  // the next player starts the phase. If the player is the last of the phase,
  // the next phase beings. If the phase is the last of the turn, the next turn
  // beings.
  if (!isLastStep) {
    // Sequential phase, not last step: Player continues onto the next step
    return {
      ...state,
      step: currentStep + 1,
    };
  } else if (isLastStep && !isLastPlayer) {
    // Sequential phase, last step, not last player: Next player starts the phase
    const currentPlayOrder = getPlayOrder(state, currentPhaseData)!; // Current play order cannot be null
    const nextPlayer = getPlayerByIndex(
      currentPlayOrder.indexOf(currentPlayer!) + 1,
      {
        phase: currentPhase,
        step: 0,
      },
      commonConfiguration,
    );
    return {
      ...state,
      step: 0,
      player: nextPlayer,
    };
  } else if (isLastStep && isLastPlayer && !isLastPhase) {
    // Sequential phase, last step, last player, not last phase: Next phase begins
    const nextPlayer = getPlayerByIndex(
      0,
      {
        phase: currentPhase + 1,
        step: 0,
      },
      commonConfiguration,
    );
    return {
      ...state,
      phase: currentPhase + 1,
      step: 0,
      player: nextPlayer,
    };
  } else if (isLastStep && isLastPlayer && isLastPhase) {
    // Sequntial phase, last step, last player, last phase: Next turn beings
    return {
      ...getNextDate(state),
      phase: 0,
      step: 0,
      player: getPlayerByIndex(0, { phase: 0, step: 0 }, commonConfiguration),
    };
  }
  throw new TypeError("Maybe invalid state?");
};

export const commonReducer = (
  state: CommonState,
  action: AdvanceGameAction,
): CommonState => {
  if (action.type === advanceGameActionType) {
    const commonConfiguration: CommonConfiguration = action.payload;
    const currentPhaseData = commonConfiguration.phaseData[state.phase];
    if (currentPhaseData === undefined) {
      throw new Error(JSON.stringify(commonConfiguration.phaseData) + " " + state.phase);
    }
    if (currentPhaseData.type === "joint") {
      return reduceJointPhaseCommonState(
        state,
        currentPhaseData,
        commonConfiguration,
      );
    } else if (currentPhaseData.type === "sequential") {
      return reduceSequentialPhaseCommonState(
        state,
        currentPhaseData,
        commonConfiguration,
      );
    }
    throw new TypeError("Invalid phase data, type must be joint or sequential");
  }
  return state;
};
