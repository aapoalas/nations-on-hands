import BroadcastChannel from "../BroadcastChannel.ts";
import {
  GameMessage,
  greetMessageType,
  initializeMessageType,
  joinMessageType,
  leaveMessageType,
  PlayerMessage,
  stepForwardMessageType,
  TargetedPlayerMessage,
} from "../messages/messageTypes.ts";
import { AdvanceStateAction, GameState, stateReducer } from "../state/state.ts";

class PlayerController {
  name: string;
  gameName: string;
  private players: Set<string>;
  private channel: BroadcastChannel;
  private state: undefined | GameState = undefined;

  constructor(playerName: string, gameName: string) {
    if (typeof playerName !== "string" || !playerName) {
      throw new TypeError(
        "Invalid type of player name, must be non-empty string",
      );
    }
    if (typeof gameName !== "string" || !gameName) {
      throw new TypeError(
        "Invalid type of game name, must be non-empty string",
      );
    }
    this.name = playerName;
    this.gameName = gameName;
    this.players = new Set();
    this.channel = new (window as any).BroadcastChannel(this.gameName);
    this.channel.onmessage = this.handleMessage.bind(this);

    this.broadcastData({ type: "player/join", data: null, sender: this.name });
  }

  async setupGame(scenarioName: string) {
    if (this.state) {
      throw new TypeError("Game state already setup");
    }
    try {
      const scenarioModule = await import(`../setups/${scenarioName}.ts`);
      const state = scenarioModule.getInitialState() as GameState;
      this.state = state;
    } catch (_err) {
      throw new Error("Failed to load scenario module");
    }
    this.broadcastData({
      type: "game/initialize",
      sender: this.name,
      data: this.state,
    });
  }

  private broadcastData(data: PlayerMessage) {
    this.channel.postMessage(data);
  }

  private sendTargetedMessage<T extends TargetedPlayerMessage>(
    target: string,
    type: T["type"],
    data: T["data"],
  ) {
    const message: TargetedPlayerMessage = {
      data,
      sender: this.name,
      target,
      type,
    };
    this.channel.postMessage(message);
  }

  qq() {
    this.broadcastData({
      data: null,
      sender: this.name,
      type: "player/leave",
    });
  }

  private handleMessage({ data }: MessageEvent<GameMessage>) {
    if ("target" in data && data.target === this.name) {
      this.handleTargetedMessage(data);
      return;
    }

    if (data.type === joinMessageType) {
      if (!this.players.has(data.sender)) {
        // Greet new players
        this.players.add(data.sender);
        this.sendTargetedMessage(data.sender, greetMessageType, null);
      }
    } else if (data.type === leaveMessageType) {
      this.players.delete(data.sender);
    } else if (data.type === initializeMessageType) {
      if (this.state !== undefined) {
        throw new Error("Game state is already initialized");
      }
      console.log("Player", this.name, "accepted game setup from", data.sender);
      this.state = data.data;
    } else if (data.type === stepForwardMessageType) {
      this.runState(data.data);
    }
  }

  private handleTargetedMessage(data: TargetedPlayerMessage) {
    if (data.type === greetMessageType) {
      this.players.add(data.sender);
    }
  }

  private runState(action: AdvanceStateAction) {
    if (this.state === undefined) {
      throw new Error("Game state not initialized, cannot run state");
    }
    this.state = stateReducer(this.state, action);
  }

  private async prepareForTurn() {
    await new Promise(res => setTimeout(res, Math.round(Math.random() * 1000)));
    
  }
}

export default PlayerController;
