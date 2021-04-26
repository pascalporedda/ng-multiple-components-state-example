import { Component, OnInit } from '@angular/core';
import {
  AppModuleState,
  AppModuleStateService,
} from '../../app-module-state.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'ng-multiple-components-state-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
})
export class IndexComponent implements OnInit {
  state: AppModuleState;

  constructor(private appStateService: AppModuleStateService) {}

  ngOnInit(): void {
    this.appStateService.currentInstance$
      .pipe(filter((instance) => !!instance))
      .subscribe((instance) => {
        this.state = instance.state;
      });
  }

  updateInput(inputEvent: Event) {
    const inputValue = (inputEvent.target as HTMLInputElement).value;
    console.log(inputValue);
    const newState = { ...this.state };

    newState.formValues = {
      ...newState.formValues,
      'some field': inputValue,
    };
    this.appStateService.updateCurrentInstance$$.next(newState);
  }

  addFormField(): void {
    const newState = { ...this.state };
    newState.formFields.push('some field');
    this.appStateService.updateCurrentInstance$$.next(newState);
  }
}
