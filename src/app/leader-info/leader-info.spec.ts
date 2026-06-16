import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaderInfo } from './leader-info';

describe('LeaderInfo', () => {
  let component: LeaderInfo;
  let fixture: ComponentFixture<LeaderInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeaderInfo],
    }).compileComponents();

    fixture = TestBed.createComponent(LeaderInfo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
