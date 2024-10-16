import { Component, OnInit } from '@angular/core';
import { FirebaseCollectionService } from '../../services/firebase-collection.service';
import { AuthService } from '../../services/auth.service';
import { AuthGaurdService } from '../../services/auth-gaurd.service';
import { DatasharingService } from '../../services/datasharing.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  imgUrl = ''
  search=''
  constructor(private firebase: FirebaseCollectionService, private authS: AuthService, private dataService: AuthGaurdService,private dataSharing:DatasharingService) {

  }


  ngOnInit(): void {
    // Subscribe to the BehaviorSubject
    this.dataService.currentData$.subscribe((data) => {
      this.imgUrl = data;
      // Handle the updated data here
    });

    const id = localStorage.getItem('userId');
    this.firebase.getUserData(id).then((res: any) => {

      // console.log(res);

      this.imgUrl = res.imageUrl


    }).catch((err: any) => {

    })
  }
  getValue() {
    
    this.firebase.searchStoryByName(this.search).then((res: any) => {

      this.dataSharing.updatePersonData(res);


    }).catch((err: any) => {

    })
  }
  logOut() {
    this.authS.logOut()
  }
}
