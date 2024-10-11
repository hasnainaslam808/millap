import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserAuthComponent } from './user-auth/user-auth.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { DataListComponent } from './pages/data-list/data-list.component';
import { SelectedUserStoryComponent } from './selected-user-story/selected-user-story.component';
import { MissingPersonDetailComponent } from './pages/missing-person-detail/missing-person-detail.component';

const routes: Routes = [
  {path:'',component:HeaderComponent},
  {path:'missing-person-detail',component:MissingPersonDetailComponent},
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
