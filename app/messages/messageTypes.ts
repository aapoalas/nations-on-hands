import { GameState } from "../state/state.ts";

export interface BroadcastMessage<T> {
  type: string;
  sender: string;
  data: T;
}

export interface TargetedMessage<T> extends BroadcastMessage<T> {
  target: string;
}

export type PrivateMessage = TargetedMessage<ArrayBuffer>;

export const joinMessageType = "player/join";
export interface JoinMessage extends BroadcastMessage<null> {
  type: typeof joinMessageType;
}

export const greetMessageType = "player/greet";
export interface GreetMessage extends TargetedMessage<null> {
  type: typeof greetMessageType;
}

export const leaveMessageType = "player/leave";
export interface LeaveMessage extends BroadcastMessage<null> {
  type: typeof leaveMessageType;
}

export const playerStepDataType = "player/stepData";
export interface PlayerStepData extends BroadcastMessage<void> {
  type: typeof playerStepDataType;
}

export const initializeMessageType = "game/initialize";
export interface InitializeMessage extends BroadcastMessage<GameState> {
  type: typeof initializeMessageType;
}

export const stepForwardMessageType = "game/step";
export interface StepForwardMessage extends BroadcastMessage<void> {
  type: typeof stepForwardMessageType;
}

export type PlayerMessage = JoinMessage | LeaveMessage | PlayerStepData | InitializeMessage | StepForwardMessage;
export type TargetedPlayerMessage = GreetMessage;
export type GameMessage = PlayerMessage | TargetedPlayerMessage;
