import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdressDetailsComponent } from './adress-details.component';

describe('AdressDetailsComponent', () => {
  let component: AdressDetailsComponent;
  let fixture: ComponentFixture<AdressDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdressDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdressDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
