import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatrixTableComponent } from './matrix-table.component';

describe('MatrixTableComponent', () => {
  let component: MatrixTableComponent;
  let fixture: ComponentFixture<MatrixTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatrixTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatrixTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
