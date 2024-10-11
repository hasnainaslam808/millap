import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FvrtStoryComponent } from './fvrt-story.component';

describe('FvrtStoryComponent', () => {
  let component: FvrtStoryComponent;
  let fixture: ComponentFixture<FvrtStoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FvrtStoryComponent]
    });
    fixture = TestBed.createComponent(FvrtStoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
