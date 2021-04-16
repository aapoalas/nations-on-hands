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
import { PlayerCountryID } from "../state/commonTypes.ts";
import { getNextPlayer } from "../state/selectors.ts";
import { AdvanceStateAction, GameState, stateReducer } from "../state/state.ts";

class PlayerController {
  name: string;
  gameName: string;
  private players: Set<string>;
  private channel: BroadcastChannel;
  private state: undefined | GameState = undefined;
  private turnData = new Map<PlayerCountryID, any>();

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
    } catch (err) {
      throw new Error("Failed to load scenario module: " + err.message);
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
      this.prepareForTurn();
    } else if (data.type === stepForwardMessageType) {
      this.tryAdvanceTurn(data.sender as PlayerCountryID, data.data);
    }
  }

  private handleTargetedMessage(data: TargetedPlayerMessage) {
    if (data.type === greetMessageType) {
      this.players.add(data.sender);
    }
  }

  private tryAdvanceTurn(player: PlayerCountryID, turnData: any) {
    if (this.state === undefined) {
      throw new Error("Game state not initialized, cannot run state");
    } else if (this.turnData.has(player)) {
      throw new Error("Invalid turn data, player has already acted");
    }
    this.turnData.set(player, turnData);
    if (this.turnData.size === this.players.size) {
      this.state = stateReducer(this.state, { type: "advanceState" , payload: Object.fromEntries(this.turnData) as any });
    }
  }

  private async prepareForTurn() {
    if (this.state === undefined) {
      throw new Error("State undefined at start of turn");
    }
    await new Promise(res => setTimeout(res, Math.round(Math.random() * 1000)));
    const nextPlayer = getNextPlayer(this.state);
    if (nextPlayer === null || nextPlayer === this.name) {
      this.broadcastData({
        data: {} as any,
        sender: this.name,
        type: "game/step",
      });
      this.tryAdvanceTurn(this.name as PlayerCountryID, {});
    }
  }
}

export default PlayerController;
