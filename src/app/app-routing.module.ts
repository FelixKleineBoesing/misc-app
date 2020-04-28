import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OverviewComponent } from './overview/overview.component';
import { RapsberryComponent } from './rapsberry/rapsberry.component';
import { TodoComponent } from './todo/todo.component';
import { WeatherComponent } from './weather/weather.component';
import { LoginComponent } from './login/login/login.component';
import { RegisterComponent } from './login/register/register.component';
import { AuthGuardService } from './shared/services/auth.guard';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'overview', canActivate: [AuthGuardService]},
  { path: 'overview', component: OverviewComponent, canActivate: [AuthGuardService]},
  { path: 'rapsberry', component: RapsberryComponent, canActivate: [AuthGuardService]},
  { path: 'todo', component: TodoComponent, canActivate: [AuthGuardService]},
  { path: 'weather', component: WeatherComponent, canActivate: [AuthGuardService]},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
