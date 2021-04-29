import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  SearchModuleState,
  SearchModuleStateService,
} from '../../search-module-state.service';
import { ModuleStateInstanceService } from '../../../../../../libs/module-state/src/lib/services/module-state-instance.service';
import { Router } from '@angular/router';
import { TabbableModuleComponent } from '../../../../../../libs/module-state/src/lib/tabbable-module/tabbable-module.component';

@Component({
  selector: 'ng-multiple-components-state-search-module',
  templateUrl: './search-module.component.html',
  styleUrls: ['./search-module.component.css'],
})
export class SearchModuleComponent
  extends TabbableModuleComponent<SearchModuleState>
  implements OnInit, OnDestroy {
  constructor(
    stateService: SearchModuleStateService,
    moduleStateInstanceService: ModuleStateInstanceService,
    router: Router
  ) {
    super(moduleStateInstanceService, router, stateService);
  }

  ngOnInit() {
    super.ngOnInit();
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }
}
