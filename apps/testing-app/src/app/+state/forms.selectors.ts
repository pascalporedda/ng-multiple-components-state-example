// import { createFeatureSelector, createSelector } from '@ngrx/store';
// import { MODULE_FEATURE_KEY, FormsState } from './forms.reducer';
// import { selectRouterParam } from './router.selectors';
//
// export const selectFormSlice = createFeatureSelector<FormsState>(
//   MODULE_FEATURE_KEY
// );
//
// export const selectActiveFormId = selectRouterParam('id');
// export const selectActiveForm = createSelector(
//   selectFormSlice,
//   selectActiveFormId,
//   (forms, formId) => forms.forms[formId]
// );
//
// export const selectActiveIdAndForm = createSelector(
//   selectActiveFormId,
//   selectActiveForm,
//   (formId, form) => ({
//     formId,
//     form,
//   })
// );
//
// export const selectFormIds = createSelector(
//   selectFormSlice,
//   (forms) => Object.keys(forms.forms) || []
// );
