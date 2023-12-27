import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangepinComponent } from './changepin/changepin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HistoryComponent } from './history/history.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { TransferComponent } from './transfer/transfer.component';

const routes: Routes = [
  {path: 'register', component: RegisterComponent},
  {path: '', redirectTo: '/register', pathMatch: 'full'},
  {path:'login', component: LoginComponent },
  {path:'changepin', component: ChangepinComponent },
  {path:'dashboard', component: DashboardComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'transfer', component: TransferComponent },
  { path: 'history', component: HistoryComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
