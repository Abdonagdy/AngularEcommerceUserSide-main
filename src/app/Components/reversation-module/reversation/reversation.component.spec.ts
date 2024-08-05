import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReversationComponent } from './reversation.component';


describe('ReversationComponent', () => {
  let component: ReversationComponent;
  let fixture: ComponentFixture<ReversationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReversationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReversationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
