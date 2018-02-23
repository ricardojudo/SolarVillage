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
  baseUrl = "api/hoaMeetings";
  
  constructor(private http: HttpClient,
    private userService: UserService) { }

    showDetail(hoaMeeting): Observable<HoaMeeting>{
      let url = `${this.baseUrl}/${hoaMeeting.id}`
      return this.http.get<HoaMeeting>(url)
    }

    getOwnedHoaMeetings():Observable<HoaMeeting[]>{
      let url = `${this.baseUrl}`
      return this.http.get<HoaMeeting[]>(url)
    }
    getPotentialHoaMeetings():Observable<HoaMeeting[]>{
      let url = `${this.baseUrl}/potential`
      return this.http.get<HoaMeeting[]>(url)
    }

    claim(hoaMeeting){
      let url = `${this.baseUrl}/${hoaMeeting.id}/claimed`
      return this.http.put<HoaMeeting[]>(url,{},httpOptions)
    }

    complete(hoaMeeting){
      let url = `${this.baseUrl}/${hoaMeeting.id}/completed`
      return this.http.put<HoaMeeting[]>(url,{'approved': hoaMeeting.approved} ,httpOptions)
    }

}
