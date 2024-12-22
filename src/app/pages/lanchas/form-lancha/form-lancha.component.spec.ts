import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormLanchaComponent } from './form-lancha.component';

describe('FormLanchaComponent', () => {
  let component: FormLanchaComponent;
  let fixture: ComponentFixture<FormLanchaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormLanchaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormLanchaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
