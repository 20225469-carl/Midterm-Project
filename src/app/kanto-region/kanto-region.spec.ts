import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KantoRegion } from './kanto-region';

describe('KantoRegion', () => {
  let component: KantoRegion;
  let fixture: ComponentFixture<KantoRegion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KantoRegion],
    }).compileComponents();

    fixture = TestBed.createComponent(KantoRegion);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
