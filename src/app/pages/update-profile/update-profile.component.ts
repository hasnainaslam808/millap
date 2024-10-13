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
    imageUrl: ''
  };



  constructor(private firebase: FirebaseCollectionService, private authService: AuthService) { }




  ngOnInit(): void {
    var id = localStorage.getItem('userId');
    this.firebase.getUserData(id).then((res: any) => {

      this.userProfile = res
      console.log(res)

    }).catch((err: any) => {

    })
  }

  selectedFile: File | null = null;  // Store the selected file


  // Handle file selection
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }
  updateProfile(val: NgForm) {
    const userId = localStorage.getItem('userId');

    this.authService.updateProfileData(userId, this.userProfile, this.selectedFile).then((res: any) => {

    }).catch((err: any) => {

    })
  }
}
