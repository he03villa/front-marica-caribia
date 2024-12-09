import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoletaServicioComponent } from './boleta-servicio.component';

describe('BoletaServicioComponent', () => {
  let component: BoletaServicioComponent;
  let fixture: ComponentFixture<BoletaServicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoletaServicioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoletaServicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
