import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FirebaseCollectionService } from 'src/app/shared/services/firebase-collection.service';

@Component({
  selector: 'app-missing-person-detail',
  templateUrl: './missing-person-detail.component.html',
  styleUrls: ['./missing-person-detail.component.scss']
})
export class MissingPersonDetailComponent {
  name = '';
  country = '';
  city = '';
  state = '';
  location = '';
  Relationship = '';
  story = '';
  imgUrl = '';
  imagePreview: string | ArrayBuffer | null = '';  // To store image preview
  selectedFile!: File;  // Store the selected file
  countries: any[] = [];
  selectedCountry?: any;
  cities: any[] = [];

  constructor(private firebase: FirebaseCollectionService, private http: HttpClient) {
    this.loadCountries();
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];

    // Create a FileReader to generate a preview of the image
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(this.selectedFile);
  }

  submitForm(val: NgForm) {
    if (val.invalid) {
      Object.values(val.controls).forEach(control => {
        control.markAsTouched();
      });
      return;
    }
    let userId = localStorage.getItem('userId')
    const obj = {
      name: val.value.name,
      Relationship: val.value.Relationship,
      country: val.value.country,
      state: val.value.state.name,
      city: val.value.city.name,
      location: val.value.Location,
      story: val.value.Story,
      imgUrl: '',
      isFavorite: false,
      userId: userId
    };
// console.log(obj);

    this.firebase.uploadUserStory(obj, this.selectedFile);
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
