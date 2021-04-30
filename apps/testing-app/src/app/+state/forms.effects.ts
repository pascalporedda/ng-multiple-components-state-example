// import { createEffect } from '@ngrx/effects';
// import { select, Store } from '@ngrx/store';
// import { filter, map } from 'rxjs/operators';
// import { selectActiveIdAndForm } from './forms.selectors';
// import { Injectable } from '@angular/core';
// import { formInit } from './forms.actions';
// import { AppState } from '../app.module';
//
// @Injectable()
// export class FormsEffects {
//   syncState$ = createEffect(() => {
//     return this.store.pipe(
//       select(selectActiveIdAndForm),
//       filter(
//         (form) =>
//           form.formId !== undefined && form.form === undefined
//       ),
//       map((form) => formInit({ formId: form.formId }))
//     );
//   });
//
//   constructor(private store: Store<AppState>) {
//   }
// }
