import { Injectable} from '@angular/core';
import { Network } from '@ionic-native/network';
import { ToastController, Toast } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';


export interface IWakeMeUp{
  wakeMeUp: () => void;
}


@Injectable()
export class NetworkService {

  public connected = false
  private listeners: IWakeMeUp[] = []
  private disconnectToast: Toast
  private reconnectToast: Toast


    constructor(
      private network : Network,
      public toastCtrl: ToastController,
      private translate: TranslateService) {

      console.log("Current network:", this.network.type)
      this.connected = !this.network.type || this.network.type != 'none'
      console.log("Initial Network status:" + this.connected)
      if(!this.connected) {
        this.createDisconnectionToast()
        this.disconnectToast.present()
      }

      // watch network for a disconnect
      this.network.onDisconnect().subscribe(() => {
        this.connected = false
        console.log('network was disconnected :-(');
        this.createDisconnectionToast()
        this.disconnectToast.present()
      });


      // watch network for a connection
      this.network.onConnect().subscribe(() => {
        console.log('network connected!'); 
        if(this.disconnectToast) this.disconnectToast.dismiss()
        this.createReconnectionToast()
        this.reconnectToast.present()
        // We just got a connection but we need to wait briefly
         // before we determine the connection type.  Might need to wait 
        // prior to doing any api requests as well.
        setTimeout(() => {
          this.connected = true
          this.listeners.forEach(l => l.wakeMeUp())
        }, 3000);
      });
    }

    public createReconnectionToast() {

      this.translate.get("error.reconnect").subscribe(networkMessage => {
        this.reconnectToast = this.toastCtrl.create({
          message: networkMessage,
          duration: 2000,
          position: 'bottom'
        });

        this.reconnectToast.onDidDismiss(() => {
          console.log('Dismissed toast');
        });

      })
    }

    public createDisconnectionToast() {

      this.translate.get("error.network").subscribe(networkMessage => {
          this.translate.get("button.close").subscribe(closeBtn => {
            this.disconnectToast = this.toastCtrl.create({
              message: networkMessage,
              showCloseButton: true,
              closeButtonText: closeBtn,
              position: 'bottom'
            });

            this.disconnectToast.onDidDismiss(() => {
              console.log('Dismissed toast');
            });

          })
      })
    }

    public registerWakeUpCall(listener: IWakeMeUp){
      this.listeners.push(listener)
    }


}
