import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";
import { catchError, tap, map } from "rxjs/operators";

import { NewOrder } from "../models/new-order";

@Injectable()
export class NewOrdersService {

  constructor(private http: HttpClient) { }

}
