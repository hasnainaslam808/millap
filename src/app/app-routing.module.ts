import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserAuthComponent } from './user-auth/user-auth.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { DataListComponent } from './pages/data-list/data-list.component';
import { UpdateProfileComponent } from './pages/update-profile/update-profile.component';
import { MissingPersonDetailComponent } from './pages/missing-person-detail/missing-person-detail.component';
import { SelectedUserStoryComponent } from './selected-user-story/selected-user-story.component';
import { FvrtStoryComponent } from './pages/fvrt-story/fvrt-story.component';
import { authGuardGuard } from './shared/services/auth-guard.guard';

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
    component: DashboardComponent, data: { header: true, },
    children: [
      // { path: '', redirectTo: '', pathMatch: 'full' }, // Default child route
      { path: 'favorite-story', component: FvrtStoryComponent, data: { header: true, }, canActivate: [authGuardGuard] },
      { path: '', component: DataListComponent, data: { header: true, componentType:'love-ones'}, canActivate: [authGuardGuard] },
      { path: 'my-list', component: DataListComponent, data: { header: true,componentType:'my-list'}, canActivate: [authGuardGuard] },

      { path: 'missing-person-detail', component: MissingPersonDetailComponent, data: { header: true, }, canActivate: [authGuardGuard] }
    ]
  },
  { path: 'sign-up', component: UserAuthComponent, data: { currentRoute: 'sign-up', header: false, } },
  { path: 'log-in', component: UserAuthComponent, data: { currentRoute: 'log-in', header: false, } },
  { path: 'user-story/:id', component: SelectedUserStoryComponent, data: { header: true, }, canActivate: [authGuardGuard] },
  { path: 'update-profile', component: UpdateProfileComponent, data: { header: true, }, canActivate: [authGuardGuard] },

  { path: '', redirectTo: '/log-in', pathMatch: 'full', }, // Default route to dashboard
  { path: '**', redirectTo: '/dashboard' } // Wildcard route
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
