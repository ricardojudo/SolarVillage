import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";
import { catchError, tap, map } from "rxjs/operators";

import { NewOrder } from "../models/new-order";
import { UserService } from "./user.service";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const kieServerHost="http://localhost:8080"
const kieContainer="solar-village"

@Injectable()
export class NewOrdersService {

  constructor(private http: HttpClient,
              private userService: UserService) { }


  baseUrl = "api/newOrders";

  getNewOrders(status):Observable<NewOrder[]>{
    //let url = `${kieServerHost}/kie-server/services/rest/server/queries/processes/new-order-permitting-kjar.NewOrderProcess/instances?status=${status}`
    //let authHeaders = this.userService.getCurrentAuthHeaders();
    let url=`${this.baseUrl}?status=${status}`
    return this.http.get<NewOrder[]>(url);
  }

  showNewOrder(id):Observable<NewOrder>{
    let url=`${this.baseUrl}/${id}`
    return this.http.get<NewOrder>(url);
  }

  createNewOrder(newOrder): Observable<any>{
    let url=`${this.baseUrl}`;
    return this.http.post(url,newOrder,httpOptions);
  }

  deleteNewOrder(id): Observable<any>{
    let url=`${this.baseUrl}/${id}`
    console.log(url)
    return this.http.delete(url);
  }



  
}
