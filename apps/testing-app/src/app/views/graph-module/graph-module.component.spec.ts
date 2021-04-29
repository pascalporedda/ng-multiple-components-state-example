import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphModuleState } from './graph-module.component';

describe('GraphModuleComponent', () => {
  let component: GraphModuleState;
  let fixture: ComponentFixture<GraphModuleState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GraphModuleState],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphModuleState);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
