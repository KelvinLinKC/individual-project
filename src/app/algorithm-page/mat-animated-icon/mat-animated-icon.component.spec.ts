import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';

import { MatAnimatedIconComponent } from './mat-animated-icon.component';

describe('MatAnimatedIconComponent', () => {
  let component: MatAnimatedIconComponent;
  let fixture: ComponentFixture<MatAnimatedIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ MatIconModule ],
      declarations: [ MatAnimatedIconComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatAnimatedIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
