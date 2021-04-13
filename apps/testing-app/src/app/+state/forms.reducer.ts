import { Action, createReducer, on } from '@ngrx/store';
import * as FormsActions from './forms.actions';
import { cloneDeep } from 'lodash';

export const FORMS_FEATURE_KEY = 'forms';

export interface FormState {
  name?: string;
  formValue?: string;
}

export interface FormsState {
  forms: Record<string, FormState>
}

export const initialState: FormsState = {
  forms: {}
};

const formsReducer = createReducer(
  initialState,
  on(FormsActions.formsValueUpdated, (state, { formsId, formValue }) => {
    const newState = cloneDeep(state);

    newState.forms[formsId]['formValue'] = formValue;

    return newState;
  }),
  on(FormsActions.formInit, (state, { formId }) => {
    const newState = cloneDeep(state);
    newState.forms[formId] = {
      name: 'Form ' + formId,
      formValue: null
    };

    return newState;
  }),
  on(FormsActions.formClose, (state, { formId }) => {
    const newState = cloneDeep(state);
    delete newState.forms[formId];

    return newState;
  })
);

export function reducer(state: FormsState | undefined, action: Action) {
  return formsReducer(state, action);
}
