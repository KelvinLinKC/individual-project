import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HungarianCodeComponent } from './hungarian-code.component';

describe('HungarianCodeComponent', () => {
  let component: HungarianCodeComponent;
  let fixture: ComponentFixture<HungarianCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HungarianCodeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HungarianCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
