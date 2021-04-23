import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, of } from 'rxjs';
import { map, repeatWhen, withLatestFrom } from 'rxjs/operators';
import { ModuleStateInstanceService } from './module-state-instance.service';
import {
  ModuleStateRecord,
  ModuleStateServiceInterface,
} from './module-state-collector.service';

@Injectable({
  providedIn: 'root',
})
export abstract class AbstractModuleStateService<T>
  implements ModuleStateServiceInterface<T> {
  states$$: BehaviorSubject<ModuleStateRecord<T>> = new BehaviorSubject<
    ModuleStateRecord<T>
  >({});

  moduleName: string;
  routeIdentifier: string | number = 'instanceId';
  currentInstanceIds$ = this.states$$.pipe(
    map((stateId) => Object.keys(stateId))
  );

  nextModuleId$ = of('').pipe(
    withLatestFrom(this.currentInstanceIds$),
    map(([_, ids]) => {
      return (
        this.moduleName +
        ' ' +
        String(Object.keys(ids).length + 1).padStart(2, '0')
      );
    }),
    repeatWhen(() => this.currentInstanceIds$)
  );

  currentInstance$ = combineLatest(
    this.states$$,
    this.moduleStateInstanceService.currentInstanceId$
  ).pipe(
    map(([states, latestId]) => {
      const id = latestId;
      console.log('called with id', id);
      if (!id) return null;

      if (!states[id]) {
        const blankState = this.getBlankModuleState();
        this.addState(id.toString(), blankState);
        return blankState;
      }

      return states[id];
    })
  );

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

  statesSnapshot(): ModuleStateRecord<T> {
    return {
      ...this.states$$.getValue(),
    };
  }
}
