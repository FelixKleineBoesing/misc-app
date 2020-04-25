import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OverviewComponent } from './overview/overview.component';
import { RapsberryComponent } from './rapsberry/rapsberry.component';
import { TodoComponent } from './todo/todo.component';
import { WeatherComponent } from './weather/weather.component';
import { LoginComponent } from './login/login/login.component';
import { RegisterComponent } from './login/register/register.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'overview'},
  { path: 'overview', component: OverviewComponent},
  { path: 'rapsberry', component: RapsberryComponent},
  { path: 'todo', component: TodoComponent},
  { path: 'weather', component: WeatherComponent},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
