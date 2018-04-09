import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { MenuComponent } from './user/components/menu/menu.component';
import { AppRoutingModule } from './/app-routing.module';
import { HomeComponent } from './shared/components/home/home.component';
import { FooterComponent } from './shared/components/footer/footer.component';

import { HomeService } from './shared/services/home.service';
import { InitialMenuComponent } from './shared/components/initial-menu/initial-menu.component';
import { LoginComponent } from './shared/components/login/login.component';
import { IndexComponent } from './user/components/index/index.component';
import { SearchComponent } from './shared/components/search/search.component';
import { AddUserComponent } from './user/components/add-user/add-user.component';
import { CalendarComponent } from './user/components/calendar/calendar.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule } from 'angular-calendar';
import { DemoUtilsModule } from '../../node_modules/demo-utils/module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HomeComponent,
    FooterComponent,
    InitialMenuComponent,
    LoginComponent,
    IndexComponent,
    SearchComponent,
    AddUserComponent,
    CalendarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    CalendarModule.forRoot(),
    BrowserAnimationsModule,
    CalendarModule,
    DemoUtilsModule,
    FormsModule

  ],
  providers: [
    HomeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
