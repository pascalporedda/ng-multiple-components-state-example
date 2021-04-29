import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabbableModuleComponent } from './tabbable-module.component';

describe('TabbableModuleComponent', () => {
  let component: TabbableModuleComponent;
  let fixture: ComponentFixture<TabbableModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabbableModuleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabbableModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
