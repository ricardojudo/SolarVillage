import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewOrdersComponent } from "./new-orders/new-orders.component";
import { HoaMeetingsComponent } from "./hoa-meetings/hoa-meetings.component";
import { ServerInfoComponent } from "./server-info/server-info.component";
import { SignInComponent } from "./sign-in/sign-in.component";

import { AuthGuard } from "./guards/auth-guard";


const routes: Routes = [
  { path: 'sign-in', component: SignInComponent},
  { path: '', redirectTo: 'new-orders', pathMatch: 'full' },
  { path: 'new-orders', component: NewOrdersComponent, canActivate: [AuthGuard]},
  { path: 'hoa-meetings', component: HoaMeetingsComponent , canActivate: [AuthGuard]},
  { path: 'server-info', component: ServerInfoComponent , canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
