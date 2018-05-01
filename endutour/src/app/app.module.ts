import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

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
import {PremiosComponent} from './shared/components/premios/premios.component'

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule } from 'angular-calendar';
import { DemoUtilsModule } from '../../node_modules/demo-utils/module';
import { FormsModule } from '@angular/forms';

import { UserService } from './user/services/user.service';
import { SearchService } from './shared/services/search.service';
import { RutUserService } from './shared/services/rut-user.service';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import {FlashMessageModule} from 'angular-flash-message';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { importType } from '@angular/compiler/src/output/output_ast';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
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
    PremiosComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    CalendarModule.forRoot(),
    FlashMessagesModule.forRoot(),
    BrowserAnimationsModule,
    CalendarModule,
    DemoUtilsModule,
    FormsModule,
    HttpClientModule,
    HttpModule,
    FlashMessageModule,
  ],
  providers: [
    HomeService,
    UserService,
    SearchService,
    RutUserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


