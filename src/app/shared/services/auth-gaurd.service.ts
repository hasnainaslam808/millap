
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGaurdService {
  private userIdSubject = new BehaviorSubject<string | null>(this.getUserIdFromLocalStorage());
  userId$ = this.userIdSubject.asObservable();
  // Initialize the BehaviorSubject with a default value
  private dataSubject = new BehaviorSubject<any>(null); // Replace 'any' with your data type
  currentData$ = this.dataSubject.asObservable();


  // Method to update the data
  updateData(newData: any): void { // Replace 'any' with your data type
    this.dataSubject.next(newData);
  }
  constructor() {
    // Check local storage on initialization and emit the value
    this.checkUserId();
  }

  private getUserIdFromLocalStorage(): string | null {
    return localStorage.getItem('userId');
  }

  private checkUserId() {
    const userId = this.getUserIdFromLocalStorage();
    this.userIdSubject.next(userId);
  }

  public updateUserId(userId: string | null) {
    if (userId) {
      localStorage.setItem('userId', userId);
    } else {
      localStorage.removeItem('userId');
    }
    this.checkUserId(); // Emit the updated value
  }
}
