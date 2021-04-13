import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { RouterModule, RouterStateSnapshot } from '@angular/router';
import { IndexComponent } from './views/index/index.component';
import { SearchFormComponent } from './search-form/search-form.component';
import { routerReducer, RouterState, RouterStateSerializer, StoreRouterConnectingModule } from '@ngrx/router-store';
import * as fromForms from './+state/forms.reducer';
import { ROUTER_FEATURE_KEY } from './+state/router.selectors';
import { FormsEffects } from './+state/forms.effects';
import { FormsState } from './+state/forms.reducer';
import { FormsModule } from '@angular/forms';
import { SearchFormContainerComponent } from './views/search-form-container/search-form-container.component';

export interface ParamsRouterState {
  url: string
  params: {}
  queryParams: {}
}

export class ParamsSerializer implements RouterStateSerializer<ParamsRouterState> {
  serialize(routerState: RouterStateSnapshot): ParamsRouterState {
    let route = routerState.root;
    let { params, queryParams } = routerState.root;

    while (route.firstChild) {
      route = route.firstChild;
      params = { ...params, ...route.params };
      queryParams = { ...queryParams, ...route.queryParams };
    }

    return { url: routerState.url, params, queryParams };
  }
}

export interface AppState {
  [ROUTER_FEATURE_KEY]: ParamsRouterState;
  [fromForms.FORMS_FEATURE_KEY]: FormsState;
}

@NgModule({
  declarations: [AppComponent, IndexComponent, SearchFormComponent, SearchFormContainerComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot([{
      path: '',
      component: IndexComponent
    }, {
      path: 'search-form/:id',
      component: SearchFormContainerComponent
    }, {
      path: '*',
      redirectTo: ''
    }]),
    StoreModule.forRoot(
      {
        [ROUTER_FEATURE_KEY]: routerReducer,
        [fromForms.FORMS_FEATURE_KEY]: fromForms.reducer
      },
      {
        metaReducers: !environment.production ? [] : [],
        runtimeChecks: {
          strictActionImmutability: true,
          strictStateImmutability: true
        }
      }
    ),
    EffectsModule.forRoot([FormsEffects]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    StoreRouterConnectingModule.forRoot({
      serializer: ParamsSerializer
    }),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
