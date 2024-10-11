import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { UserAuthComponent } from './user-auth/user-auth.component';
import { SelectedUserStoryComponent } from './pages/selected-user-story/selected-user-story.component';
import { EnterMissingPersonDetialsComponent } from './pages/enter-missing-person-detials/enter-missing-person-detials.component';
import { DataListComponent } from './pages/data-list/data-list.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { FvrtStoryComponent } from './pages/fvrt-story/fvrt-story.component';
import { UpdateProfileComponent } from './pages/update-profile/update-profile.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    UserAuthComponent,
    SelectedUserStoryComponent,
    EnterMissingPersonDetialsComponent,
    DataListComponent,
    DashboardComponent,
    FvrtStoryComponent,
    UpdateProfileComponent
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,FormsModule,ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
