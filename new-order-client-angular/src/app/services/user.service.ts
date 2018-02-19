import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { User } from "../models/user";


@Injectable()
export class UserService {

  userObserver:Subject<User>=new Subject();

  constructor() { }

  signin(user:User){    
    localStorage.setItem("currentUser", JSON.stringify(user));
    this.userObserver.next(user);
  }

  getCurrentUser():User{
    let _user = localStorage.getItem("currentUser");
    let user:User = JSON.parse(_user);
    this.userObserver.next(user);
    return user;
  }

  getCurrentUserSubscription(callback){
    this.userObserver.subscribe(callback);
  }

  signout(){
    localStorage.removeItem("currentUser");
    this.userObserver.next(null);
  }

}
