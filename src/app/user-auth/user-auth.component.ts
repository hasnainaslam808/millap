import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.scss']
})
export class UserAuthComponent {
  currentRoute = ''
  mainTitle = ''
  subTitle = '';

  email: string = '';
  password: string = '';
  constructor(private activateroute:ActivatedRoute) { 
    this.activateroute.data.subscribe((res:any)=>{
    this.currentRoute=res.currentRoute
    if(this.currentRoute === 'sign-up'){
      this.mainTitle = 'Enter your details'
      this.subTitle = 'please enter your details to create an account'
    }else if(this.currentRoute === 'log-in'){
       this.mainTitle = 'Login to your account'
      this.subTitle = 'please enter your registered name and email bellow to login your account.'
    }
    })
}

login(val: NgForm) {
  if (val.invalid) {
    Object.values(val.controls).forEach(control => {
      control.markAsTouched();
    });
    return;
  }

  

}

signup(val: NgForm) {
  if (val.invalid) {
    Object.values(val.controls).forEach(control => {
      control.markAsTouched();
    });
    return;
  }

}
}
