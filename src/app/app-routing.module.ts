import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserAuthComponent } from './user-auth/user-auth.component';
import { SelectedUserStoryComponent } from './selected-user-story/selected-user-story.component';

const routes: Routes = [
  {path:'sign-up',component:UserAuthComponent,data:{currentRoute:'sign-up',header:false}},
  {path:'log-in',component:UserAuthComponent,data:{currentRoute:'log-in',header:false}},
  {path:'user-story',component:SelectedUserStoryComponent,data:{currentRoute:'log-in',header:true}},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
