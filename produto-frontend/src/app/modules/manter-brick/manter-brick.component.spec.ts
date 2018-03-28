import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManterBrickComponent } from './manter-brick.component';

describe('ManterBrickComponent', () => {
  let component: ManterBrickComponent;
  let fixture: ComponentFixture<ManterBrickComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManterBrickComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManterBrickComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
