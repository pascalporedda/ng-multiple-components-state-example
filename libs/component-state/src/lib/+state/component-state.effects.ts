import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as ComponentStateFeature from './component-state.reducer';
import * as ComponentStateActions from './component-state.actions';

@Injectable()
export class ComponentStateEffects {
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ComponentStateActions.init),
      fetch({
        run: (action) => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return ComponentStateActions.loadComponentStateSuccess({
            componentState: [],
          });
        },

        onError: (action, error) => {
          console.error('Error', error);
          return ComponentStateActions.loadComponentStateFailure({ error });
        },
      })
    )
  );

  constructor(private actions$: Actions) {}
}
