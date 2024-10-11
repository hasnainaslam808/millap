import { Component, OnInit } from '@angular/core';
import { FirebaseCollectionService } from 'src/app/shared/services/firebase-collection.service';


@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss']
})
export class UpdateProfileComponent implements OnInit {

city=''
country=''
email=''
name=''
location=''
imgUrl=''


  constructor(private firebase:FirebaseCollectionService){}

 


  ngOnInit( ):void{
    var id='4SZshZJnxNXLVagOZaiKTN1Pk1R2'
    this.firebase.getUserData(id).then((res:any)=>{

    console.log(res);
    this.city=res.city
    this.country=res.country
    this.email=res.email
    this.name=res.fullname
this.location=res.location
    this.imgUrl=res.imageUrl


    }).catch((err:any)=>{

    })
  }
}
