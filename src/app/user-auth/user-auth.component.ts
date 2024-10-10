import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.scss']
})
export class UserAuthComponent {
  currentRoute = ''
  mainTitle = ''
  subTitle = '';
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
}}
