import { Injectable } from '@angular/core';
import { getAuth } from '@angular/fire/auth';
import { Firestore, doc, setDoc,getDoc,collection, addDoc,getDocs  } from '@angular/fire/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'; 
@Injectable({
  providedIn: 'root'
})
export class FirebaseCollectionService {
  constructor( private firestore: Firestore) {
    
  }


 // Method to upload image to Firebase Storage
 async uploadImage(userId: string, file: File): Promise<string> {
  const storage = getStorage();
  const storageRef = ref(storage, `user-images/${userId}/${file.name}`);

  // Upload the file
  await uploadBytes(storageRef, file);
  
  // Get the download URL
  return await getDownloadURL(storageRef);
}

   // Method to store additional user data in Firestore
   async storeUserData(userId: string, data: any) {
    try {
      // Set the user data in the 'userdata' collection
      const userDocRef = doc(this.firestore, `userdata/${userId}`);
      await setDoc(userDocRef, data);
      console.log('User data stored in Firestore:', data);
    } catch (error) {
      console.error('Error storing user data:', error);
    }
  }


   // Method to fetch user data from Firestore
   async getUserData(userId: string): Promise<any> {
    try {
      const userDocRef = doc(this.firestore, `userdata/${userId}`);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        // console.log('User data fetched successfully:', userDoc.data());
        return userDoc.data();
      } else {
        console.error('No such document!');
        return null;
      }
    } catch (error) {
      // console.error('Error fetching user data:', error);
      return null;
    }
  }

  async uploadUserStory(data: any, file: File) {
    try {
      // Upload the image and get the URL
      const imgUrl = await this.uploadUserStoryImage(file);
      console.log('Image uploaded successfully:', imgUrl);
      
      // Add the image URL to the story data
      data.imgUrl = imgUrl;

      // Add story data to the 'missing-user-story' collection
      const docRef = await addDoc(collection(this.firestore, 'missing-user-story'), data);
      console.log('Document written with ID: ', docRef.id);
    } catch (error) {
      console.error('Error uploading image or adding story:', error);
    }
  }



  
  // Method to fetch user data from Firestore
  async fetchStoryById(docId: string): Promise<any> {
    try {
      const userDocRef = doc(this.firestore, `missing-user-story/${docId}`);
      const userDoc = await getDoc(userDocRef);


      
      if (userDoc.exists()) {
        return userDoc.data();
      } else {
        console.error('No such document!');
        return null;
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      return null;
    }
  }



  async fetchStories(): Promise<any[]> {
    try {
      // Reference to the 'missing-user-story' collection
      const storiesCollection = collection(this.firestore, 'missing-user-story');
      
      // Get all documents in the collection
      const querySnapshot = await getDocs(storiesCollection);
      
      // Map through the documents to extract the data
      const stories = querySnapshot.docs.map(doc => ({
        id: doc.id,  // Include the document ID
        ...doc.data() // Spread the document data
      }));
  
      return stories;
    } catch (error) {
      console.error('Error fetching stories:', error);
      return [];
    }
  }
  
  // async uploadUserStoryImage(file: File): Promise<string> {
  //   const storage = getStorage();
  //   const storageRef = ref(storage, `user-story-images/${file.name}`);

    

  //   // Upload the file
  //   await uploadBytes(storageRef, file);
    
  //   // Get the download URL
  //   return await getDownloadURL(storageRef);
  // }

  // async uploadUserStoryImage(file: File): Promise<string> {
  //   const storage = getStorage();
  //   const auth = getAuth();  // Ensure Firebase Auth is initialized
  //   const user = auth.currentUser;
  
  //   if (!user) {
  //     throw new Error('User is not authenticated'); // Handle unauthenticated user
  //   }
  
  //   const storageRef = ref(storage, `user-story-images/${user.uid}/${file.name}`); // Include user ID in path
  
  //   // Upload the file
  //   await uploadBytes(storageRef, file);
    
  //   // Get the download URL
  //   return await getDownloadURL(storageRef);
  // }


  async uploadUserStoryImage(file: File): Promise<string> {
    const storage = getStorage();
    const auth = getAuth();  // Ensure Firebase Auth is initialized
    const userId = localStorage.getItem('userId'); // Use stored user ID

    if (!userId) {
      throw new Error('User is not authenticated'); // Handle unauthenticated user
    }

    const storageRef = ref(storage, `user-story-images/${userId}/${file.name}`); // Include user ID in path

    // Upload the file
    await uploadBytes(storageRef, file);
    
    // Get the download URL
    return await getDownloadURL(storageRef);
  }
}
