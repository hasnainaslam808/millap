import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterMissingPersonDetialsComponent } from './enter-missing-person-detials.component';

describe('EnterMissingPersonDetialsComponent', () => {
  let component: EnterMissingPersonDetialsComponent;
  let fixture: ComponentFixture<EnterMissingPersonDetialsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EnterMissingPersonDetialsComponent]
    });
    fixture = TestBed.createComponent(EnterMissingPersonDetialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
