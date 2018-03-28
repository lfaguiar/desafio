import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateCabecalhoComponent } from './template-cabecalho.component';

describe('TemplateCabecalhoComponent', () => {
  let component: TemplateCabecalhoComponent;
  let fixture: ComponentFixture<TemplateCabecalhoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateCabecalhoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateCabecalhoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
