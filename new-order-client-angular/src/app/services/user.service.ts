import { Injectable } from '@angular/core';
import { User } from "../models/user";
@Injectable()
export class UserService {

  user:User;

  constructor() { }

  signin(user:User){
    this.user = user;
    console.log(this.user.name);
    
  }

  getCurrentUser():User{
    console.log(this.user.name);
    return this.user;
  }

}
