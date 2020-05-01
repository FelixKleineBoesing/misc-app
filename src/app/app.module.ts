import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { QuillModule } from 'ngx-quill';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule} from '@angular/forms';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatMenuModule } from '@angular/material/menu';
import {MatSnackBarModule} from '@angular/material/snack-bar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OverviewComponent } from './overview/overview.component';
import { WeatherComponent } from './weather/weather.component';
import { RapsberryComponent } from './rapsberry/rapsberry.component';
import { TodoComponent } from './todo/todo.component';
import { TodoService } from './todo/todo.service';

import { AdministrationComponent } from './administration/administration.component';
import { LoginComponent } from './login/login/login.component';
import { RegisterComponent } from './login/register/register.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { AlertsComponent } from './shared/alerts/alerts.component';
import { HelpComponent } from './toolbar/help/help.component';
import { SettingsComponent } from './toolbar/settings/settings.component';
import { JwtInterceptor } from './shared/interceptors/jwt.interceptors';
import { ErrorInterceptor } from './shared/interceptors/error.interceptor';
import { ProfileComponent } from './toolbar/settings/profile/profile.component';
import { NotificationsComponent } from './toolbar/settings/notifications/notifications.component';


const MATERIAL_COMPONENTS = [
  MatSidenavModule,
  MatToolbarModule,
  MatIconModule,
  MatListModule,
  MatCardModule,
  MatInputModule,
  MatSelectModule,
  MatDatepickerModule,
  MatCheckboxModule,
  MatNativeDateModule,
  MatMenuModule, 
  MatSnackBarModule
]

@NgModule({
  declarations: [
    AppComponent,
    OverviewComponent,
    WeatherComponent,
    RapsberryComponent,
    TodoComponent,
    AdministrationComponent,
    LoginComponent,
    RegisterComponent,
    ToolbarComponent,
    SidenavComponent,
    AlertsComponent,
    HelpComponent,
    SettingsComponent,
    ProfileComponent,
    NotificationsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ...MATERIAL_COMPONENTS,
    BrowserAnimationsModule,
    HttpClientModule,
    QuillModule.forRoot(),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [TodoService,
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
],
  bootstrap: [AppComponent],
})
export class AppModule { }
