import { Inject, Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, Headers } from '@angular/http';
import { AlertController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { API_URL } from '../../environments/environment';
import { AuthService } from "../../security/auth.service";
import { HaqSheetForm } from './haq-sheet'
import { Storage } from '@ionic/storage';
import { Subject} from 'rxjs/Subject';
import { IWakeMeUp, NetworkService } from '../../services/network.service'


export interface HAQSheet {
    pages: HAQPage[];
}

export interface HAQPage {
    categories: HAQCategory[];
}

export interface HAQCategory {
    categoryId: string;
    difficulties: HAQQuestion[];
    help: HAQQuestion[];
    tools: HAQQuestion[];
}

export interface HAQQuestion {
    questionId: string;
}

export interface HAQEntry {
    date: string;
    answers: HAQEntryAnswer[];
    score?: number;
    deleted: boolean;
    lastModified: number;
}

export interface HAQEntryAnswer {
    questionId: string;
    answer?: number;
}

export interface HAQEntryList {
    totalCount: number;
    results: HAQEntry[];
}

export interface HAQQuery {
    offset?: number;
    count: number;
}

const HAQ_API_URL = API_URL + "/haq";
const HAQ_STORAGE_PREFIX = "HAQ:";
const HAQ_STORAGE_LIST = HAQ_STORAGE_PREFIX + "LIST";
const HAQ_STORAGE_PENDING_UPDATES = "HAQ_PENDING"

@Injectable()
export class HAQService implements IWakeMeUp {
    private diaryEntry : HAQEntry;
    private syncInProgress = true;
    public updates$ = new Subject<void>()
    public constructor(
      public alertCtrl: AlertController,
      private _http: Http,
      private authService: AuthService,
      private haqSheetForm: HaqSheetForm,
      private _storage: Storage,
      private _network: NetworkService) {
        this._network.registerWakeUpCall(this)
      }

    public wakeMeUp() : void{
      console.log("HAQ Overview sync woken up from network")
      this.wakeUpSync()
    }

    public sheet(): Observable<HAQSheet> {
        return Observable.of(this.haqSheetForm.sheet)
    }

    public refreshAllEntries(): Observable<HAQEntryList> {
        const headers: Headers = new Headers();
        const params = new URLSearchParams();

        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Bearer ' + this.authService.loggedInUser().authToken);

        params.set('offset', '0');
        params.set('count', '10000');

        return this._http
            .get(HAQ_API_URL, {
                headers,
                withCredentials: true,
                search: params,
            })
            .map(res => res.json())
            .do(entries => {

              this._storage.ready().then(()=>{
                const dates = entries.results.map(r => r.date)
                console.log("Mapped dates", dates);

                this._storage.set(HAQ_STORAGE_LIST, dates)

                entries.results.forEach(entry => this._storage.set(HAQ_STORAGE_PREFIX + entry.date, entry))

              })

            })
            .catch(this.handleError);
    }

    public listEntries(query: HAQQuery): Observable<HAQEntryList>{

      let totalCount = 0

      const promise = this._storage.ready()
        .then(() => this._storage.get(HAQ_STORAGE_LIST))
        .then((list: any) => {
          // list is an array of date strings
          let dateList = <string[]>list || [];
          console.log("Retrieved list:", dateList);
          const count = query.count || 21
          const offset = query.offset || 0
          totalCount = list ? (<string[]>list).length : 0
          dateList = dateList.slice(offset, Math.min(dateList.length, offset + count))

          // obtain a list of promise for each date entry
          const all = dateList.map(date => this._storage.get(HAQ_STORAGE_PREFIX + date))
          return Promise.all(all)

      })

      // promise is a Promise<DiaryEntry[]>

      return Observable.fromPromise(promise)
        .map(l => <HAQEntryList>({
          totalCount, results: l
        }) )
    }



    public getEntry(date: string): Promise<HAQEntry> {
      let promise = this._storage.ready()
        .then(_ => this._storage.get(HAQ_STORAGE_PREFIX + date))
        .then((entry:HAQEntry) => {return entry})

      return promise
    }

    public getEntryFromServer(date: string): Observable<boolean>{
      const headers: Headers = new Headers();
      headers.append('Authorization', 'Bearer ' + this.authService.loggedInUser().authToken);
      return this._http
            .get(HAQ_API_URL + '/' + encodeURI(date), {
                headers,
            })
            .map(res => res ? res.json() : null)
            .do(entry => this._storage.set(HAQ_STORAGE_PREFIX + entry.date, entry)
              .then(_ => this.updates$.next()))
            .catch(this.handleError);
    }


    public addEntry(entry: HAQEntry): Observable<boolean> {
        console.log("AddEntry called")
        let promise = this.saveEntry(entry)
          .toPromise()
          .then(_ => this._storage.ready())
          .then(_ => this._storage.get(HAQ_STORAGE_LIST))
          .then((dates: any) => {
            if(dates.indexOf(entry.date) === -1){
              dates.push(entry.date)
              dates.sort()
              dates.reverse()
              console.log("Adding entry to storage list")
              return this._storage.set(HAQ_STORAGE_LIST, dates)
            }

            return Promise.resolve(true)

          })

        return Observable.fromPromise(promise)
          .map(_ => true)

    }


    public saveEntryToServer(entry: HAQEntry): Observable<boolean> {
        const body: string = JSON.stringify(entry);
        const headers: Headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Bearer ' + this.authService.loggedInUser().authToken);
        const url = HAQ_API_URL + "/" + encodeURI(entry.date);
        const errorHandler = this.handleUpdateError(entry)
        return this._http
            .put(url, body, {
                headers,
                withCredentials: true,
            })
            .map(res => true)
            .catch(errorHandler);
    }

    public saveEntry(entry: HAQEntry): Observable<boolean> {
      console.log("SaveEntry called")
      entry.lastModified = new Date().getTime()

      let promise = this._storage.ready()
        .then(() => {
          let p1 = this._storage.set(HAQ_STORAGE_PREFIX + entry.date, entry)

          let p2 = this._storage.get(HAQ_STORAGE_PENDING_UPDATES)
            .then((list:any) => {
              list = list || []
              list.push(entry.date)
              return this._storage.set(HAQ_STORAGE_PENDING_UPDATES, list)
            })

          return Promise.all([p1, p2])
        })

      return Observable.fromPromise(promise)
        .map(_ => true)
        .do(_ => this.wakeUpSync())
    }

    public wakeUpSync(){
      // If offline - return and display notification
      // If online - load pending updates list
      // for each list entry, send update to server
      // When done, empty pending updates list

      if(!this._network.connected){
        console.log("Return due to unconnected")
        return
      }

      if(this.syncInProgress){
        console.log("Return due to sync in progress")
        return
      }

      this.syncInProgress = true
      console.log("Updating server now")
      this._storage.ready().then(() => {
        console.log("Retrieving new HAQ-updates")
        const updates = this._storage.get(HAQ_STORAGE_PENDING_UPDATES).then((dates:any) => {

          console.log("Mapping new HAQ-updates")
          const all = dates.map(date => this._storage.get(HAQ_STORAGE_PREFIX + date))

          console.log("Looping all elements")
          return Promise.all(all)
            .then((entries: HAQEntry[]) => {
              console.log("Inside loop")
              const saveObservables = entries.map(entry =>{
                console.log("Inside entry:", entry.date, entry.answers)
                if(entry.deleted)
                  return this.deleteEntryOnServer(entry)
                else
                  return this.saveEntryToServer(entry)
              })
              const savePromises = saveObservables.map(obs => obs.toPromise())
              return Promise.all(savePromises)
            })
        })

        updates
          .then(updatedList => {
              console.log("This is the result of the HAQ-updates", updatedList)
              console.log("Attention: setting to empty list, but should remove single entries instead");
              return this._storage.set(HAQ_STORAGE_PENDING_UPDATES, [])
          })
          .then(_ => {
            console.log("Pending HAQ-updates DONE")
            this.syncInProgress = false
          })
          .catch(err => {
              this.syncInProgress = false
              console.log("#### Error in HAQ-wakeUpSync: Updates threw error", err)
          })

      })

    }

    public deleteEntry(date: string): Observable<boolean> {
        console.log("Called deleteEntry with date: " + date)

        let promise = this.getEntry(date).then(entry =>{
          entry.deleted = true
          console.log("DeleteEntry found entry:", entry)
          return this.saveEntry(entry)
            .toPromise()
            .then(_ => this._storage.ready())
            .then(_ => this._storage.get(HAQ_STORAGE_LIST))
            .then((dates: any) => {
              const removed = dates.filter(date => date !== entry.date)
              console.log("Now its really deleted")
              return this._storage.set(HAQ_STORAGE_LIST, removed)
            })
        })

        return Observable.fromPromise(promise)
          .map(_ => true)

    }


    public deleteEntryOnServer(entry: HAQEntry): Observable<boolean> {
        const headers: Headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Bearer ' + this.authService.loggedInUser().authToken);
        const url = HAQ_API_URL + "/" + encodeURI(entry.date);
        return this._http
            .delete(url, {
                headers,
                withCredentials: true,
            })
            .map(res => true)
            .catch(this.handleError);
    }

    public handleConflict(entry: HAQEntry): Observable<boolean>{
      let obs = new Subject<boolean>()

      let alert = this.alertCtrl.create({
      title: "Conflict",
      message: `There was a conflict for HAQ entry on date: ${entry.date}`,
      buttons: [
        {
          text: "Discard",
          role: 'cancel',
          handler: () => {
            console.log('Discard clicked');
            this.getEntryFromServer(entry.date).subscribe(res => obs.next(res))
          }
        },
        {
          text: "Override",
          handler: () => {
            console.log('Override clicked');
            entry.lastModified = new Date().getTime()
            this.saveEntryToServer(entry).subscribe(res => obs.next(res))

            }
          }
        ]
      });
      alert.present();
      return obs.do(result => console.log("HandleError Observable received:", result))
    }

    private handleUpdateError(entry: HAQEntry): (error: Response) => Observable<boolean> {
       return (error) => {
          if (error.status === 409) {
            console.log("We have a conflict", error, entry.date)
            return this.handleConflict(entry)
          }

          return this.handleError(error)
       }
    }

    private handleError(error: Response) {
        // in a real world app, we may send the error to some remote logging infrastructure
        // instead of just logging it to the console
        if (error.status === 404) return Observable.throw("Eintrag nicht gefunden.");
        if (error.status === 403)
            return Observable.throw("Sie sind derzeit nicht angemeldet oder Sie haben keine Berechtigung, diese Seite aufzurufen.");
        if (error.status === 401) return Observable.throw("Permission denied.");
        console.error("Server error", error);
        let errorMessage: string = null;
        if (error.json) {
            try {
                const jsonerror = error.json().error;
                if (jsonerror) Observable.throw(jsonerror);
            } catch (e) {
                // ignore,
            }
        }
        errorMessage = 'Serverfehler: ' + (error.statusText ? error.statusText : error);
        return Observable.throw(errorMessage);
    }



}
