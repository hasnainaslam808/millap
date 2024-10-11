import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  constructor(private router: Router) {}
  ngOnInit(): void {
    // Check karain agar current route dashboard hai, to love-ones par navigate karain
    if (this.router.url === '/dashboard') {
      this.router.navigate(['/love-ones']);
    }
  }
}
