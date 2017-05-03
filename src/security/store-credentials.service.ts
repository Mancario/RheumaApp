import { Injectable } from "@angular/core";
import { SecureStorage, SecureStorageObject } from '@ionic-native/secure-storage';

const KEY = "CREDS";

@Injectable()
export class StoreCredentialsService {

    constructor(private _secureStorage: SecureStorage) { }

    public store(creds: string): void {
        this._secureStorage.create('credentials_storage').then((storage: SecureStorageObject) => {
            storage.set(KEY, creds);
            console.log("StoreCredentialsService stored: " + creds);
        });
    }

    public retrieve(): Promise<string> {
        return this._secureStorage.create('credentials_storage')
            .then((storage: SecureStorageObject) => storage.get(KEY));
    }
}
