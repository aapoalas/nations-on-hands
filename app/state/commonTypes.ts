import { CommonState } from "./common/reducers.ts";

export enum Month {
  January = 0,
  February = 1,
  March = 2,
  April = 3,
  May = 4,
  June = 5,
  July = 6,
  August = 7,
  September = 8,
  October = 9,
  November = 10,
  December = 11
};

export enum EconomicMonth {
  March = 2,
  June = 5,
  September = 8,
  Deceomber = 11,
}

export interface GameDate {
  year: number;
  month: Month;
}

export interface EconomicGameDate {
  year: number;
  month: EconomicMonth;
}

export enum TurnPhase {
  Setup = -1,
  Political = 0,
  Reinforcement = 1,
  Naval = 2,
  Land = 3,
  Economic = 4,
}

export enum SetupStep {
  NavalSetup = 0,
  LandSetup = 1,
}

export enum PoliticalStep {
  DiplomacyStep = 0,
  DeclarationsOfWarStep = 1,
  CallToAlliesStep = 2,
  PeaceStep = 3,
  CreatingAlliancesStep = 4,
  MinorCountryControlStep = 5,
  BreakingAlliancesStep = 6,
  FreeStateDeclarationStep = 7,
  DeclarationOfCombinedMovementStep = 8,
};

export enum ReinforcementStep {
  NavalReinforcementStep = 0,
  LandReinforcementStep = 1,
};

export enum NavalStep {
  NavalMovementStep = 0,
  NavalCombatStep = 1,
};

export enum LandStep {
  DepotCreationRemovalStep = 0,
  LandMovementStep = 1,
  SupplyStep = 2,
  LandCombatSte = 3,
  GuerillaStep = 4,
  ConquestStep = 5,
};

export enum EconomicStep {
  VictoryPointsStep = 0,
  MoneyAndManpowerCollectionStep = 1,
  LendingMoneyStep = 2,
  ManipulationStep = 3,
  MoneyAndManpowerExpenditure = 4,
  PoliticalStatusAdjustmentStep = 5,
  CivilDisorderStep = 6,
  CedingStep = 7,
  NewPoliticalCombinationsStep = 8,
  LevyStep = 9,
  UMPControlStep = 10,
};

export type PhaseStep = PoliticalStep | ReinforcementStep | NavalStep | LandStep | EconomicStep;

export type PlayerCountryID = "fr" | "aus" | "pr" | "ru" | "swe" | "gb" | "spa" | "tur";

export interface SetupSteps extends GameDate {
  phase: TurnPhase.Setup;
  step: SetupStep;
  player: PlayerCountryID;
}

interface JointPoliticalSteps extends GameDate {
  phase: TurnPhase.Political;
  step: Exclude<PoliticalStep, PoliticalStep.MinorCountryControlStep>;
  player: null;
}

interface IndividualPoliticalSteps extends GameDate {
  phase: TurnPhase.Political;
  step: PoliticalStep.MinorCountryControlStep;
  player: PlayerCountryID;
}

export type PoliticalSteps = IndividualPoliticalSteps | JointPoliticalSteps;

export interface ReinforcementSteps extends GameDate {
  phase: TurnPhase.Reinforcement;
  step: ReinforcementStep;
  player: PlayerCountryID;
}

export interface NavalSteps extends GameDate {
  phase: TurnPhase.Naval;
  step: NavalStep;
  player: PlayerCountryID;
}

interface IndividualLandSteps extends GameDate {
  phase: TurnPhase.Land;
  step: Exclude<LandStep, LandStep.ConquestStep>;
  player: PlayerCountryID;
}

interface JointLandSteps extends GameDate {
  phase: TurnPhase.Land;
  step: LandStep.ConquestStep;
  player: null;
}

export type LandSteps = IndividualLandSteps | JointLandSteps;

export interface EconomicSteps extends GameDate {
  phase: TurnPhase.Economic;
  step: EconomicStep;
  player: null;
}

export type IndividualSteps = SetupSteps | IndividualPoliticalSteps | ReinforcementSteps | NavalSteps | IndividualLandSteps;
export type JointSteps = JointPoliticalSteps | JointLandSteps | EconomicSteps;

/**
 * Joint steps of a phase. All players play
 * the step at the same time.
 */
export interface JointStepData {
  id: number;
  name: string;
  type: "joint";
  order: null;
}

/**
 * Parallel steps of a phase. All players play the
 * step in order defined by the step itself.
 */
export interface ParallelStepData {
  id: number;
  name: string;
  type: "parallel";
  order: PlayerCountryID[];
}

/**
 * Sequential steps of a phase. Phase determines the order
 * of play, during which all steps are player in sequence by
 * players in order.
 */
export interface SequentialStepData {
  id: number;
  name: string;
  type: "sequential";
  order: null;
}

/**
 * Joint phase of a turn. Steps of the phase
 * are either joint or parallel. In the latter
 * case the step then determines the order of
 * play.
 */
export interface JointPhaseData {
  id: number;
  name: string;
  type: "joint";
  filter?: Partial<CommonState>[];
  order: null;
  steps: (JointStepData | ParallelStepData)[]
}

/**
 * Sequential phase of a turn. The phase
 * determines the order of play.
 */
export interface SequentialPhaseData {
  id: number;
  name: string;
  type: "sequential";
  filter?: Partial<CommonState>[];
  order: PlayerCountryID[];
  steps: (JointStepData | SequentialStepData)[];
}

export type PhaseData = JointPhaseData | SequentialPhaseData;

export interface CommonConfiguration {
  phaseData: PhaseData[];
}