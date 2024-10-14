import { Injectable } from '@angular/core';
import { getAuth } from '@angular/fire/auth';
import { Firestore, doc, setDoc, getDoc, collection, addDoc, getDocs, query, where, deleteDoc } from '@angular/fire/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class FirebaseCollectionService {
  constructor(private firestore: Firestore, private toaster: ToastrService) {

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
      this.toaster.success('User data stored in Firestore')
      console.log('User data stored in Firestore:', data);
    } catch (error) {
      this.toaster.error('Error storing user data')
      console.error('Error storing user data:', error);
    }
  }
  async removeImage(imageUrl: string): Promise<void> {
    try {
      const storage = getStorage();

      // Extract the path from the imageUrl (after /o/ and before ?)
      const storagePath = decodeURIComponent(imageUrl.split('/o/')[1].split('?')[0]);

      // Create a reference to the file to delete
      const storageRef = ref(storage, storagePath);

      // Delete the file
      await deleteObject(storageRef);
      console.log('Image removed successfully:', imageUrl);
    } catch (error) {
      console.error('Error removing image:', error);
    }
  }



  // Method to fetch user data from Firestore
  async getUserData(userId: any): Promise<any> {
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
      this.toaster.success('detail uploaded successfully')
      // console.log('Document written with ID: ', docRef.id);
    } catch (error: any) {
      this.toaster.error(error.message)
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



  // async fetchStories(): Promise<any[]> {
  //   try {
  //     // Reference to the 'missing-user-story' collection
  //     const storiesCollection = collection(this.firestore, 'missing-user-story');

  //     // Get all documents in the collection
  //     const querySnapshot = await getDocs(storiesCollection);

  //     // Map through the documents to extract the data
  //     const stories = querySnapshot.docs.map(doc => ({
  //       id: doc.id,  // Include the document ID
  //       ...doc.data() // Spread the document data
  //     }));

  //     return stories;
  //   } catch (error) {
  //     console.error('Error fetching stories:', error);
  //     return [];
  //   }
  // }

  async fetchStories(): Promise<any[]> {
    try {

      // Get the userId from local storage
      const userId = localStorage.getItem('userId');

      // Fetch all stories from the 'missing-user-story' collection
      const storiesCollection = collection(this.firestore, 'missing-user-story');
      const querySnapshot = await getDocs(storiesCollection);

      // Extract the stories
      let stories = querySnapshot.docs.map(doc => ({
        id: doc.id,  // Include the document ID
        ...doc.data() // Spread the document data
      }));
      console.log(stories, 'storey')
      // If userId exists in local storage, fetch their favorite stories
      if (userId) {
        const favoriteStoryRef = collection(this.firestore, 'favorite-story');
        const favoriteQuery = query(favoriteStoryRef, where('userId', '==', userId));
        const favoriteSnapshot = await getDocs(favoriteQuery);

        // Get the storyIds of the user's favorite stories
        const favoriteStoryIds = favoriteSnapshot.docs.map((doc: any) => doc.data().storyId);
        console.log(favoriteStoryIds, 'fvrtids')
        // Mark the favorite stories in the fetched stories
        stories = stories.map(story => {

          if (favoriteStoryIds.includes(story.id)) {

            return { ...story, isFavorite: true };  // Mark as favorite
          }
          return { ...story, isFavorite: false };  // Not favorite
        });
      } else {
        // If no userId, mark all stories as not favorite
        stories = stories.map(story => ({ ...story, isFavorite: false }));
      }

      return stories;
    } catch (error) {
      console.error('Error fetching stories:', error);
      return [];
    }
  }


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


  async saveFavoriteStory(userId: string, storyId: string) {
    try {
      // Reference to the 'favorite-story' collection
      const favoriteStoryRef = collection(this.firestore, 'favorite-story');

      // Create the favorite story object with userId and storyId
      const favoriteStoryData = {
        userId: userId,    // ID of the user who favorited the story
        storyId: storyId,
        isFavorite: true, // ID of the story being favorited
        createdAt: new Date() // Optional: store the timestamp when it was favorited
      };

      // Add the favorite story to Firestore
      const docRef = await addDoc(favoriteStoryRef, favoriteStoryData);

      console.log('Favorite story saved with ID:', docRef.id);
      this.toaster.success("added to favourite")
    } catch (error) {
      console.error('Error saving favorite story:', error);
    }
  }




  async fetchFavoriteStoriesByUser(userId: any): Promise<any[]> {
    try {
      // Step 1: Fetch all stories
      const allStories = await this.fetchStories();

      // Step 2: Reference to the 'favorite-story' collection
      const favoriteStoryRef = collection(this.firestore, 'favorite-story');

      // Step 3: Query to match documents where userId is equal to the provided userId
      const q = query(favoriteStoryRef, where('userId', '==', userId));

      // Step 4: Execute the query and get the matching documents
      const querySnapshot = await getDocs(q);

      // Step 5: Map through the documents and extract the storyId and other data
      const favoriteStories = querySnapshot.docs.map(doc => ({
        id: doc.id,        // Include the document ID if needed
        ...doc.data()      // Spread the document data (which includes userId, storyId, etc.)
      }));

      // Step 6: Filter all stories to get only those that are in favoriteStories
      const matchedStories = allStories.filter((story: any) =>
        favoriteStories.some((favStory: any) => favStory.storyId === story.id) // Match storyId
      );

      console.log('Matched favorite stories:', matchedStories); // Final output
      return matchedStories;  // Return the matched favorite stories as an array
    } catch (error) {
      console.error('Error fetching favorite stories:', error);
      return [];  // Return an empty array in case of an error
    }
  }








  async removeFavoriteStory(userId: string, storyId: string): Promise<void> {
    try {
      // Reference to the 'favorite-story' collection
      const favoriteStoryRef = collection(this.firestore, 'favorite-story');

      // Create a query to find the document where both userId and storyId match
      const favoriteQuery = query(favoriteStoryRef, where('userId', '==', userId), where('storyId', '==', storyId));

      // Execute the query and get matching documents
      const querySnapshot = await getDocs(favoriteQuery);

      // Loop through the results and delete each matching document
      querySnapshot.forEach(async (docSnapshot) => {
        const docRef = doc(this.firestore, `favorite-story/${docSnapshot.id}`);
        await deleteDoc(docRef);
        console.log(`Favorite story with ID ${storyId} removed for user ${userId}`);
        this.toaster.success('Removed from favourite')
      });

    } catch (error:any) {
      this.toaster.error(error.message)
      console.error('Error removing favorite story:', error);
    }
  }

}
