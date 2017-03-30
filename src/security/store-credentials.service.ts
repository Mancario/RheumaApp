import {Injectable} from "@angular/core";

//import { Storage } from '@ionic/storage';

const KEY = "CREDS";

@Injectable()
export class StoreCredentialsService {
  private _ls: Storage = window.localStorage;
  //private _storage : Storage = new Storage();


  public store(creds: string) : void{
    console.log("Inside storingclass");
/*
    this._storage.ready().then(() => {

       this._storage.set(KEY, creds);
     });
     */

    const s = this._ls.setItem(KEY, creds);
  }

    public retrieve(): any {
/*
      this._storage.ready().then(() => {

        this._storage.get('age').then((val) => {
          return val;
        })
       });
       */
        const s = this._ls.getItem(KEY);
        return s;
    }
}
