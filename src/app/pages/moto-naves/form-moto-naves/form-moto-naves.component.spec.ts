import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormMotoNavesComponent } from './form-moto-naves.component';

describe('FormMotoNavesComponent', () => {
  let component: FormMotoNavesComponent;
  let fixture: ComponentFixture<FormMotoNavesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormMotoNavesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormMotoNavesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
