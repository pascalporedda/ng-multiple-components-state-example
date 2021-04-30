import { Action, createReducer, on } from '@ngrx/store';
import * as FormsActions from './forms.actions';
import { cloneDeep } from 'lodash';
import { ModuleStateRecord } from '../../../../../libs/module-state/src/lib/services/module-state-collector.service';
import { SearchModuleState } from '../search-module-state.service';

export const MODULE_FEATURE_KEY = 'exampleModule';

export interface ModuleState {
  states: ModuleStateRecord<SearchModuleState>;
}

export const initialState: ModuleState = {
  states: {},
};

const formsReducer = createReducer(
  initialState,
  on(FormsActions.moduleStateUpdated, (state, { states }) => {
    const newState = cloneDeep(state);

    newState.states = states;

    return newState;
  })
);

export function reducer(state: ModuleState | undefined, action: Action) {
  return formsReducer(state, action);
}
