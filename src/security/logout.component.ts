/*
import {Component, ViewChild, AfterViewInit, OnInit} from '@angular/core';
import {AuthService} from "./auth.service";
import {Router} from "@angular/router";

@Component({
    template: "",
})
export class LogoutComponent implements OnInit {

    public constructor(private _authService: AuthService,
                       private _router: Router) {
    }

    public ngOnInit(): void {
        if (this._authService.isLoggedIn())
            this._authService.logout();
        this._router.navigate(["/"]);
    }
}
*/
