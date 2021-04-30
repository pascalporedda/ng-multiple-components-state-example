import { Injectable } from '@angular/core';
import { ModuleStateCollectorService } from '../../../../libs/module-state/src/lib/services/module-state-collector.service';
import { Store } from '@ngrx/store';
import { AppState } from './app.module';
import {
  SearchModuleState,
  SearchModuleStateService,
} from './search-module-state.service';
import { moduleStateUpdated } from './+state/forms.actions';

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
    this.searchModuleService.states$$.subscribe((states) => {
      this.store.dispatch(
        moduleStateUpdated({
          states,
        })
      );
    });

    // TODO: Resync from store

    // // console.log(searchInstance, this.searchModuleService);
    // this.searchModuleService.states$$.subscribe((searchModuleState) => {
    //   console.log(searchModuleState);
    // });
  }
}
