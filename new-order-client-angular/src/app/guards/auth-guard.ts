import { Injectable } from '@angular/core';
import { UserService } from "../services/user.service";
import { Router, CanActivate } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private userService: UserService,
        private router: Router) { }

    canActivate() {
        if (this.userService.getCurrentUser()) {
            // logged in so return true
            return true;
        }

        // not logged in so redirect to login page
        this.router.navigate(['/sign-in']);
        return false;
    }
}