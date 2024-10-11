import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserAuthComponent } from './user-auth/user-auth.component';
import { SelectedUserStoryComponent } from './pages/selected-user-story/selected-user-story.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { EnterMissingPersonDetialsComponent } from './pages/enter-missing-person-detials/enter-missing-person-detials.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { DataListComponent } from './pages/data-list/data-list.component';

const routes: Routes = [
  {path:'',component:HeaderComponent},
  {path:'missing-person-detail',component:EnterMissingPersonDetialsComponent},
  {path:'love-ones',component:DataListComponent},
  {path:'detail',component:SelectedUserStoryComponent},
  {path:'sign-up',component:UserAuthComponent,data:{currentRoute:'sign-up',header:false}},
  {path:'log-in',component:UserAuthComponent,data:{currentRoute:'log-in',header:false}},
  {path:'user-story',component:SelectedUserStoryComponent,data:{currentRoute:'log-in',header:true}},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
