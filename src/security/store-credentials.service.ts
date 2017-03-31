import {Injectable} from "@angular/core";

import { Storage } from '@ionic/storage';

const KEY = "CREDS";

@Injectable()
export class StoreCredentialsService {
  private _storage : Storage = new Storage();


  public store(creds: string) : void{
    console.log("Inside storingclass");

    this._storage.ready().then(() => {

       this._storage.set(KEY, creds);

       console.log("Stored: " + creds);
     });
  }

  // Issues: If I return outside the then() function it will return null.
  //          When I return inside the function it returns undefined....
  // Why will it not work?????
    public retrieve(): any {

      var creds = null;
      this._storage.ready().then(() => {

        this._storage.get(KEY).then((val) => {

          creds = val;
          console.log("Retrieved: " + creds);

          return creds;


        })
       });




    }
}
