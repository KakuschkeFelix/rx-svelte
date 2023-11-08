/* eslint-disable @typescript-eslint/no-explicit-any */

import type { Action, ActionMap, Selector, Store } from "$lib/Types/index.js";
import { derived, writable } from "svelte/store";

/**
 * Creates a store with an initial value and an action map.
 * @param {S} initialValue - The initial value of the store.
 * @param {ActionMap} actionMap - The action map of the store.
 * @property {A} actionNames - A union of all action names.
 * @property {S} state - The state of the store.
 * @property {P} payload - The payload of the action as a record.
 * @returns {Store} The created store.
 * @example
 * const store = createStore(0, actionMap);
 */
export function createStore<A extends string, S, P extends Record<A, any>>(
      initialValue: S,
      actionMap: ActionMap<A, S, P>,
): Store<A, S, P> {
      const { update, subscribe } = writable(initialValue);
      let state: S = initialValue;

      subscribe((currentState) => {
            state = currentState;
      });

      async function dispatch(action: Action<A, P[keyof P]>) {
            const handler = actionMap.get(action.type);
            if (handler) {
                  const newState = await handler(state, action.payload);
                  update(() => newState);
            } else {
                  throw new Error(`Action type "${action.type}" is not defined in the action map.`);
            }
      }

      return {
            subscribe,
            dispatch,
      };
}

/**
 * Creates a selector from a store and a selector function.
 * @param {Store} store - The store to create the selector from.
 * @param {Selector} selector - The selector function.
 * @property {A} actionNames - A union of all action names.
 * @property {S} state - The state of the store.
 * @property {R} result - The selected value.
 * @returns {Readable} The created selector.
 * @example
 * const store = createStore(0, actionMap);
 * const countSelector = createSelector(store, state => state.count);
 */
export function createSelector<A extends string, S, R>(store: Store<A, S, Record<A, any>>, selector: Selector<S, R>) {
      return derived(store, selector);
}
