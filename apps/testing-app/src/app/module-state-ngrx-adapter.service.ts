import { Injectable } from '@angular/core';
import { ModuleStateCollectorService } from '../../../../libs/module-state/src/lib/services/module-state-collector.service';
import { Store } from '@ngrx/store';
import { AppState } from './app.module';
import {
  SearchModuleState,
  SearchModuleStateService,
} from './search-module-state.service';

@Injectable({
  providedIn: 'root',
})
export class ModuleStateNgrxAdapterService {
  constructor(
    private moduleStateCollector: ModuleStateCollectorService,
    private searchModuleService: SearchModuleStateService,
    private store: Store<AppState>
  ) {}

  syncStates(): void {
    console.log(this.moduleStateCollector.stateServices);
    console.log(this.searchModuleService);
    const searchInstance = this.moduleStateCollector.stateServices.find(
      (instance) => {
        return instance instanceof SearchModuleStateService;
      }
    );

    // TODO: WIP

    // // console.log(searchInstance, this.searchModuleService);
    // this.searchModuleService.states$$.subscribe((searchModuleState) => {
    //   console.log(searchModuleState);
    // });
  }
}
