import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosRegistrosComponent } from './datos-registros.component';

describe('DatosRegistrosComponent', () => {
  let component: DatosRegistrosComponent;
  let fixture: ComponentFixture<DatosRegistrosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatosRegistrosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosRegistrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
