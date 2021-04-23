import { Component, OnInit } from '@angular/core';
import { of, Subject } from 'rxjs';
import { map, repeatWhen, withLatestFrom } from 'rxjs/operators';
import { AppModuleStateService } from './app-module-state.service';
import { Router } from '@angular/router';
import { AbstractModuleStateService } from '../../../../libs/module-state/src/lib/services/abstract-module-state.service';
import { ModuleStateInstanceService } from '../../../../libs/module-state/src/lib/services/module-state-instance.service';

const s4 = () => {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
};

@Component({
  selector: 'ng-multiple-components-state-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AppModuleStateService],
})
export class AppComponent implements OnInit {
  generateNewInstanceId$ = new Subject();
  nextModuleId$ = this.appStateService.nextModuleId$;
  activeInstance: string;
  currentInstance$ = this.appStateService.currentInstance$;
  currentInstances = this.appStateService.currentInstanceIds$;

  constructor(
    private appStateService: AppModuleStateService,
    private moduleStateInstanceService: ModuleStateInstanceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.moduleStateInstanceService.currentInstanceId$
      .pipe(withLatestFrom(this.appStateService.nextModuleId$))
      .subscribe(([id, nextId]) => {
        if (!id) {
          this.addNewModule(nextId);
        }
      });
  }

  addNewModule(moduleId: string) {
    this.appStateService.addState(
      moduleId,
      this.appStateService.getBlankModuleState()
    );
    this.router.navigate([moduleId]);
    this.activeInstance = moduleId;
    this.generateNewInstanceId$.next();
  }
}
