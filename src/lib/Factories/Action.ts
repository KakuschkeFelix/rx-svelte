/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Action, ActionMap } from "$lib/Types/index.js";

/**
 * Creates an action with a type and payload.
 * @param {A} type - The type of the action.
 * @param {P} payload - The payload of the action.
 * @property {A} actionName - The name of the action.
 * @property {P} payload - The payload of the action.
 * @returns {Action} The created action.
 * @example
 * const action = createAction('ADD', 1);
 */
export function createAction<A extends string, P extends Record<A, any>>(type: A, payload: P[A]): Action<A, P[A]> {
      if (type == null || typeof type !== "string") {
            throw new TypeError('The "type" parameter must be a non-null string.');
      }

      return { type, payload };
}

/**
 * Creates an action map from an object of actions.
 * @param {Object} actions - The actions to create the map from.
 * @property {A} actionNames - A union of all action names.
 * @property {S} state - The state of the store.
 * @property {P} payload - The payload of the action as a record.
 * @returns {ActionMap} The created action map.
 * @example
 * type Actions = 'ADD' | 'SUBTRACT';
 * type Payloads = {
 * 	ADD: number;
 * 	SUBTRACT: number;
 * }
 * type State = number;
 * const actions = {
 * 	ADD: (state, payload) => state + payload,
 * 	SUBTRACT: (state, payload) => state - payload
 * };
 * const actionMap = createActionMap<Actions, State, Payloads>(actions);
 */
export function createActionMap<A extends string, S, P extends Record<A, any>>(actions: {
      [K in keyof P]: (state: S, payload: P[K]) => S | Promise<S>;
}): ActionMap<A, S, P> {
      const actionMap = new Map<A, (state: S, payload: P[keyof P]) => S | Promise<S>>();
      Object.keys(actions).forEach((actionType) => {
            if (!(actionType in actions)) {
                  throw new Error(`Action type "${actionType}" is not a valid key of actions.`);
            }
            try {
                  actionMap.set(actionType as A, actions[actionType as keyof typeof actions]);
            } catch (error) {
                  throw new Error(`Failed to create actionMap for actionType ${actionType}`);
            }
      });
      return actionMap;
}
