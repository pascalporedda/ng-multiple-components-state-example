import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  SearchModuleState,
  SearchModuleStateService,
} from '../search-module-state.service';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ng-multiple-components-state-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css'],
})
export class SearchFormComponent implements OnInit, OnDestroy {
  state: SearchModuleState;
  sub: Subscription;
  constructor(private appStateService: SearchModuleStateService) {}

  ngOnInit(): void {
    this.sub = this.appStateService.currentInstance$
      .pipe(filter((instance) => !!instance))
      .subscribe((instance) => {
        this.state = instance.state;
      });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  updateInput(inputId: number, inputEvent: Event) {
    const inputValue = (inputEvent.target as HTMLInputElement).value;
    const newState = { ...this.state };

    newState.formValues = {
      ...newState.formValues,
      [inputId]: inputValue,
    };

    this.appStateService.updateCurrentInstance(newState);
  }

  addFormField(): void {
    const newState = { ...this.state };
    newState.formFields.push(newState.formFields.length);
    this.appStateService.updateCurrentInstance(newState);
  }
}
