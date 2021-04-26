import { Component, OnInit } from '@angular/core';
import {
  AppModuleState,
  AppModuleStateService,
} from './app-module-state.service';
import { Router } from '@angular/router';
import { ModuleStateInstanceService } from '../../../../libs/module-state/src/lib/services/module-state-instance.service';
import { ModuleInstance } from '../../../../libs/module-state/src/lib/services/abstract-module-state.service';

@Component({
  selector: 'ng-multiple-components-state-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AppModuleStateService],
})
export class AppComponent implements OnInit {
  currentInstance?: ModuleInstance<AppModuleState>;
  currentInstances$ = this.appStateService.instances$;
  currentInstances: ModuleInstance<AppModuleState>[];

  constructor(
    private appStateService: AppModuleStateService,
    private moduleStateInstanceService: ModuleStateInstanceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.moduleStateInstanceService.currentInstanceId$.subscribe((id) => {
      if (!id) {
        this.addNewModule();
      }
    });

    this.appStateService.currentInstance$.subscribe((instance) => {
      this.currentInstance = instance;
    });

    this.appStateService.instances$.subscribe((instances) => {
      this.currentInstances = instances;
    });
  }

  addNewModule() {
    const instance = this.appStateService.generateModuleInstance();

    this.router.navigate([instance]);
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

      this.router.navigate(['../', nextId]).then(() => {
        this.appStateService.removeState(id);
      });
    } else {
      this.appStateService.removeState(id);
    }
  }
}
