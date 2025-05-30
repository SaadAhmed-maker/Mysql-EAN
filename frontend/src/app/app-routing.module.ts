import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginSignupComponent } from './auth/login-signup/login-signup.component';
import { RegisterationComponent } from './components/registeration/registeration.component';
import { SummaryComponent } from './components/summary/summary.component';

const routes: Routes = [{
  path: '',
  component:LoginSignupComponent
},{
  path: 'registration',
  component:RegisterationComponent
},{
  path: 'summary',
  component:SummaryComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
