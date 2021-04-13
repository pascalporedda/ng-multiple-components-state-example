import { createAction, props } from '@ngrx/store';

// TODO: create types for the strings down below
export const formsValueUpdated = createAction('[Forms] forms value updated', props<{ formsId: string; formValue: string }>());
export const formInit = createAction('[Forms] form init', props<{ formId: string }>());
export const formClose = createAction('[Forms] form close', props<{ formId: string }>());
