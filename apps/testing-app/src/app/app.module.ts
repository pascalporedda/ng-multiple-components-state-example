import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule, RouterStateSnapshot } from '@angular/router';
import { SearchFormComponent } from './search-form/search-form.component';
import { SearchModuleComponent } from './views/search-module/search-module.component';
import {
  routerReducer,
  RouterStateSerializer,
  StoreRouterConnectingModule,
} from '@ngrx/router-store';
import * as fromForms from './+state/forms.reducer';
import { FormsState } from './+state/forms.reducer';
import { ROUTER_FEATURE_KEY } from './+state/router.selectors';
import { ModuleStateModule } from '@ng-multiple-components-state/module-state';
import { ModuleStateInterfaceToken } from '../../../../libs/module-state/src/lib/services/module-state-collector.service';
import { SearchModuleStateService } from './search-module-state.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { GraphModuleComponent } from './views/graph-module/graph-module.component';
import { GraphModuleStateService } from './graph-module-state.service';
import { GraphComponent } from './graph/graph.component';
import { ModuleStateNgrxAdapterService } from './module-state-ngrx-adapter.service';
import { StoreModule } from '@ngrx/store';
import { environment } from '../environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { ComponentStateModule } from '@ng-multiple-components-state/component-state';
import { FormsEffects } from './+state/forms.effects';
import { FormsModule } from '@angular/forms';

export interface ParamsRouterState {
  url: string;
  params: {};
  queryParams: {};
}

export class ParamsSerializer
  implements RouterStateSerializer<ParamsRouterState> {
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
  declarations: [
    AppComponent,
    SearchFormComponent,
    SearchModuleComponent,
    GraphModuleComponent,
    GraphComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {
        path: 'graph',
        component: GraphModuleComponent,
        children: [
          {
            path: ':instanceId',
            children: [
              {
                path: '',
                component: GraphComponent,
              },
              {
                path: '*',
                redirectTo: '',
              },
            ],
          },
        ],
      },
      {
        path: 'search',
        component: SearchModuleComponent,
        children: [
          {
            path: ':instanceId',
            children: [
              {
                path: '',
                component: SearchFormComponent,
              },
              {
                path: '*',
                redirectTo: '',
              },
            ],
          },
        ],
      },
      {
        path: '',
        redirectTo: 'graph',
        pathMatch: 'full',
      },
    ]),
    StoreModule.forRoot(
      {
        [ROUTER_FEATURE_KEY]: routerReducer,
        [fromForms.FORMS_FEATURE_KEY]: fromForms.reducer,
      },
      {
        metaReducers: !environment.production ? [] : [],
        runtimeChecks: {
          strictActionImmutability: true,
          strictStateImmutability: true,
        },
      }
    ),
    EffectsModule.forRoot([FormsEffects]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    StoreRouterConnectingModule.forRoot({
      serializer: ParamsSerializer,
    }),
    FormsModule,
    ComponentStateModule.forRoot({
      moduleName: 'search',
    }),
    ModuleStateModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  providers: [
    {
      provide: ModuleStateInterfaceToken,
      useClass: SearchModuleStateService,
      multi: true,
    },
    {
      provide: ModuleStateInterfaceToken,
      useClass: GraphModuleStateService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(private storeAdapter: ModuleStateNgrxAdapterService) {
    this.storeAdapter.syncStates();
  }
}
