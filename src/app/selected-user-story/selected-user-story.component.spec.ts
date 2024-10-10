import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedUserStoryComponent } from './selected-user-story.component';

describe('SelectedUserStoryComponent', () => {
  let component: SelectedUserStoryComponent;
  let fixture: ComponentFixture<SelectedUserStoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectedUserStoryComponent]
    });
    fixture = TestBed.createComponent(SelectedUserStoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
