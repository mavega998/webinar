import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditareComponent } from './editare.component';

describe('EditareComponent', () => {
  let component: EditareComponent;
  let fixture: ComponentFixture<EditareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
