import { Component, OnInit } from '@angular/core';
import { FirebaseCollectionService } from 'src/app/shared/services/firebase-collection.service';

@Component({
  selector: 'app-data-list',
  templateUrl: './data-list.component.html',
  styleUrls: ['./data-list.component.scss']
})
export class DataListComponent implements OnInit {

personData:any=[]

  constructor(private firebase: FirebaseCollectionService) { }

  ngOnInit(): void {

    this.firebase.fetchStories().then((res: any) => {
this.personData=res
console.log(this.personData);

    })
    
  }
}
