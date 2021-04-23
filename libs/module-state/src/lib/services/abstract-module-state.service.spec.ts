import { TestBed } from '@angular/core/testing';

import { AbstractModuleStateService } from './abstract-module-state.service';

describe('AbstractModuleStateService', () => {
  let service: AbstractModuleStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AbstractModuleStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
