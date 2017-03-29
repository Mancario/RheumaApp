import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable} from "rxjs";
import {AuthService} from "./auth.service";

/*
@Injectable()

export class LoggedInGuard implements CanActivate {
    public constructor(private _authService: AuthService,
                       private _router: Router) {
    }

    public canActivate(route: ActivatedRouteSnapshot,
                       state: RouterStateSnapshot): Observable<boolean>|Promise<boolean>|boolean {
        const loggedIn = this._authService.isLoggedIn();
        if (!loggedIn) {
            this._router.navigate(['/login']);
        }
        return loggedIn;
    }
}
*/
