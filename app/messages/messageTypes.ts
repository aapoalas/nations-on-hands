import { AdvanceStateAction, GameState } from "../state/state.ts";

export interface BroadcastMessage<T> {
  readonly type: string;
  readonly sender: string;
  readonly data: T;
}

export interface TargetedMessage<T> extends BroadcastMessage<T> {
  readonly target: string;
}

export type PrivateMessage = TargetedMessage<ArrayBuffer>;

export const joinMessageType = "player/join";
export interface JoinMessage extends BroadcastMessage<null> {
  readonly type: typeof joinMessageType;
}

export const greetMessageType = "player/greet";
export interface GreetMessage extends TargetedMessage<null> {
  readonly type: typeof greetMessageType;
}

export const leaveMessageType = "player/leave";
export interface LeaveMessage extends BroadcastMessage<null> {
  readonly type: typeof leaveMessageType;
}

export const playerStepDataType = "player/stepData";
export interface PlayerStepData extends BroadcastMessage<void> {
  readonly type: typeof playerStepDataType;
}

export const initializeMessageType = "game/initialize";
export interface InitializeMessage extends BroadcastMessage<GameState> {
  readonly type: typeof initializeMessageType;
}

export const stepForwardMessageType = "game/step";
export interface StepForwardMessage
  extends BroadcastMessage<AdvanceStateAction> {
  readonly type: typeof stepForwardMessageType;
}

export const gameStateHashMessageType = "game/hash";
export interface GameStateHashMessage extends BroadcastMessage<string> {
  readonly type: typeof gameStateHashMessageType;
}

export type PlayerMessage =
  | JoinMessage
  | LeaveMessage
  | PlayerStepData
  | InitializeMessage
  | StepForwardMessage
  | GameStateHashMessage;
export type TargetedPlayerMessage = GreetMessage;
export type GameMessage = PlayerMessage | TargetedPlayerMessage;
