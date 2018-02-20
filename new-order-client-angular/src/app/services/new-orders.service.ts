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


  getNewOrders(status):Observable<any>{
    let url = `${kieServerHost}/kie-server/services/rest/server/queries/processes/new-order-permitting-kjar.NewOrderProcess/instances?status=${status}`
    let authHeaders = this.userService.getCurrentAuthHeaders();
    return this.http.get(url, {headers: authHeaders});
  }



  
}
