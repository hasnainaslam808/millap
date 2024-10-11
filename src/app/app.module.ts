import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { UserAuthComponent } from './user-auth/user-auth.component';
import { DataListComponent } from './pages/data-list/data-list.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

import { SelectedUserStoryComponent } from './selected-user-story/selected-user-story.component';
import { MissingPersonDetailComponent } from './pages/missing-person-detail/missing-person-detail.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    UserAuthComponent,
    SelectedUserStoryComponent,
    DataListComponent,
    DashboardComponent,
    MissingPersonDetailComponent,
    
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
