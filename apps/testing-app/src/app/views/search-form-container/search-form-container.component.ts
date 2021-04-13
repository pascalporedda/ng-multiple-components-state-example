import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { selectActiveIdAndForm } from '../../+state/forms.selectors';
import { AppState } from '../../app.module';
import { formsValueUpdated } from '../../+state/forms.actions';

@Component({
  selector: 'ng-multiple-components-state-search-form-container',
  templateUrl: './search-form-container.component.html',
  styleUrls: ['./search-form-container.component.css']
})
export class SearchFormContainerComponent {
  searchForm$ = this.store.pipe(select(selectActiveIdAndForm));
  private searchFormId: string;

  constructor(private store: Store<AppState>) {
    this.searchForm$.subscribe((activeForm) => {
      this.searchFormId = activeForm.formId;
    });
  }

  updateFormValue($event: Event) {
    const formValue = ($event.currentTarget as HTMLInputElement).value;

    this.store.dispatch(formsValueUpdated({ formValue: formValue, formsId: this.searchFormId }));
  }
}
