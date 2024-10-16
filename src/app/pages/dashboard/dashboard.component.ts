import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  activeTab: string = 'loved-ones';  

  constructor(private router: Router) {}


  setActiveTab(tab: string) {
    this.activeTab = tab;
  }
  ngOnInit(): void {
    if (this.router.url === '/dashboard') {
      this.router.navigate(['/love-ones']);
    }
  }
}
