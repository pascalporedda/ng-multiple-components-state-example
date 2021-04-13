import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { selectActiveIdAndForm } from '../+state/forms.selectors';
import { AppState } from '../app.module';
import { formsValueUpdated } from '../+state/forms.actions';
import { FormState } from '../+state/forms.reducer';

@Component({
  selector: 'ng-multiple-components-state-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent {

  searchForm$ = this.store.pipe(select(selectActiveIdAndForm));
  searchForm: FormState = null;
  searchFormId: string;

  inputModel = '';

  constructor(private store: Store<AppState>) {
    this.searchForm$.subscribe((activeForm) => {
      this.searchForm = activeForm.form;
      this.searchFormId = activeForm.formId;
      this.inputModel = activeForm.form?.formValue ?? ''
    });
  }

  updateState() {
    this.store.dispatch(formsValueUpdated({ formsId: this.searchFormId, formValue: this.inputModel }));
  }

}
