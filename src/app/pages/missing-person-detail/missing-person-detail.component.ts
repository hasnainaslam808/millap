import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-missing-person-detail',
  templateUrl: './missing-person-detail.component.html',
  styleUrls: ['./missing-person-detail.component.scss']
})
export class MissingPersonDetailComponent {


  submitForm(val: NgForm) {
    if (val.invalid) {
      Object.values(val.controls).forEach(control => {
        control.markAsTouched();
      });
      return;
    }
  
  }

}
