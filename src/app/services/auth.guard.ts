import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let result = false;
        if (localStorage.getItem('jwt_token')) {
            // logged in so return true
            result = true;
        } else {
            // Accessing individual values
            // const landingPage = localStorage.getItem('landing-page');
            // console.log('landingPage', landingPage);
            // if (landingPage == 'true') {
            //     sessionStorage.getItem('reload') == 'true' ? this.router.navigate(['/ekyc/login']) : this.router.navigate(['/login']);
            // }
            // else {
            //     this.router.navigate(['/login/landing-page']);
            // }
            this.router.navigate(['/login']);
        }
        return result;
    }
}
