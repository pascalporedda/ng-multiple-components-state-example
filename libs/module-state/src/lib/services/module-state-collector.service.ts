import { Inject, Injectable, InjectionToken } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Params, Router } from '@angular/router';
import {
  delay,
  distinctUntilChanged,
  filter,
  map,
  withLatestFrom,
} from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { ModuleStateInstanceService } from './module-state-instance.service';

export interface ModuleStateServiceInterface<T> {
  states$$: BehaviorSubject<ModuleStateRecord<T>>;
  moduleName: string;
  routeIdentifier: string | number;

  addState: (stateId: string, state: T) => void;
  updateState: (stateId: string, state: T) => void;
  removeState: (stateId: string) => void;
}

export const ModuleStateInterfaceToken = new InjectionToken<
  ModuleStateServiceInterface<unknown>
>('ModuleStateInterface');

export type ModuleStateRecord<T> = Record<string, T>;

export type ModuleStatesRecord<T> = Record<
  string,
  BehaviorSubject<ModuleStateRecord<T>>
>;

@Injectable({
  providedIn: 'root',
})
export class ModuleStateCollectorService {
  states: ModuleStatesRecord<unknown> = {};

  constructor(
    @Inject(ModuleStateInterfaceToken)
    private stateServices: ModuleStateServiceInterface<unknown>[]
  ) {
    this.registerStates();
  }

  registerStates() {
    this.stateServices.forEach((stateService) => {
      this.states[stateService.moduleName] = stateService.states$$;
    });
  }

  /**
   * This contains the tabs of a module that have a unique id and their
   * corresponding state.
   * @param moduleName
   */
  // getModuleState<T>(moduleName: string): ModuleStateRecord<T> {
  //   return this.states[moduleName] as ModuleStateRecord<T>;
  // }
  //
  // setModuleState(moduleName: string, state: ModuleStateRecord<unknown>): void {
  //   this.states[moduleName] = state;
  // }
}

// Wie koennten wir vorgehen? Wir brauchen einen globalen Service der fuer unseren State verantwortlich ist,
// dem es letztlich egal ist wo er seinen State herbekommt. Ob das in nem Observable oder sonst wo liegt
// ist also egal. Wir brauchen also etwas was alles
