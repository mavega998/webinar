import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoeComponent } from './nuevoe.component';

describe('NuevoeComponent', () => {
  let component: NuevoeComponent;
  let fixture: ComponentFixture<NuevoeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevoeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
