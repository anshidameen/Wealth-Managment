import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildrenEducationComponent } from './children-education.component';

describe('ChildrenEducationComponent', () => {
  let component: ChildrenEducationComponent;
  let fixture: ComponentFixture<ChildrenEducationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChildrenEducationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildrenEducationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
