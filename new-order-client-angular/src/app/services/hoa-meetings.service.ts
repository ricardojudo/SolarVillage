import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";
import { catchError, tap, map } from "rxjs/operators";

import { HoaMeeting } from "../models/hoa-meeting";


@Injectable()
export class HoaMeetingsService {

  constructor(private http: HttpClient) { }

}
