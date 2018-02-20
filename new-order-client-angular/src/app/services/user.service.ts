import { Injectable } from '@angular/core';
import { HttpHeaders } from "@angular/common/http";

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
    let user:User = Object.setPrototypeOf(JSON.parse(_user), User.prototype);
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

  getCurrentAuthHeaders(){
    return this.appendCurrentAuthHeaders(new HttpHeaders());
  }

  appendCurrentAuthHeaders(headers: HttpHeaders){
    let _user = this.getCurrentUser();
    let credentials=`${_user.name}:${_user.password}`
    headers.append('Authorization',`Basic: ${btoa(credentials)}`)
    return headers;
  }

  getBasicAuthValue(){
    let user = this.getCurrentUser();
    //console.log(">>> User: "+ user);
    let credentials=this.getCurrentUser().getCredentials();
    let basicCredentials=`Basic: ${btoa(credentials)}`;
    return basicCredentials;
  }

}
