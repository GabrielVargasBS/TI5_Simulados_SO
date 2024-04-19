import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessSchedulingComponent } from './process-scheduling.component';

describe('ProcessSchedulingComponent', () => {
  let component: ProcessSchedulingComponent;
  let fixture: ComponentFixture<ProcessSchedulingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProcessSchedulingComponent]
    });
    fixture = TestBed.createComponent(ProcessSchedulingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
