import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModuleStateCollectorService } from './services/module-state-collector.service';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [CommonModule]
})
export class ModuleStateModule {
  constructor(private collectorService: ModuleStateCollectorService) {
  }
}
