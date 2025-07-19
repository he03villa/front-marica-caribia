import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LunchDeliveryComponent } from './lunch-delivery.component';

describe('LunchDeliveryComponent', () => {
  let component: LunchDeliveryComponent;
  let fixture: ComponentFixture<LunchDeliveryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LunchDeliveryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LunchDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
