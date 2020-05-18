import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignupComponent } from './signup/signup.component';
import { SiginComponent } from './sigin/sigin.component';

const routes: Routes = [
  { path: 'signup', component: SignupComponent},
  { path: 'signin', component: SiginComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
