import { Component, OnInit } from '@angular/core';
import { FirebaseCollectionService } from '../../services/firebase-collection.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
imgUrl=''
  constructor(private firebase:FirebaseCollectionService){
  
  }


  ngOnInit():void{


    var id='Wk4N8EjU18anyOE601V0eBEnZuB3'
    this.firebase.getUserData(id).then((res:any)=>{

    console.log(res);
  
    this.imgUrl=res.imageUrl


    }).catch((err:any)=>{

    })
  }
}
