import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainCv } from './main-cv';

describe('MainCv', () => {
  let component: MainCv;
  let fixture: ComponentFixture<MainCv>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainCv],
    }).compileComponents();

    fixture = TestBed.createComponent(MainCv);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
