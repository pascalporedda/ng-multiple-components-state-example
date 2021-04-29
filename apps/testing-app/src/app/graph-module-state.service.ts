import { Injectable } from '@angular/core';
import { AbstractModuleStateService } from '../../../../libs/module-state/src/lib/services/abstract-module-state.service';
import { ModuleStateInstanceService } from '../../../../libs/module-state/src/lib/services/module-state-instance.service';

export interface GraphModuleState {
  nodes: string[];
}

@Injectable({
  providedIn: 'root',
})
export class GraphModuleStateService extends AbstractModuleStateService<GraphModuleState> {
  moduleName = 'Graph';
  routeIdentifier = 'graph';

  constructor(
    protected moduleStateInstanceService: ModuleStateInstanceService
  ) {
    super(moduleStateInstanceService);
  }

  getBlankModuleState(): GraphModuleState {
    return {
      nodes: [],
    };
  }
}
