import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleCodeComponent } from './simple-code.component';

describe('SimpleCodeComponent', () => {
  let component: SimpleCodeComponent;
  let fixture: ComponentFixture<SimpleCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimpleCodeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimpleCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
