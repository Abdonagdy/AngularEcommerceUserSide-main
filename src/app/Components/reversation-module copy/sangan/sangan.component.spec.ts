import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SanganComponent } from './sangan.component';


describe('SanganComponent', () => {
  let component: SanganComponent;
  let fixture: ComponentFixture<SanganComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SanganComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SanganComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
