import { NodeSavedSession, Session, NodeSavedState } from "@atproto/oauth-client-node";

export class SessionStore<NodeSavedSession> {
    internalStore: Map<string, NodeSavedSession>

    constructor() {
        this.internalStore = new Map<string, NodeSavedSession>();
    }

    get(key: string): NodeSavedSession | undefined {
        return this.internalStore.get(key);
    }
    set(key: string, value:  NodeSavedSession): void {
        this.internalStore.set(key, value);
    }
    del(key: string): void {
        this.internalStore.delete(key);
    }
}

export class StateStore<NodeSavedState> {
    internalStore: Map<string, NodeSavedState>

    constructor() {
        this.internalStore = new Map<string, NodeSavedState>();
    }

    get(key: string): NodeSavedState | undefined {
        return this.internalStore.get(key);
    }
    set(key: string, value:  NodeSavedState): void {
        this.internalStore.set(key, value);
    }
    del(key: string): void {
        this.internalStore.delete(key);
    }
}