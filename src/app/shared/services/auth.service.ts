
import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, User, sendEmailVerification } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { GoogleAuthProvider } from '@angular/fire/auth'; // Only if you need to implement Google auth
import { NgForm } from '@angular/forms';
import { FirebaseCollectionService } from './firebase-collection.service';
// import { doc, Firestore, getDoc, updateDoc } from 'firebase/firestore';
import { Firestore, doc, setDoc, getDoc, collection, addDoc, getDocs, query, where, deleteDoc, updateDoc } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private auth: Auth, private router: Router, private collectionService: FirebaseCollectionService, private firestore: Firestore, private toaster: ToastrService) { }



  login(email: string, password: string) {
    signInWithEmailAndPassword(this.auth, email, password)
      .then((res) => {
        // localStorage.setItem('token', 'true');
        const user = res.user;

        // Store user ID in local storage
        if (user) {
          localStorage.setItem('userId', user.uid);

        }

        if (res.user?.emailVerified) {
          this.toaster.success('log Inn successfully')
          this.router.navigate(['admin']);
        } else {

          console.warn('Email not verified');
        }
      })
      .catch((err) => {
        this.toaster.error(err.message)
        // console.error('Login yers error:', err.message);
        this.router.navigate(['/log-in']);
      });
  }

  register(val: NgForm, file: File | null) {
    const email = val.value.email;
    const password = val.value.password;

    createUserWithEmailAndPassword(this.auth, email, password)
      .then((res: any) => {
        this.toaster.success(res)
        // console.log('User registered:', res);
        const userId = res.user.uid; // Get the UID of the registered user
        console.log("yes", res.user);

        // Send verification email
        sendEmailVerification(res.user)
          .then(() => {
            this.toaster.warning('Verification email sent:', res.user.email)
            console.log('Verification email sent to:', res.user.email);
          })
          .catch((err) => {
            this.toaster.error(err.message)
            console.error('Error sending verification email:', err);
          });

        // If a file (image) was selected, upload it
        if (file) {
          this.collectionService.uploadImage(userId, file)
            .then((imageUrl: string) => {
              this.toaster.success('Image uploaded successfully')
              console.log('Image uploaded successfully:', imageUrl);

              // Combine all user data
              const userData = {
                email: email,
                password: password,
                imageUrl: imageUrl, // Save the uploaded image URL
                createdAt: new Date(),
                fullname: val.value.fName,
                country: val.value.country,
                city: val.value.city,
                location: val.value.location,
              };

              // Store the user data in Firestore
              return this.collectionService.storeUserData(userId, userData);
            })
            .then(() => {
              this.toaster.success('User data stored successfully in Firestore')

              console.log('User data stored successfully in Firestore');
            })
            .catch((err) => {
              this.toaster.error(err.message)
              console.error('Error storing user data or uploading image:', err);
            });
        } else {
          // If no file was selected, just store the user data
          const userData = {
            email: email,
            password: password,
            createdAt: new Date(),
            fullname: val.value.fName,
            country: val.value.country,
            city: val.value.city,
            location: val.value.location,
            imageUrl: ''
          };

          this.collectionService.storeUserData(userId, userData)
            .then(() => {
              this.toaster.success('User data stored successfully in Firestore')
              // console.log('User data stored successfully in Firestore');
            })
            .catch((err) => {
              this.toaster.error(err.message)

              console.error('Error storing user data:', err);
            });
        }
      })
      .catch((err) => {
        this.toaster.error(err.message)
        console.error('Registration error:', err);
      });
  }


  logOut() {
    signOut(this.auth).then(() => {
      localStorage.removeItem('userId');
      this.router.navigate(['/log-in']);
      this.toaster.success('logging Out')
    })
      .catch((err) => {
        this.toaster.error(err.message)

        console.error('Logout error:', err);
      });
  }




  async updateProfileData(userId: any, newUserData: any, file: File | null) {
    try {
      // Firestore reference to the user document
      const userRef = doc(this.firestore, `userdata/${userId}`);

      // Check if a new file (image) is provided
      if (file) {
        // Get the existing user data to retrieve the current image URL
        const docSnap: any = await getDoc(userRef);
        if (docSnap.exists()) {
          const currentData = docSnap.data();
          const currentImageUrl = currentData.imageUrl;

          // Remove the existing image if needed
          if (currentImageUrl) {
            await this.collectionService.removeImage(currentImageUrl);
          }

          // Upload the new image and get the URL
          const newImageUrl = await this.collectionService.uploadImage(userId, file);
          // Update the new image URL in userData
          newUserData.imageUrl = newImageUrl;
        }
      }

      // Update the user data in Firestore
      return this.collectionService.storeUserData(userId, newUserData)
        .then(() => {
          // this.toaster.success('User data stored successfully')
          console.log('User data stored successfully');
        })
        .catch((err) => {
          this.toaster.error(err.message)
          console.error('Error storing user data:', err);
        });
      console.log('User data updated successfully in Firestore');
    } catch (error: any) {
      this.toaster.error(error.message)

      console.error('Error updating user data:', error);
    }
  }

}
