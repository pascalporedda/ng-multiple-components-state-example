import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule, RouterStateSnapshot } from '@angular/router';
import { IndexComponent } from './views/index/index.component';
import { SearchFormComponent } from './search-form/search-form.component';
import { RouterStateSerializer } from '@ngrx/router-store';
import * as fromForms from './+state/forms.reducer';
import { FormsState } from './+state/forms.reducer';
import { ROUTER_FEATURE_KEY } from './+state/router.selectors';
import { ModuleStateModule } from '@ng-multiple-components-state/module-state';
import { ModuleStateInterfaceToken } from '../../../../libs/module-state/src/lib/services/module-state-collector.service';
import { AppModuleStateService } from './app-module-state.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

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
  declarations: [AppComponent, IndexComponent, SearchFormComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {
        path: ':instanceId',
        children: [
          {
            path: '',
            component: IndexComponent,
          },
          {
            path: '*',
            redirectTo: '',
          },
        ],
      },
    ]),
    // StoreModule.forRoot(
    //   {
    //     [ROUTER_FEATURE_KEY]: routerReducer,
    //     [fromForms.FORMS_FEATURE_KEY]: fromForms.reducer
    //   },
    //   {
    //     metaReducers: !environment.production ? [] : [],
    //     runtimeChecks: {
    //       strictActionImmutability: true,
    //       strictStateImmutability: true
    //     }
    //   }
    // ),
    // EffectsModule.forRoot([FormsEffects]),
    // !environment.production ? StoreDevtoolsModule.instrument() : [],
    // StoreRouterConnectingModule.forRoot({
    //   serializer: ParamsSerializer
    // }),
    // FormsModule,
    // ComponentStateModule.forRoot({
    //   moduleName: 'search'
    // }),
    ModuleStateModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatButtonModule,
    MatIconModule,
  ],
  providers: [
    {
      provide: ModuleStateInterfaceToken,
      useClass: AppModuleStateService,
      multi: true,
    },
    AppModuleStateService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
