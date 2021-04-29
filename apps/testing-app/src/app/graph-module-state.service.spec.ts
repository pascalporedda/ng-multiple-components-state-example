import { TestBed } from '@angular/core/testing';

import { GraphModuleStateService } from './graph-module-state.service';

describe('GraphModuleStateService', () => {
  let service: GraphModuleStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GraphModuleStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
