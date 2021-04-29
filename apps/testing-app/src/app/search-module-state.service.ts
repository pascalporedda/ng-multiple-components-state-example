import { Injectable } from '@angular/core';
import { AbstractModuleStateService } from '../../../../libs/module-state/src/lib/services/abstract-module-state.service';

export interface SearchModuleState {
  formValues: Record<string, any>;
  formFields: any[];
}

@Injectable({
  providedIn: 'root',
})
export class SearchModuleStateService extends AbstractModuleStateService<SearchModuleState> {
  moduleName = 'Search';
  routeIdentifier = 'search';

  getBlankModuleState(): SearchModuleState {
    return {
      formFields: [],
      formValues: {},
    };
  }
}
