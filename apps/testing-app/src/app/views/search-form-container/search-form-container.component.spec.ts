import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchFormContainerComponent } from './search-form-container.component';

describe('SearchFormContainerComponent', () => {
  let component: SearchFormContainerComponent;
  let fixture: ComponentFixture<SearchFormContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchFormContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchFormContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
