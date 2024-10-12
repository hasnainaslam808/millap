import { Component, OnInit } from '@angular/core';
import { FirebaseCollectionService } from 'src/app/shared/services/firebase-collection.service';

@Component({
  selector: 'app-data-list',
  templateUrl: './data-list.component.html',
  styleUrls: ['./data-list.component.scss']
})
export class DataListComponent implements OnInit {

  personData: any = []

  constructor(private firebase: FirebaseCollectionService) { }

  ngOnInit(): void {

    this.firebase.fetchStories().then((res: any) => {
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
