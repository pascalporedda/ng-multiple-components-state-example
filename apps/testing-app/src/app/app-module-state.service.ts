import { ModuleStateRecord } from '../../../../libs/module-state/src/lib/services/module-state-collector.service';
import { Injectable } from '@angular/core';
import { AbstractModuleStateService } from '../../../../libs/module-state/src/lib/services/abstract-module-state.service';

export interface AppModuleState {
  formValues: Record<string, any>;
  formFields: any[];
}

@Injectable({
  providedIn: 'root',
})
export class AppModuleStateService extends AbstractModuleStateService<AppModuleState> {
  moduleName = 'app';
  states: ModuleStateRecord<AppModuleState> = {};

  getBlankModuleState(): AppModuleState {
    return {
      formFields: [],
      formValues: {},
    };
  }
}
