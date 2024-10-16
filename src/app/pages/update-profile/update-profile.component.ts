import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthGaurdService } from 'src/app/shared/services/auth-gaurd.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FirebaseCollectionService } from 'src/app/shared/services/firebase-collection.service';


@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss']
})
export class UpdateProfileComponent implements OnInit {
  userProfile = {
    city: '',
    country: '',
    email: '',
    fullname: '',
    location: '',
    imageUrl: ''  // This will display an already saved profile image
  };

  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = '';  // Used to preview the uploaded image
  countries: any[] = [];
  selectedCountry?: any;
  cities: any[] = [];
  constructor(private firebase: FirebaseCollectionService, private authService: AuthService,private dataService:AuthGaurdService,private http: HttpClient) { }

  ngOnInit(): void {
    this.loadCountries();
    const id = localStorage.getItem('userId');
    this.firebase.getUserData(id).then((res: any) => {
      this.userProfile = res;
    }).catch((err: any) => {
      console.error(err);
    });
  }

  // Handle file selection and create image preview
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;  // Preview of the uploaded image
    };
    if (this.selectedFile) {
      reader.readAsDataURL(this.selectedFile);  // Read the image file for preview
    }
  }

  updateProfile(val: NgForm) {
    const userId = localStorage.getItem('userId');
    this.authService.updateProfileData(userId, this.userProfile, this.selectedFile).then((res: any) => {

      // this.dataService.updateData();
   
      
    }).catch((err: any) => {
      // console.error(err);
    });
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
