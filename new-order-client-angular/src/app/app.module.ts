import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { HttpClientInMemoryWebApiModule } from "angular-in-memory-web-api";

import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome'


import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';

import { InMemoryDataService } from "./services/in-memory-data.service";
import { NewOrdersComponent } from './new-orders/new-orders.component';
import { HoaMeetingsComponent } from './hoa-meetings/hoa-meetings.component';
import { ServerInfoComponent } from './server-info/server-info.component';
import { NewOrderDetailComponent } from './new-order-detail/new-order-detail.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    NewOrdersComponent,
    HoaMeetingsComponent,
    ServerInfoComponent,
    NewOrderDetailComponent
  ],
  imports: [
    BrowserModule,
    Angular2FontawesomeModule,
    AppRoutingModule,
    FormsModule,
    NgbModule.forRoot(),
    HttpClientModule
    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    //HttpClientInMemoryWebApiModule.forRoot(
    //  InMemoryDataService, { dataEncapsulation: false })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
