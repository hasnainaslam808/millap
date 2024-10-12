import { Component, OnInit } from '@angular/core';
import { FirebaseCollectionService } from '../../services/firebase-collection.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{

imgUrl=''
  constructor(private firebase:FirebaseCollectionService,private authS:AuthService){
  
  }


  ngOnInit():void{
   

    const id =localStorage.getItem('userId');
    this.firebase.getUserData(id).then((res:any)=>{

    console.log(res);
  
    this.imgUrl=res.imageUrl


    }).catch((err:any)=>{

    })
  }
  
  logOut() {
    this.authS.logOut()
  }
}
