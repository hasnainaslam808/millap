import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FirebaseCollectionService } from 'src/app/shared/services/firebase-collection.service';

@Component({
  selector: 'app-fvrt-story',
  templateUrl: './fvrt-story.component.html',
  styleUrls: ['./fvrt-story.component.scss']
})
export class FvrtStoryComponent {
  personData: any = []
  countries: any[] = [];
  selectedCountry?: any;
  cities: any[] = [];
  constructor(private firebase: FirebaseCollectionService,private http: HttpClient) { }

  ngOnInit(): void {
    this.loadCountries();
    const userId = localStorage.getItem('userId');
    this.firebase.fetchFavoriteStoriesByUser(userId).then((res: any) => {
      this.personData = res
      // console.log(this.personData);

    })

  }
  loadCountries() {
    this.http.get<any[]>('assets/countries.json').subscribe(data => {
      this.countries = data;
    });
  }


  onCountryChange(event: any) {
    // Get the selected country object
    this.selectedCountry = event;

    // Update the cities based on the selected country
    if (this.selectedCountry) {
      this.cities = this.selectedCountry.cities;
      console.log(this.cities); // Log the cities to see if they're correct
    } else {
      this.cities = []; // Reset cities if no country is selected
    }
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
          this.personData.splice(i, 1);

        }).catch((err: any) => {

        })
      }
    } else {
      // console.log('user-not login')
    }
  }
  
  submitForm(val:any){
    this.firebase.filter(val).then((res: any) => {
      this.personData = res
    }).catch((err: any) => {

    })
    

  }
}
