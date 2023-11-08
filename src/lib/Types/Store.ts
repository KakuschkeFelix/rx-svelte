/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Readable } from "svelte/store";
import type { Action } from "./Action.js";

/**
 * Represents a selector function.
 * @typedef {Function} Selector
 * @property {S} state - The current state.
 * @property {R} result - The selected value.
 * @returns {R} The selected value.
 * @example
 * const selector = state => state.count;
 */
export type Selector<S, R> = (state: S) => R;

/**
 * Represents a store with a dispatch method.
 * @typedef {Object} Store
 * @property {A} actionNames - A union of all action names.
 * @property {S} state - The state of the store.
 * @property {P} payload - The payload of the action as a record.
 * @property {Function} dispatch - The dispatch method of the store.
 * @example
 * const store = createStore(0, actionMap);
 * store.dispatch({ type: 'ADD', payload: 1 });
 */
export type Store<A extends string, S, P extends Record<A, any>> = Readable<S> & {
      dispatch: (action: Action<A, P[keyof P]>) => Promise<void>;
};
