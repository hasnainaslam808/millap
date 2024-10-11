import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MissingPersonDetailComponent } from './missing-person-detail.component';

describe('MissingPersonDetailComponent', () => {
  let component: MissingPersonDetailComponent;
  let fixture: ComponentFixture<MissingPersonDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MissingPersonDetailComponent]
    });
    fixture = TestBed.createComponent(MissingPersonDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
