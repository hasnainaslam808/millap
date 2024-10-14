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

  constructor(private firebase: FirebaseCollectionService) {}

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

    const obj = {
      name: val.value.name,
      Relationship: val.value.Relationship,
      country: val.value.country,
      state: val.value.state,
      city: val.value.city,
      location: val.value.Location,
      story: val.value.Story,
      imgUrl: '',
      isFavorite: false
    };

    this.firebase.uploadUserStory(obj, this.selectedFile);
  }
}
