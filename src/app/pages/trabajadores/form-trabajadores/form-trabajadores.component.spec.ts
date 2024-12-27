import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTrabajadoresComponent } from './form-trabajadores.component';

describe('FormTrabajadoresComponent', () => {
  let component: FormTrabajadoresComponent;
  let fixture: ComponentFixture<FormTrabajadoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormTrabajadoresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormTrabajadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
