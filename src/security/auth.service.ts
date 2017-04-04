import {Injectable} from "@angular/core";
import {Observable} from 'rxjs/Observable';


import {AuthUser, AuthUserImpl} from "./auth-user";
import {LocalStorageService} from "./local-storage.service";
import {StoreCredentialsService} from "./store-credentials.service";
import {Http, Response, Headers} from "@angular/http";

import {API_URL} from '../environments/environment';
import {JWTToken} from "./jwt-token";

import * as jwtDecode from "jwt-decode";

const LOGIN_API_URL = API_URL + '/auth/login';
const TOKEN_API_URL = API_URL + '/auth/token';

type LoginResult =
    {success: true; token: string} | {success: false;};

@Injectable()
export class AuthService {
    private static _key: string = "JWTToken";
    private _cached: AuthUser = null;

    public constructor(private _localStorageService: LocalStorageService,
                       private _storeCredentialsService: StoreCredentialsService,
                       private _http: Http) {
        //setInterval(() => this.refreshToken(), 10 * 1000);
    }

    public isLoggedIn(): boolean {
      // TODO: Remove this log.
        console.log("Logged in: " + !!this.loggedInUser());
        return !!this.loggedInUser();
    }

    public loggedInUser(): AuthUser {
        if (!this._cached) {
            this.verifyStoredToken();
            this._cached = this.retrieveFromStore();
        }
        return this._cached;
    }

    public logout(): void {
        this.storeUser(null);
        this.storeCredentials(null);
    }


    public login(username: string, password: string): Observable<AuthUser> {
/*
        const loggedIn = this.loggedInUser();
        if (loggedIn) {
            return Observable.of(loggedIn);
        }
        */

        const headers: Headers = new Headers();
        headers.append('Content-Type', 'application/json');

        const credentials: string = JSON.stringify({
            username,
            password,
        });
        //this.isLoggedIn();
        //console.log("Logging in with: " + JSON.parse(credentials).username + " : " + JSON.parse(credentials).password);
        console.log("Logging in with: " + credentials);

        return this._http
            .post(LOGIN_API_URL, credentials, {
                headers,
            })
            .map(res => this.convert(<LoginResult>res.json()))
            .do(user => this.storeUser(user))
            .do(user => this.storeCredentials(credentials))
            .do(user => this.isLoggedIn())
            .catch(this.handleError);
    }

    private storeUser(user: AuthUser): void {
        if (user) {
            this._cached = user;
            this._localStorageService.store(AuthService._key, user.serialize());
        } else {
            this._cached = null;
            this._localStorageService.store(AuthService._key, null);
        }

        //console.log("Stored user exp: " + (jwtDecode(this.retrieveFromStore().authToken)/*.exp - Math.round(new Date().getTime() / 1000)*/));
    }

    // TODO: Make this method work...
    private storeCredentials(credentials): void {

        //console.log("Storing creds");
        if (credentials) {
          this._storeCredentialsService.store(credentials);
        } else {
          this._storeCredentialsService.store(null);
        }
    }


    private retrieveFromStore(): AuthUser {
        const serialized = this._localStorageService.retrieve(AuthService._key);
        return serialized ? AuthUserImpl.fromSerialization(serialized) : null;
    }



    public logInByStoredCredentials() : Observable<AuthUser>{
      let creds = this._storeCredentialsService.retrieve();
/*
      let promise = new Promise(resolve => {
        setTimeout(() =>{
          resolve(this._storeCredentialsService.retrieve());
        }, 2000);

      });

      promise.then(value => {
        console.log("Promise received: " + value);
      });
*/

/*
      this._storeCredentialsService.retrieve().then((creds) =>{
        console.log("Creds received: " + creds);

        if(creds != null){
          console.log("Re-logging in with: " + creds);
          this.login(JSON.parse(creds).username, JSON.parse(creds).password);
        }
      });
*/

      //console.log("Creds received: " + creds);

      if(creds != null){
        //console.log("Re-logging in with: " + creds);
        return this.login(JSON.parse(creds).username, JSON.parse(creds).password);
      }

    }


    public verifyStoredToken(): void {
        const user = this.retrieveFromStore();
        if (!user) return;
        const token = user.authToken;
        //var jwtDecode = require('jwt-decode');
        const decoded = jwtDecode(token);
        const now = Math.round(new Date().getTime() / 1000);
        const diffExp = decoded.exp - now;

        console.log("Time to exp: " + diffExp);

        if (diffExp < 1) {
            // token is expired
            this.storeUser(null);
            return;
        }
    }


    public refreshToken(): void {
        // first check if it is expired
        console.log("Refreshing token");
        this.verifyStoredToken();

        let user = this.retrieveFromStore();
        console.log("User stored: " + user);
        if (!user){ // It was expired
          console.log("Expired token...");
          // First try to log in by stored credentials
          this.logInByStoredCredentials();

          user = this.retrieveFromStore();

          if(!user){
            return;
          }

        }


        const headers: Headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Bearer ' + user.authToken);

        this._http
            .post(TOKEN_API_URL, {}, {headers})
            .map(res => this.convert(<LoginResult>res.json()))
            .subscribe(user => this.storeUser(user));
    }



/*
    private convert(result: LoginResult, username: string): AuthUser {
        if (!result) return null;
        if (!result.success) return null;
        return new AuthUserImpl(username, null, token.toBase64());
    }
    */

    private convert(result: LoginResult): AuthUser {
        if (!result) return null;
        if (!result.success) return null;
        const token = new JWTToken(result.token);
        return new AuthUserImpl(token.username, token.uid, token.toBase64());
    }


    private handleError(error: Response) {
        // in a real world app, we may send the error to some remote logging infrastructure
        // instead of just logging it to the console
        if (error.status === 401) return Observable.throw('Permission denied.');

        if (error.status === 404 || error.status == 403)
            return Observable.throw('Fehler: Login-Server nicht erreichbar.');
        console.error(error);
        let errorMessage: string = null;
        if (error.json) {
            try {
                errorMessage = error.json().error;
            } catch (e) {
                errorMessage = 'Server error: ' + (error.statusText ? error.statusText : error);
            }
        }
        return Observable.throw(errorMessage);
    }
}
