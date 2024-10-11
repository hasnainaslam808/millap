import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'millap';
  layOutTogle: boolean = false
  dashboard = false
  constructor(private router:Router){
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        let currentRoute:any = this.router.routerState.root;
        while (currentRoute.firstChild) {
          currentRoute = currentRoute.firstChild;
        }
        this.layOutTogle = currentRoute.snapshot.data.header
        this.dashboard = currentRoute.snapshot.data.dashboard

        
     });

  
  }}
