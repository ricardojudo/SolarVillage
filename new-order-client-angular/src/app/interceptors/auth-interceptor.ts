import { Injectable } from "@angular/core";
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor } from "@angular/common/http";

import { Observable } from "rxjs/Observable";
import { User } from "../models/user";
import { UserService } from "../services/user.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor{

    constructor(private userService: UserService){}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
        let auth = this.userService.getBasicAuthValue()
        //console.log(">>>> "+ auth)
        let _request = request.clone({
            setHeaders: {'Authorization': auth}
        });

        return next.handle(_request);
    }


}
