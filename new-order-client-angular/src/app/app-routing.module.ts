import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewOrdersComponent } from "./new-orders/new-orders.component";
import { HoaMeetingsComponent } from "./hoa-meetings/hoa-meetings.component";
import { ServerInfoComponent } from "./server-info/server-info.component";

const routes: Routes = [
  { path: '', redirectTo: 'new-orders', pathMatch: 'full' },
  { path: 'new-orders', component: NewOrdersComponent},
  { path: 'hoa-meetings', component: HoaMeetingsComponent },
  { path: 'server-info', component: ServerInfoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
