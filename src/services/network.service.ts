import { Injectable} from '@angular/core';
import { Network } from '@ionic-native/network';


export interface IWakeMeUp{
  wakeMeUp: () => void;
}


@Injectable()
export class NetworkService {

  public connected = false
  private listeners: IWakeMeUp[] = []


    constructor(private network : Network) {

      console.log("Current network:", this.network.type)
      this.connected = !this.network.type || this.network.type != 'none'
      console.log("Initial Network status:" + this.connected)

      // watch network for a disconnect
      this.network.onDisconnect().subscribe(() => {
        this.connected = false
        console.log('network was disconnected :-(');
      });


      // watch network for a connection
      this.network.onConnect().subscribe(() => {
        console.log('network connected!'); 
        // We just got a connection but we need to wait briefly
         // before we determine the connection type.  Might need to wait 
        // prior to doing any api requests as well.
        setTimeout(() => {
          this.connected = true
          this.listeners.forEach(l => l.wakeMeUp())
        }, 3000);
      });

    }

    public registerWakeUpCall(listener: IWakeMeUp){
      this.listeners.push(listener)
    }


}
