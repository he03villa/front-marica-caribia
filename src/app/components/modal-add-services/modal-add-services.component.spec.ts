import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAddServicesComponent } from './modal-add-services.component';

describe('ModalAddServicesComponent', () => {
  let component: ModalAddServicesComponent;
  let fixture: ComponentFixture<ModalAddServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalAddServicesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalAddServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
