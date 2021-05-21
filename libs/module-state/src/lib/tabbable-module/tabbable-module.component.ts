import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractModuleStateService,
  ModuleInstance,
} from '../services/abstract-module-state.service';
import { ModuleStateInstanceService } from '../services/module-state-instance.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { withLatestFrom } from 'rxjs/operators';

@Component({ template: `` })
export abstract class TabbableModuleComponent<T> implements OnInit, OnDestroy {
  currentInstance?: ModuleInstance<T>;
  currentInstances?: ModuleInstance<T>[];
  stateSubscriptions: Subscription = new Subscription();

  // TODO: implement an adapter that stores the stuff right into redux
  protected constructor(
    protected moduleStateInstanceService: ModuleStateInstanceService,
    protected router: Router,
    protected stateService: AbstractModuleStateService<T>
  ) {}

  ngOnInit(): void {
    this.stateSubscriptions = this.moduleStateInstanceService.currentInstanceId$
      .pipe(
        withLatestFrom(
          this.stateService.instances$,
          this.stateService.activeModuleId$$,
          this.stateService.currentInstanceIds$
        )
      )
      .subscribe(([id, instances, activeModuleId, currentInstanceIds]) => {
        let nextId = id;

        if (!currentInstanceIds.find((cur) => cur === id)) {
          nextId = activeModuleId;
        }

        if (!id && instances.length > 0) {
          // TODO: Maybe goto the previous opened tab instead of the first one?
          this.router.navigate([this.stateService.routeIdentifier, nextId]);
        }
        if (!id && !instances.length) {
          this.addNewModule();
        }
      });

    this.stateSubscriptions.add(
      this.stateService.currentInstance$.subscribe((instance) => {
        this.currentInstance = instance;
      })
    );

    this.stateSubscriptions.add(
      this.stateService.instances$.subscribe((instances) => {
        this.currentInstances = instances;
      })
    );
  }

  ngOnDestroy(): void {
    console.log(this.stateSubscriptions);
    this.stateSubscriptions.unsubscribe();
    console.log(this.stateSubscriptions);
  }

  addNewModule() {
    const instance = this.stateService.generateModuleInstance();

    this.router.navigate([this.stateService.routeIdentifier, instance]);
  }

  closeTab(id: string) {
    if (this.currentInstances.length <= 1) {
      return;
    }

    if (this.currentInstance.id === id) {
      const ids = this.currentInstances.map((instance) => instance.id);

      const position = ids.findIndex((_) => _ === id);
      let nextId = '';
      if (position >= 1) {
        nextId = ids[position - 1];
      } else {
        nextId = ids[position + 1];
      }

      this.router
        .navigate([this.stateService.routeIdentifier, nextId])
        .then(() => {
          this.stateService.removeState(id);
        });
    } else {
      this.stateService.removeState(id);
    }
  }
}
