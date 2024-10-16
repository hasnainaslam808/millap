import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatasharingService } from 'src/app/shared/services/datasharing.service';
import { FirebaseCollectionService } from 'src/app/shared/services/firebase-collection.service';

@Component({
  selector: 'app-data-list',
  templateUrl: './data-list.component.html',
  styleUrls: ['./data-list.component.scss']
})
export class DataListComponent implements OnInit {

  personData: any = []
  isLoading: boolean = true;
  activeRoute = ''
  countries: any[] = [];
  selectedCountry?: any;
  cities: any[] = [];
  constructor(private firebase: FirebaseCollectionService, private route: ActivatedRoute, private dataService: DatasharingService, private http: HttpClient) { }


  ngOnInit(): void {
    // Start loading
    this.isLoading = true;
    this.loadCountries();

    this.route.data.subscribe((res: any) => {
      const fetchStories = res.componentType === 'love-ones'
        ? this.firebase.fetchStories()
        : this.firebase.getOwnerUploadedStories(localStorage.getItem('userId'));

      fetchStories
        .then((data: any) => {
          this.personData = data; // Update personData with fetched data
        })
        .catch((err: any) => {
          console.error(err); // Handle error (optional)
        })
        .finally(() => {
          this.isLoading = false; // Stop loading regardless of success or failure
        });
    });

    // Subscribe to personData updates
    this.dataService.personData$.subscribe(data => {
      this.personData = data;
      this.isLoading = false; // Stop loading when data is received from the service
    });
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


        }).catch((err: any) => {

        })
      }
    } else {
      // console.log('user-not login')
    }
  }



  submitForm(val: any) {
    this.firebase.filter(val).then((res: any) => {
      this.personData = res
    }).catch((err: any) => {

    })

  }
}
