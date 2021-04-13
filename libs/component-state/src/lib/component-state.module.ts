import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {
  ComponentStateConfigService,
  ComponentStateModuleConfig,
  ComponentStateService
} from './services/component-state.service';


@NgModule({
  imports: [
    CommonModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([])
  ],
  providers: []
})
export class ComponentStateModule {
  constructor(private stateService: ComponentStateService) {
    stateService.initStore();
  }

  static forRoot(config: ComponentStateModuleConfig): ModuleWithProviders<ComponentStateModule> {
    return {
      ngModule: ComponentStateModule,
      providers: [
        ComponentStateService,
        {
          provide: ComponentStateConfigService,
          useValue: config
        }
      ]
    };
  }
}
