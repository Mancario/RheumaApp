/*
import {
    Component,
    ViewChild,
} from '@angular/core';
import {FormGroup, Validators, FormControl, FormBuilder} from '@angular/forms';
import {MdlTextFieldComponent, MdlDialogReference} from "angular2-mdl";
import {AuthService} from "./auth.service";
import {Router} from "@angular/router";

@Component({
    selector: 'login-dialog',
    templateUrl: 'login-dialog.component.html',
    styles: [
        `
     .status-bar {
         text-align: center;
     }
    `
    ]
})
export class LoginDialogComponent {
    public loading: boolean = false;
    public errorMessage: string = null;
    public form: FormGroup;
    public username = new FormControl('', Validators.required);
    public password = new FormControl('', Validators.required);
    @ViewChild('firstElement') private inputElement: MdlTextFieldComponent;

    constructor(private _dialog: MdlDialogReference,
                private _authService: AuthService,
                private _router: Router,
                fb: FormBuilder) {

        this.form = fb.group({
            'username': this.username,
            'password': this.password,
        });

        this._dialog.onVisible().subscribe(() => {
            this.inputElement.setFocus();
        });
    }

    public login(): void {
        this.errorMessage = null;
        this.loading = true;
        const formValue = this.form.value;

        this._authService.login(formValue.username, formValue.password)
            .subscribe(
                res => {
                    if (res) {
                        this._router.navigate(['/']);
                        this._dialog.hide();
                    }
                    this.setError("Fehler: Benutzername oder Passwort falsch.");
                    this.inputElement.setFocus();
                },
                err => this.setError("Serverfehler beim Einloggen: " + err));
    }

    public register(): void {
        window.location.href = "http://www.rheuma-online.de/forum/register.php";
    }

    public lostpw(): void {
        window.location.href = "http://www.rheuma-online.de/forum/login.php?do=lostpw";
    }

    private setError(error: string): void {
        this.loading = false;
        this.errorMessage = error;
    }
}

*/
