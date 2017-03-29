/*
import {Component, OnInit} from '@angular/core';
import {AuthService} from "./auth.service";
import {Router} from "@angular/router";
import {MdlDialogService} from "angular2-mdl";
import {LoginDialogComponent} from "./login-dialog.component";

@Component({
    templateUrl: './login.component.html',
    styleUrls: ['login.component.scss'],
})
export class LoginComponent implements OnInit {
    public constructor(private _authService: AuthService,
                       private _router: Router,
                       private _dialogService: MdlDialogService) {
    }

    public ngOnInit(): void {
        if (this._authService.isLoggedIn())
            this._router.navigate(["/"]);

        this._dialogService.showCustomDialog({
            component: LoginDialogComponent,
            isModal: true,
            clickOutsideToClose: false,
            enterTransitionDuration: 400,
            leaveTransitionDuration: 400
        });
    }
}

*/
