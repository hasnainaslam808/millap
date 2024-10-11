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
import { FvrtStoryComponent } from './pages/fvrt-story/fvrt-story.component';
import { UpdateProfileComponent } from './pages/update-profile/update-profile.component';
import { SelectedUserStoryComponent } from './selected-user-story/selected-user-story.component';
import { MissingPersonDetailComponent } from './pages/missing-person-detail/missing-person-detail.component';
// Import AngularFire modules
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { provideMessaging, getMessaging } from '@angular/fire/messaging';
import { environment } from 'src/environments/environment.staging';
import { provideFirebaseApp } from '@angular/fire/app';
import { initializeApp } from 'firebase/app';
import { FirestoreModule } from '@angular/fire/firestore';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SelectedUserStoryComponent,
    DataListComponent,
    DashboardComponent,
    FvrtStoryComponent,
    UpdateProfileComponent,
    MissingPersonDetailComponent,UserAuthComponent
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,FormsModule,
    // Initialize Firebase app
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    FirestoreModule
    // Provide Firebase services
    // provideDatabase(() => getDatabase()),
    // // provideAuth(() => getAuth()),
    // provideStorage(() => getStorage()),
    // provideMessaging(() => getMessaging()),

    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
