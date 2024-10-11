import { TestBed } from '@angular/core/testing';

import { FirebaseCollectionService } from './firebase-collection.service';

describe('FirebaseCollectionService', () => {
  let service: FirebaseCollectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirebaseCollectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
