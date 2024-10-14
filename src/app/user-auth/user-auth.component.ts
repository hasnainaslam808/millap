import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.scss']
})
export class UserAuthComponent {
  currentRoute = '';
  mainTitle = '';
  subTitle = '';
  email: string = '';
  password: string = '';
  selectedFile: File | null = null;  // Store the selected file
  imagePreview: string | ArrayBuffer | null = null;  // To store the image preview

  // Handle file selection and generate image preview
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;  // Store the image data as a preview
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  constructor(private activateroute: ActivatedRoute, private auth: AuthService) {
    this.activateroute.data.subscribe((res: any) => {
      this.currentRoute = res.currentRoute;
      if (this.currentRoute === 'sign-up') {
        this.mainTitle = 'Enter your details';
        this.subTitle = 'Please enter your details to create an account';
      } else if (this.currentRoute === 'log-in') {
        this.mainTitle = 'Login to your account';
        this.subTitle = 'Please enter your registered name and email below to login to your account.';
      }
    });
  }

  login(val: NgForm) {
    if (val.invalid) {
      Object.values(val.controls).forEach(control => {
        control.markAsTouched();
      });
      return;
    }
    const email = val.value.email;
    const password = val.value.password;

    this.auth.login(email, password);
  }

  signup(val: NgForm) {
    if (val.invalid) {
      Object.values(val.controls).forEach(control => {
        control.markAsTouched();
      });
      return;
    }
    this.auth.register(val, this.selectedFile);
  }
}
