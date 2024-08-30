import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalOnboardingComponent } from './goal-onboarding.component';

describe('GoalOnboardingComponent', () => {
  let component: GoalOnboardingComponent;
  let fixture: ComponentFixture<GoalOnboardingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoalOnboardingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoalOnboardingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
