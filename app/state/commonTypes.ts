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
  December = 11,
}

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
}

export enum ReinforcementStep {
  NavalReinforcementStep = 0,
  LandReinforcementStep = 1,
}

export enum NavalStep {
  NavalMovementStep = 0,
  NavalCombatStep = 1,
}

export enum LandStep {
  DepotCreationRemovalStep = 0,
  LandMovementStep = 1,
  SupplyStep = 2,
  LandCombatSte = 3,
  GuerillaStep = 4,
  ConquestStep = 5,
}

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
}

export type PhaseStep =
  | PoliticalStep
  | ReinforcementStep
  | NavalStep
  | LandStep
  | EconomicStep;

export type PlayerCountryID =
  | "fr"
  | "aus"
  | "pr"
  | "ru"
  | "swe"
  | "gb"
  | "spa"
  | "tur";

export interface SetupSteps extends GameDate {
  readonly phase: TurnPhase.Setup;
  readonly step: SetupStep;
  readonly player: PlayerCountryID;
}

interface JointPoliticalSteps extends GameDate {
  readonly phase: TurnPhase.Political;
  readonly step: Exclude<PoliticalStep, PoliticalStep.MinorCountryControlStep>;
  readonly player: null;
}

interface IndividualPoliticalSteps extends GameDate {
  readonly phase: TurnPhase.Political;
  readonly step: PoliticalStep.MinorCountryControlStep;
  readonly player: PlayerCountryID;
}

export type PoliticalSteps = IndividualPoliticalSteps | JointPoliticalSteps;

export interface ReinforcementSteps extends GameDate {
  readonly phase: TurnPhase.Reinforcement;
  readonly step: ReinforcementStep;
  readonly player: PlayerCountryID;
}

export interface NavalSteps extends GameDate {
  readonly phase: TurnPhase.Naval;
  readonly step: NavalStep;
  readonly player: PlayerCountryID;
}

interface IndividualLandSteps extends GameDate {
  readonly phase: TurnPhase.Land;
  readonly step: Exclude<LandStep, LandStep.ConquestStep>;
  readonly player: PlayerCountryID;
}

interface JointLandSteps extends GameDate {
  readonly phase: TurnPhase.Land;
  readonly step: LandStep.ConquestStep;
  readonly player: null;
}

export type LandSteps = IndividualLandSteps | JointLandSteps;

export interface EconomicSteps extends GameDate {
  readonly phase: TurnPhase.Economic;
  readonly step: EconomicStep;
  readonly player: null;
}

export type IndividualSteps =
  | SetupSteps
  | IndividualPoliticalSteps
  | ReinforcementSteps
  | NavalSteps
  | IndividualLandSteps;
export type JointSteps = JointPoliticalSteps | JointLandSteps | EconomicSteps;

/**
 * Joint steps of a phase. All players play
 * the step at the same time.
 */
export interface JointStepData {
  readonly id: number;
  readonly name: string;
  readonly type: "joint";
  readonly order: null;
}

/**
 * Parallel steps of a phase. All players play the
 * step in order defined by the step itself.
 */
export interface ParallelStepData {
  readonly id: number;
  readonly name: string;
  readonly type: "parallel";
  readonly order: readonly PlayerCountryID[];
}

/**
 * Sequential steps of a phase. Phase determines the order
 * of play, during which all steps are player in sequence by
 * players in order.
 */
export interface SequentialStepData {
  readonly id: number;
  readonly name: string;
  readonly type: "sequential";
  readonly order: null;
}

/**
 * Joint phase of a turn. Steps of the phase
 * are either joint or parallel. In the latter
 * case the step then determines the order of
 * play.
 */
export interface JointPhaseData {
  readonly id: number;
  readonly name: string;
  readonly type: "joint";
  readonly filter?: readonly Partial<CommonState>[];
  readonly order: null;
  readonly steps: readonly (JointStepData | ParallelStepData)[];
}

/**
 * Sequential phase of a turn. The phase
 * determines the order of play.
 */
export interface SequentialPhaseData {
  readonly id: number;
  readonly name: string;
  readonly type: "sequential";
  readonly filter?: readonly Partial<CommonState>[];
  readonly order: PlayerCountryID[];
  readonly steps: readonly (JointStepData | SequentialStepData)[];
}

export type PhaseData = JointPhaseData | SequentialPhaseData;

export interface CommonConfiguration {
  readonly phaseData: readonly PhaseData[];
}
