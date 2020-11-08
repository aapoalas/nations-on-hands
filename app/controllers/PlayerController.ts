import BroadcastChannel from "../BroadcastChannel.ts";
import {
  BroadcastMessage,
  GameMessage,
  initializeMessageType,
  joinMessageType,
  PlayerMessage,
  stepForwardMessageType,
} from "../messages/messageTypes.ts";
import { GameState, stateReducer } from "../state/state.ts";

export class PlayerController {
  name: string;
  gameName: string;
  private players = new Set<string>();
  private channel: BroadcastChannel;
  private state: undefined | GameState = undefined;

  constructor(playerName: string, gameName: string) {
    this.name = playerName;
    this.gameName = gameName;
    this.channel = new (window as any).BroadcastChannel(this.gameName);
    this.channel.onmessage = this.handleMessage;
  }

  broadcastData(data: PlayerMessage) {
    this.channel.postMessage(data);
  }

  handleMessage({ data }: MessageEvent<GameMessage>) {
    if (data.type === joinMessageType) {
      const currentPlayersCount = this.players.size;
      this.players.add(data.sender);
      if (this.players.size > currentPlayersCount) {
      }
    } else if (data.type === initializeMessageType) {
      this.state = data.data;
    } else if (data.type === stepForwardMessageType) {
      this.runState(data.data);
    }
  }

  runState(action) {
    if (this.state === undefined) {
      throw new Error("Game state not initialized, cannot run state");
    }
    this.state = stateReducer(this.state, action);
  }
}
