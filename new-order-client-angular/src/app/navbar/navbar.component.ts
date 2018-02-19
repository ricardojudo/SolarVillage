import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { User } from "../models/user";
import { UserService } from "../services/user.service";


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  currentUser: User;

  constructor(private router: Router,
    private userService: UserService,
    private location: Location) { }

  ngOnInit() {
    this.userService.getCurrentUserSubscription((currentUser)=>{
      this.currentUser=currentUser;
    });
  }

  signOut(){
    this.userService.signout();
    this.currentUser=null;
    this.router.navigate(['/sign-in']);
  }

}
