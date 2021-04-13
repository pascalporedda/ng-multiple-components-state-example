import { Inject, Injectable, InjectionToken } from '@angular/core';
import { ReducerManager } from '@ngrx/store';
import * as fromComponentState from '../+state/component-state.reducer';
import { EffectSources } from '@ngrx/effects';

export interface ComponentStateModuleConfig {
  moduleName: string;
  effects?: never[];
}

export const ComponentStateConfigService = new InjectionToken<ComponentStateModuleConfig>('ComponentStateConfig');

@Injectable()
export class ComponentStateService {
  constructor(
    @Inject(ComponentStateConfigService) private config: ComponentStateModuleConfig,
    private reducerManager: ReducerManager,
    private effectSources: EffectSources
  ) {
  }

  initStore(): void {
    if (this.config.effects) {
      this.effectSources.addEffects(this.config.effects);
    }

    this.reducerManager.addReducer(this.config.moduleName, fromComponentState.reducer);
  }
}
