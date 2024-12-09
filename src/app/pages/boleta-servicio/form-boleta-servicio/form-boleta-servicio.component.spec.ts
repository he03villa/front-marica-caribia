import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBoletaServicioComponent } from './form-boleta-servicio.component';

describe('FormBoletaServicioComponent', () => {
  let component: FormBoletaServicioComponent;
  let fixture: ComponentFixture<FormBoletaServicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormBoletaServicioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormBoletaServicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
