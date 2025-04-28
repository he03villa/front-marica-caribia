import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAddUpdateConceptoClienteComponent } from './modal-add-update-concepto-cliente.component';

describe('ModalAddUpdateConceptoClienteComponent', () => {
  let component: ModalAddUpdateConceptoClienteComponent;
  let fixture: ComponentFixture<ModalAddUpdateConceptoClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalAddUpdateConceptoClienteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalAddUpdateConceptoClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
