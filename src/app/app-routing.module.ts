import { compileNgModule } from '@angular/compiler';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { combineLatest } from 'rxjs';
import { HeaderComponent } from './layout/header/header.component';
import { MainComponent } from './layout/main/main.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './modules/forgot-password/forgot-password.component';
import { GoalSettingComponent } from './objectives/goal-setting/goal-setting.component';
import { GoalsComponent } from './objectives/goals/goals.component';
import { LoginComponent } from './modules/login/login.component';
import { PortfolioComponent } from './modules/portfolio/portfolio.component';
import { SignUpComponent } from './modules/sign-up/sign-up.component';
import { OtpComponent } from './otp/otp.component';
import { SettingPasswordComponent } from './modules/setting-password/setting-password.component';
import { LoginHeaderComponent } from './layout/login-header/login-header.component';
import { AuthGaurdService } from './services/auth-gaurd.service';
import { NotificationsComponent } from './modules/notifications/notifications.component';
import { Signup2Component } from './modules/signup2/signup2.component';

import { GoalOnboardingComponent } from './objectives/goal-onboarding/goal-onboarding.component';
import { ChildrenEducationComponent } from './objectives/children-education/children-education.component';

import { FundComponent } from './fund-managment/fund/fund.component';





const routes: Routes = [

  {
    path: '',
    component: MainComponent,
    children: [{ path: '', component: LoginHeaderComponent }]
  },

  {
    path: 'login',
    component: MainComponent,
    children: [{ path: '', component: LoginComponent }]
  },

  {
    path: 'forgotPassword',
    component: MainComponent,
    children: [{ path: '', component: ForgotPasswordComponent }]
  },

  {
    path: 'header',
    component: MainComponent,
    children: [{ path: '', component: HeaderComponent }]
  },

  {
    path: 'signUp',
    component: MainComponent,
    children: [{ path: '', component: SignUpComponent }]
  },

  // {
  //   path: 'signUp2',
  //   component: MainComponent,
  //   children: [{ path: '', component: Signup2Component }]
  // },

  {
    path: 'dashboard',
    component: MainComponent,
    children: [
      { path: '', component: DashboardComponent }
    ],
    canActivate: [AuthGaurdService]


  },

  {
    path: 'notifications',
    component: MainComponent,
    children: [{ path: '', component: NotificationsComponent }],
    canActivate: [AuthGaurdService]


  },
  {
    path: 'portfolio',
    component: MainComponent,

    children: [{ path: '', component: PortfolioComponent }],

    canActivate: [AuthGaurdService]




  },

  {
    path: 'goals/:category',
    component: MainComponent,
    children: [{ path: '', component: GoalsComponent }]
  },

  {
    path: 'goal-setting',
    component: MainComponent,
    children: [{ path: '', component: GoalSettingComponent }]
  },
  {
    path: 'fund',
    component: MainComponent,
    children: [{ path: '', component: FundComponent }]
  },
  /*
  {
    path: 'goals/:category',
    component: GoalsComponent
  }, 
  */
  {
    path: 'goalonboarding',
    component: GoalOnboardingComponent
  }
  ,
  {
    path: 'children-education/:goalid',
    component: ChildrenEducationComponent
  },




  { path: 'otp', component: OtpComponent },

  { path: 'newpassword', component: SettingPasswordComponent },

  { path: 'signup', component: SignUpComponent },

  { path: 'signup2', component: Signup2Component }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]

})
export class AppRoutingModule { }
