
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DatasharingService {
  // Create a BehaviorSubject to hold your data, initialized with a default value
  private personDataSubject = new BehaviorSubject<any[]>([]);
  personData$ = this.personDataSubject.asObservable();

  // Method to update the data
  updatePersonData(data: any[]) {
    this.personDataSubject.next(data);
  }
}
