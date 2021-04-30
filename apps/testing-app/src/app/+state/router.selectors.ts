// import { createFeatureSelector, createSelector } from '@ngrx/store';
// import { RouterReducerState } from '@ngrx/router-store';
// import { ParamsRouterState } from '../app.module';
//
// export const ROUTER_FEATURE_KEY = 'router';
//
// const selectRouterSlice = createFeatureSelector<RouterReducerState<ParamsRouterState>>(ROUTER_FEATURE_KEY);
//
// export const selectRouteParams = createSelector(selectRouterSlice, (state) => (state && state.state  && state.state.params) || {});
//
// export const selectRouterParam = (paramName: string) => createSelector(selectRouteParams, (params) => params[paramName]);
