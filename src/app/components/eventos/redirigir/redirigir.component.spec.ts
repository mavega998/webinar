import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RedirigirComponent } from './redirigir.component';

describe('RedirigirComponent', () => {
  let component: RedirigirComponent;
  let fixture: ComponentFixture<RedirigirComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RedirigirComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedirigirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
