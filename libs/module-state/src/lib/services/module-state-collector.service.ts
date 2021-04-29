import { Inject, Injectable, InjectionToken } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface ModuleStateServiceInterface<T> {
  states$$: BehaviorSubject<ModuleStateRecord<T>>;
  nextModuleName$: Observable<string>;
  moduleName: string;
  routeIdentifier: string;

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
  constructor(
    @Inject(ModuleStateInterfaceToken)
    public stateServices: ModuleStateServiceInterface<unknown>[]
  ) {}

  // getServiceByInstance(
  //   serviceInstance: ModuleStateServiceInterface<unknown>
  // ): ModuleStateServiceInterface<unknown> | undefined {
  //   return this.stateServices.find(
  //     (stateService) => stateService instanceof serviceInstance
  //   );
  // }
}
