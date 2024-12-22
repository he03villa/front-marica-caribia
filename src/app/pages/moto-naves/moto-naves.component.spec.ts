import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MotoNavesComponent } from './moto-naves.component';

describe('MotoNavesComponent', () => {
  let component: MotoNavesComponent;
  let fixture: ComponentFixture<MotoNavesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MotoNavesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MotoNavesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
