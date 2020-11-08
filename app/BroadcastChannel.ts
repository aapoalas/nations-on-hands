const channelMap = new Map<string, Set<BroadcastChannel>>();

export default class BroadcastChannel extends EventTarget {
  readonly name: string;
  onmessage: ((this: BroadcastChannel, ev: MessageEvent) => any) | null = null;
  onmessageerror:
    | ((this: BroadcastChannel, ev: MessageEvent) => any)
    | null = null;

  constructor(name: string) {
    super();
    this.name = name;
    if (!channelMap.has(name)) {
      channelMap.set(name, new Set([this]));
    } else {
      channelMap.get(name)!.add(this);
    }
  }

  /**
   * Closes the BroadcastChannel object, opening it up to garbage collection.
   */
  close() {
    channelMap.get(this.name)!.delete(this);
  }
  /**
   * Sends the given message to other BroadcastChannel objects set up for this channel. Messages can be structured objects, e.g. nested objects and arrays.
   */
  postMessage<T>(message: T) {
    const listeners = channelMap.get(this.name)!;
    for (const listener of listeners) {
      if (listener === this) {
        continue;
      }
      listener.dispatchEvent(new MessageEvent<T>("message", { data: message }));
    }
  }

  dispatchEvent(event: MessageEvent): boolean {
    if (this.onmessage) {
      this.onmessage(event);
    }
    return super.dispatchEvent(event);
  }
}
