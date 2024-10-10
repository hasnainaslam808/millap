import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { UserAuthComponent } from './user-auth/user-auth.component';
import { SelectedUserStoryComponent } from './selected-user-story/selected-user-story.component';
import { EnterMissingPersonDetialsComponent } from './enter-missing-person-detials/enter-missing-person-detials.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    UserAuthComponent,
    SelectedUserStoryComponent,
    EnterMissingPersonDetialsComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
