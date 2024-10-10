import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserAuthComponent } from './user-auth/user-auth.component';

const routes: Routes = [
  {path:'sign-up',component:UserAuthComponent,data:{currentRoute:'sign-up',header:false}},
  {path:'log-in',component:UserAuthComponent,data:{currentRoute:'log-in',header:false}},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
