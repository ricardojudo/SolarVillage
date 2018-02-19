import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";
import { catchError, tap, map } from "rxjs/operators";

import { HoaMeeting } from "../models/hoa-meeting";
import { UserService } from "./user.service";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class HoaMeetingsService {

  constructor(private http: HttpClient,
    private userService: UserService) { }

}
