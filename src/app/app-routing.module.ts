import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserAuthComponent } from './user-auth/user-auth.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { DataListComponent } from './pages/data-list/data-list.component';
import { UpdateProfileComponent } from './pages/update-profile/update-profile.component';
import { MissingPersonDetailComponent } from './pages/missing-person-detail/missing-person-detail.component';
import { SelectedUserStoryComponent } from './selected-user-story/selected-user-story.component';

// const routes: Routes = [
 
//   {path:'missing-person-detail',component:EnterMissingPersonDetialsComponent,data:{header:true,dashboard:true}},
  
//   {path:'favorite-story',component:DataListComponent,data:{header:true,dashboard:true}},
//   {path:'dashboard',component:DashboardComponent,data:{header:true,dashboard:false}},


  
//   {path:'sign-up',component:UserAuthComponent,data:{currentRoute:'sign-up',header:false,dashboard:false}},
//   {path:'log-in',component:UserAuthComponent,data:{currentRoute:'log-in',header:false,dashboard:false}},
//   {path:'user-story',component:SelectedUserStoryComponent,data:{header:true,dashboard:false}},
   

// ];
const routes: Routes = [
  { 
    path: 'dashboard', 
    component: DashboardComponent, data:{header:true,},
    children: [
      { path: '', redirectTo: '', pathMatch: 'full' }, // Default child route
      { path: 'favorite-story', component: DataListComponent,data:{header:true,} },
      { path: '', component: DataListComponent,data:{header:true,} },
      { path: 'missing-person-detail', component: MissingPersonDetailComponent,data:{header:true,} }
    ] 
  },
  { path: 'sign-up', component: UserAuthComponent,data:{currentRoute:'sign-up',header:false,} },
  { path: 'log-in', component: UserAuthComponent, data:{currentRoute:'log-in',header:false,}},
  { path: 'user-story', component: SelectedUserStoryComponent,data:{header:true,} },
  { path: 'update-profile', component: UpdateProfileComponent,data:{header:true,} },

  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }, // Default route to dashboard
  { path: '**', redirectTo: '/dashboard' } // Wildcard route
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
