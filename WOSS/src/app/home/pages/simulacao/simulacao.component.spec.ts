import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimulacaoComponent } from './simulacao.component';

describe('SimulacaoComponent', () => {
  let component: SimulacaoComponent;
  let fixture: ComponentFixture<SimulacaoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SimulacaoComponent]
    });
    fixture = TestBed.createComponent(SimulacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
