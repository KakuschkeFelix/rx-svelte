/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Represents an action with a type and payload.
 * @typedef {Object} Action
 * @property {A} actionName - The name of the action.
 * @property {P} payload - The payload of the action.
 * @example
 * const action = { type: 'ADD', payload: 1 };
 */
export type Action<A extends string, P = any> = {
      type: A;
      payload: P;
};

/**
 * Represents a map of actions.
 * @typedef {Object} ActionMap
 * @property {A} actionNames - A union of all action names.
 * @property {S} state - The state of the store.
 * @property {P} payload - The payload of the action.
 * @example
 * const actionMap = new Map();
 * actionMap.set('ADD', (state, payload) => state + payload);
 */
export type ActionMap<A extends string, S, P extends Record<A, any>> = Map<
      A,
      (state: S, payload: P[keyof P]) => S | Promise<S>
>;
