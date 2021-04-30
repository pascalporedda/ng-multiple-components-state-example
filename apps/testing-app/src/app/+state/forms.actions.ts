import { createAction, props } from '@ngrx/store';
import { ModuleStateRecord } from '../../../../../libs/module-state/src/lib/services/module-state-collector.service';
import { SearchModuleState } from '../search-module-state.service';

export const MODULE_STATE_UPDATED = '[SearchModule] states updated';

export const moduleStateUpdated = createAction(
  MODULE_STATE_UPDATED,
  props<{ states: ModuleStateRecord<SearchModuleState> }>()
);
