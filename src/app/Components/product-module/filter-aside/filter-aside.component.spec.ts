import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterAsideComponent } from './filter-aside.component';

describe('FilterAsideComponent', () => {
  let component: FilterAsideComponent;
  let fixture: ComponentFixture<FilterAsideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterAsideComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterAsideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
