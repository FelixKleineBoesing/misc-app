import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
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

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OverviewComponent } from './overview/overview.component';
import { WeatherComponent } from './weather/weather.component';
import { RapsberryComponent } from './rapsberry/rapsberry.component';
import { TodoComponent } from './todo/todo.component';
import { TodoService } from './todo/todo.service';


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
  MatNativeDateModule
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
    BrowserAnimationsModule,
    HttpClientModule,
    QuillModule.forRoot(),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [TodoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
