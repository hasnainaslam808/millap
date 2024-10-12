import { Component } from '@angular/core';
import { FirebaseCollectionService } from 'src/app/shared/services/firebase-collection.service';

@Component({
  selector: 'app-fvrt-story',
  templateUrl: './fvrt-story.component.html',
  styleUrls: ['./fvrt-story.component.scss']
})
export class FvrtStoryComponent {
  personData: any = []

  constructor(private firebase: FirebaseCollectionService) { }

  ngOnInit(): void {
    const userId = localStorage.getItem('userId');
    this.firebase.fetchFavoriteStoriesByUser(userId).then((res: any) => {
      this.personData = res
      console.log(this.personData);

    })

  }

  addFvrt(fvrt: boolean, id: any, i: any) {
    const userId = localStorage.getItem('userId');
    if (userId) {
      if (fvrt === false) {
        this.firebase.saveFavoriteStory(userId, id).then((res: any) => {
          this.personData[i].isFavorite = true
        }).catch((err: any) => {

        })
      } else {
        this.firebase.removeFavoriteStory(userId, id).then((res: any) => {
          this.personData[i].isFavorite = false


        }).catch((err: any) => {

        })
      }
    } else {
      console.log('user-not login')
    }
  }
}
