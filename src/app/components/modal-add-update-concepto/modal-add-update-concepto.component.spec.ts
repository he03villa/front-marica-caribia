import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAddUpdateConceptoComponent } from './modal-add-update-concepto.component';

describe('ModalAddUpdateConceptoComponent', () => {
  let component: ModalAddUpdateConceptoComponent;
  let fixture: ComponentFixture<ModalAddUpdateConceptoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalAddUpdateConceptoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalAddUpdateConceptoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
