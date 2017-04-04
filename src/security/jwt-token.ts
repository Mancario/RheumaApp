/**
 * Takes an encoded JWT token as string, decodes
 * it and returns uid and username of the token.
 */

import * as jwtdecode from "jwt-decode";

export class JWTToken {
    private _decoded: any;


    public constructor(private _base64: string) {
        //var jwtdecode = require("jwt-decode");

        this._decoded = jwtdecode(_base64);
    }

    public get uid(): string {
        return this._decoded.sub;
    }

    public get username(): string {
        return this._decoded.username;
    }

    public toBase64(): string {
        return this._base64;
    }

}
