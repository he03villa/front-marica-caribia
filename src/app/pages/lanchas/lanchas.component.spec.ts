import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LanchasComponent } from './lanchas.component';

describe('LanchasComponent', () => {
  let component: LanchasComponent;
  let fixture: ComponentFixture<LanchasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LanchasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LanchasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
