import BroadcastChannel from "../BroadcastChannel.ts";
import {
  GameMessage,
  joinMessageType,
  playerStepDataType,
} from "../messages/messageTypes.ts";
import { GameState, stateReducer } from "../state/state.ts";

export class GameController {
  name: string = "GameController";
  players: Set<string> = new Set();
  gameName: string;
  private channel: BroadcastChannel;
  private state: undefined | GameState = undefined;
  private playerSentData: undefined | Record<string, any>;

  constructor(gameName: string) {
    this.gameName = gameName;
    this.channel = new (window as any).BroadcastChannel(this.gameName);
    this.channel.onmessage = this.handleMessage;
  }

  broadcastData(data: any) {
    this.channel.postMessage(data);
  }

  handleMessage({ data }: MessageEvent<GameMessage>) {
    if (data.type === joinMessageType) {
      this.players.add(data.sender);
    } else if (data.type === playerStepDataType) {
      this.handlePlayerStepData(data.sender, data.data);
    }
  }

  handlePlayerStepData(sender: string, data: any) {
    if (!this.playerSentData) {
      this.playerSentData = {};
    }
    this.playerSentData[sender] = data;
    for (const player of this.players) {
      if (!(player in this.playerSentData)) {
        return;
      }
    }
    this.runState();
  }

  runState() {
    if (this.state === undefined) {
      throw new Error("Game state uninitialized, cannot run state");
    }
    this.state = stateReducer(this.state, this.playerSentData);
    this.broadcastData(this.playerSentData);
    this.playerSentData = undefined;
  }
}
