import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule } from '@angular/material/toolbar'
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatIconModule } from '@angular/material/icon'
import { MatListModule } from '@angular/material/list'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OverviewComponent } from './overview/overview.component';
import { WeatherComponent } from './weather/weather.component';
import { RapsberryComponent } from './rapsberry/rapsberry.component';
import { TodoComponent } from './todo/todo.component';

const MATERIAL_COMPONENTS = [
  MatSidenavModule, 
  MatToolbarModule,
  MatIconModule,
  MatListModule
]

@NgModule({
  declarations: [
    AppComponent,
    OverviewComponent,
    WeatherComponent,
    RapsberryComponent,
    TodoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ...MATERIAL_COMPONENTS,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
