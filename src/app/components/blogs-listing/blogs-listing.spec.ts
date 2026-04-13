import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogsListing } from './blogs-listing';

describe('BlogsListing', () => {
  let component: BlogsListing;
  let fixture: ComponentFixture<BlogsListing>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogsListing],
    }).compileComponents();

    fixture = TestBed.createComponent(BlogsListing);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
