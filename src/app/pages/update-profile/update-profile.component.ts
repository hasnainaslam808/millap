import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
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

  constructor(private firebase: FirebaseCollectionService, private authService: AuthService) { }

  ngOnInit(): void {
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
      console.log('Profile updated successfully');
    }).catch((err: any) => {
      console.error(err);
    });
  }
}
