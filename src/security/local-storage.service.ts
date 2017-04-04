import {Injectable} from "@angular/core";

const PREFIX = "OMORA::";

@Injectable()
export class LocalStorageService {
    private _ls: Storage = window.localStorage;

    public store(key: string, val: string): void {
        this._ls.setItem(this.keyFor(key), val);
    }

    public retrieve(key: string): any {
        const s = this._ls.getItem(this.keyFor(key));
        return s;
    }

    private keyFor(key: string): string {
        return PREFIX + key;
    }
}
