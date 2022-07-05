import { createHash } from "https://deno.land/std@0.93.0/hash/mod.ts";
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

interface PlayerActionPromise extends Promise<AdvanceStateAction> {
  registerPlayerAction: (player: PlayerCountryID, data: unknown) => void;
}

const newPlayerActionPromise = (
  players: PlayerCountryID[],
): PlayerActionPromise => {
  const waitingList = new Set(players);
  const dataMap = new Map<PlayerCountryID, unknown>();
  let resolve: (value: AdvanceStateAction) => void;
  let reject: (err: Error) => void;
  // @ts-expect-error Not assigned registerPlayerAction
  const promise: PlayerActionPromise = new Promise<AdvanceStateAction>((res, rej) => {
    resolve = res;
    reject = rej;
  });
  promise.registerPlayerAction = (player: PlayerCountryID, data: unknown) => {
    if (!waitingList.has(player)) {
      reject(new Error("Invalid player ID"));
    } else if (dataMap.has(player)) {
      reject(new Error("Player action already registered"));
    }
    dataMap.set(player, data);
    if (dataMap.size === waitingList.size) {
      resolve(Object.fromEntries(dataMap));
    }
  };
  return promise;
};

class PlayerController {
  name: string;
  gameName: string;
  private players: Set<string>;
  private channel: BroadcastChannel;
  private state: undefined | GameState = undefined;
  private turnData = new Map<PlayerCountryID, any>();
  private stateHash = createHash("md5");
  private hash = "";
  private waitingList = new Set<string>();
  private actionsPromise?: PlayerActionPromise;

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
    this.players = new Set([playerName]);
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

  private updateGameState(state: GameState) {
    this.state = state;
    this.turnData.clear();
    this.stateHash.update(JSON.stringify(this.state));
    this.hash = this.stateHash.toString("hex");
    for (const player of this.players) {
      if (player !== this.name) {
        this.waitingList.add(player);
      }
    }
    this.broadcastData({
      sender: this.name,
      data: this.hash,
      type: "game/hash",
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
      if (this.players.size === 8) {
        this.prepareForTurn();
      }
    } else if (data.type === stepForwardMessageType) {
      this.savePlayerTurnAction(data.sender as PlayerCountryID, data.data);
    } else if (data.type === "game/hash") {
      if (String(data.data) !== String(this.hash)) {
        throw new Error(
          "Invalid state hash: " + String(data.data) + " vs " +
            String(this.stateHash.digest()),
        );
      }
      if (this.waitingList.has(data.sender)) {
        this.waitingList.delete(data.sender);
        if (this.waitingList.size === 0) {
          setTimeout(() => {
            this.prepareForTurn();
          });
        }
      }
    }
  }

  private handleTargetedMessage(data: TargetedPlayerMessage) {
    if (data.type === greetMessageType) {
      this.players.add(data.sender);
    }
  }

  private savePlayerTurnAction(player: PlayerCountryID, turnData: any) {
    if (this.state === undefined) {
      throw new Error("Game state not initialized, cannot run state");
    } else if (this.turnData.has(player)) {
      throw new Error("Invalid turn data, player has already acted");
    }
    this.turnData.set(player, turnData);
    if (this.turnData.size === this.players.size) {
      const state = stateReducer(this.state, {
        type: "advanceState",
        payload: Object.fromEntries(this.turnData) as any,
      });
      this.updateGameState(state);
    }
  }

  private prepareForTurn() {
    if (this.state === undefined) {
      throw new Error("State undefined at start of turn");
    }
    const nextPlayer = getNextPlayer(this.state);
    const ownTurnData = nextPlayer === null || nextPlayer === this.name
      ? {}
      : null;
    this.broadcastData({
      data: ownTurnData as any,
      sender: this.name,
      type: "game/step",
    });
    this.savePlayerTurnAction(this.name as PlayerCountryID, ownTurnData as any);
  }
}

export default PlayerController;
