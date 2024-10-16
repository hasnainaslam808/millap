import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.scss']
})
export class UserAuthComponent implements OnInit {
  currentRoute = '';
  mainTitle = '';
  subTitle = '';
  email: string = '';
  password: string = '';
  selectedFile: File | null = null;  // Store the selected file
  imagePreview: string | ArrayBuffer | null = null;  // To store the image preview
  countries: any[] = [];
  selectedCountry?: any;
  cities: any[] = [];
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

  constructor(private activateroute: ActivatedRoute, private auth: AuthService, private http: HttpClient) {
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
  ngOnInit() {
    this.loadCountries();
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


  loadCountries() {
    this.http.get<any[]>('assets/countries.json').subscribe(data => {
      this.countries = data;
    });
  }

  
  onCountryChange(event: any) {
    // Get the selected country object
    this.selectedCountry = event;

    // Update the cities based on the selected country
    if (this.selectedCountry) {
      this.cities = this.selectedCountry.cities; 
      console.log(this.cities); // Log the cities to see if they're correct
    } else {
      this.cities = []; // Reset cities if no country is selected
    }
  }
}
