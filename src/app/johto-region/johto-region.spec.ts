import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JohtoRegion } from './johto-region';

describe('JohtoRegion', () => {
  let component: JohtoRegion;
  let fixture: ComponentFixture<JohtoRegion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JohtoRegion],
    }).compileComponents();

    fixture = TestBed.createComponent(JohtoRegion);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
