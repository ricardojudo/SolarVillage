import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from "../services/user.service";
import { User } from "../models/user";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  user: User = new User();

  constructor(private userService: UserService,
    private router: Router) { }

  ngOnInit() {    
  }

  signin(){
    this.userService.signin(this.user);
    this.router.navigate(['/']);
  }



}
