import { Component, OnInit } from '@angular/core';
import { FirebaseCollectionService } from '../shared/services/firebase-collection.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-selected-user-story',
  templateUrl: './selected-user-story.component.html',
  styleUrls: ['./selected-user-story.component.scss']
})
export class SelectedUserStoryComponent implements OnInit {
  storyId: any = '';
  dataArry:any = []
  constructor(private collectionService: FirebaseCollectionService, private route: ActivatedRoute) {
    this.route.paramMap.subscribe(params => {
      this.storyId = params.get('id'); // Get the 'id' parameter from the URL


    });
  }
  ngOnInit(): void {
    if (this.storyId !== '')
      this.collectionService.fetchStoryById(this.storyId).then((res) => {
        // console.log(res);
      this.dataArry = res
      }).catch((err: any) => {

      })
  }
}
