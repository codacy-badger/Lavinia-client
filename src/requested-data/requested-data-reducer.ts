﻿import { RequestedDataActionType, RequestedDataAction } from "./requested-data-actions";
import { RequestedDataState, unloadedState } from "./requested-data-state";

/**
 *
 * @param state - the current state, with default parameters iff it is
 * undefined.
 * @param action - the action to act upon the state.
 * @returns a new state mutated by the action passed in as parameter.
 */
export function requestedData(
    state: RequestedDataState = unloadedState,
    action: RequestedDataAction
): RequestedDataState {
    switch (action.type) {
        case RequestedDataActionType.INITIALIZE_REQUESTED_DATA:
            return {
                ...state,
                electionType: action.electionType,
                enableAutoSave: true,
            };
        default:
            return state;
    }
}