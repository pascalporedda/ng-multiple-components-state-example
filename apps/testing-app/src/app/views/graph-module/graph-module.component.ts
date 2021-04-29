import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModuleStateInstanceService } from '../../../../../../libs/module-state/src/lib/services/module-state-instance.service';
import { Router } from '@angular/router';
import {
  GraphModuleState,
  GraphModuleStateService,
} from '../../graph-module-state.service';
import { TabbableModuleComponent } from '../../../../../../libs/module-state/src/lib/tabbable-module/tabbable-module.component';

@Component({
  selector: 'ng-multiple-components-state-graph-module',
  templateUrl: './graph-module.component.html',
  styleUrls: ['./graph-module.component.css'],
})
export class GraphModuleComponent
  extends TabbableModuleComponent<GraphModuleState>
  implements OnInit, OnDestroy {
  nodes: string[] = [];

  constructor(
    stateService: GraphModuleStateService,
    moduleStateInstanceService: ModuleStateInstanceService,
    router: Router
  ) {
    super(moduleStateInstanceService, router, stateService);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  save(nodes: string[]): void {
    const state: GraphModuleState = {
      nodes: nodes,
    };

    this.stateService.updateCurrentInstance(state);
  }
}
