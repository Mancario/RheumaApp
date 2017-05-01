import {Injectable} from "@angular/core";
//import {Observable} from 'rxjs/Observable';

import { Storage } from '@ionic/storage';

const KEY = "CREDS";

@Injectable()
export class StoreCredentialsService {
  private _storage : Storage = new Storage();


  public store(creds: string) : void{

    this._storage.ready().then(() => {

       this._storage.set(KEY, creds);

       console.log("Stored: " + creds);
     });
  }


    public retrieve(): Promise<string> {

      //var creds = null;
      return this._storage.ready().then(() => {

        return <Promise<string>> this._storage.get(KEY)

       });

       //return creds;

    }
}
