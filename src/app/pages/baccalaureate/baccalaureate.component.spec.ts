import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaccalaureateComponent } from './baccalaureate.component';

describe('BaccalaureateComponent', () => {
  let component: BaccalaureateComponent;
  let fixture: ComponentFixture<BaccalaureateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaccalaureateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BaccalaureateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
