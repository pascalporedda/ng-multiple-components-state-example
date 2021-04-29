import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ModuleStateInstanceService } from './module-state-instance.service';
import {
  ModuleStateRecord,
  ModuleStateServiceInterface,
} from './module-state-collector.service';
import { Injectable } from '@angular/core';

export interface ModuleInstance<T> {
  name: string;
  id: string;
  state: T;
}

@Injectable({
  providedIn: 'platform',
})
export abstract class AbstractModuleStateService<T>
  implements ModuleStateServiceInterface<T> {
  states$$: BehaviorSubject<ModuleStateRecord<T>> = new BehaviorSubject<
    ModuleStateRecord<T>
  >({});

  moduleName: string;
  abstract routeIdentifier: string;
  currentInstanceIds$ = this.states$$.pipe(
    map((stateId) => {
      return Object.keys(stateId);
    })
  );

  instances$ = this.states$$.pipe(
    map((states) => {
      const stateIds = Object.keys(states);
      const instances: ModuleInstance<T>[] = [];

      for (let i = 0; i < stateIds.length; i++) {
        instances.push({
          name: this.moduleName + ' ' + String(i + 1).padStart(2, '0'),
          id: stateIds[i],
          state: states[stateIds[i]],
        });
      }

      return instances;
    })
  );

  nextModuleName$ = this.currentInstanceIds$.pipe(
    map((ids) => {
      return this.moduleName + ' ' + String(ids.length + 1).padStart(2, '0');
    })
  );
  /// https://ncjamieson.com/avoiding-takeuntil-leaks/
  currentInstance$: Observable<ModuleInstance<T>> = combineLatest(
    this.states$$,
    this.moduleStateInstanceService.currentInstanceId$
  ).pipe(
    map(([states, latestId]) => {
      const id = latestId;
      if (!id) return null;
      const stateIds = Object.keys(states);
      this.currentInstanceId = id;
      if (!states[id]) {
        const blankState = this.getBlankModuleState();
        this.addState(id, blankState);

        return { state: blankState, name: '', id: id } as ModuleInstance<T>;
      }

      const position = stateIds.findIndex((_) => _ === id);

      return {
        name: this.moduleName + ' ' + String(position + 1).padStart(2, '0'),
        id: id,
        state: states[id],
      } as ModuleInstance<T>;
    })
  );

  private currentInstanceId: string = null;

  constructor(
    protected moduleStateInstanceService: ModuleStateInstanceService
  ) {}

  static generateInstanceId(): string {
    const stringArr = [];
    const parts = 4;
    for (let i = 0; i < parts; i++) {
      const S4 = (((1 + Math.random()) * 0x10000) | 0)
        .toString(16)
        .substring(1);
      stringArr.push(S4);
    }
    return stringArr.join('-');
  }

  abstract getBlankModuleState(): T;

  addState(stateId: string, state: T): void {
    const currentStates = this.statesSnapshot();

    if (!currentStates[stateId]) {
      currentStates[stateId] = state;
      this.states$$.next(currentStates);
    }
  }

  removeState(stateId: string): void {
    const currentStates = this.statesSnapshot();
    if (currentStates[stateId]) {
      delete currentStates[stateId];
      this.states$$.next(currentStates);
    }
  }

  updateState(stateId: string, state: T): void {
    const currentStates = this.statesSnapshot();
    if (currentStates[stateId]) {
      currentStates[stateId] = state;

      this.states$$.next(currentStates);
    }
  }

  updateCurrentInstance(state: T): void {
    this.updateState(this.currentInstanceId, state);
  }

  statesSnapshot(): ModuleStateRecord<T> {
    return {
      ...this.states$$.getValue(),
    };
  }

  generateModuleInstance(): string {
    const newId = AbstractModuleStateService.generateInstanceId();
    const blankState = this.getBlankModuleState();

    this.addState(newId, blankState);

    return newId;
  }
}
