import { createReducer, on, Action } from '@ngrx/store';
import * as ComponentStateActions from './component-state.actions';

export const COMPONENT_STATE_FEATURE_KEY = 'componentState';

export interface ComponentsState {
  states: Record<string, ComponentState>;
}

export interface ComponentState {
  [key: string]: unknown;
}

const initialState: ComponentsState = {
  states: {}
};

const componentStateReducer = createReducer(
  initialState,
  on(ComponentStateActions.init, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
);

export function reducer(state: ComponentsState | undefined, action: Action) {
  return componentStateReducer(state, action);
}
