import { TestBed } from '@angular/core/testing';

import { ModuleStateInstanceService } from './module-state-instance.service';

describe('ModuleStateInstanceService', () => {
  let service: ModuleStateInstanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModuleStateInstanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
