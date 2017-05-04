import { Injectable} from '@angular/core';
import { ToastController, AlertController } from 'ionic-angular';
import { Http, Response, URLSearchParams, Headers} from '@angular/http';
import { Observable}     from 'rxjs/Observable';
import { API_URL} from '../../environments/environment';
import { AuthService } from "../../security/auth.service";
import { Storage } from '@ionic/storage';
import { IWakeMeUp, NetworkService } from '../../services/network.service'
import { Subject}     from 'rxjs/Subject';



export interface DiaryEntry {
    date: string;
    pain: number;
    diseaseActivity: number;
    fatigue: number;
    prednisoloneDose: number;
    additionalDrugs: string;
    tenderJoints: string;
    comments: string;
    deleted: boolean;
    lastModified: number;
}

export interface DiaryEntryList {
    totalCount: number;
    results: DiaryEntry[];
}

export interface DiaryQuery {
    offset?: number;
    count: number;
}

const DIARY_API_URL = API_URL + '/diary';
const DIARY_STORAGE_PREFIX = "DIARY:";
const DIARY_STORAGE_LIST = DIARY_STORAGE_PREFIX + "LIST";
const DIARY_STORAGE_PENDING_UPDATES = "PENDING"

@Injectable()
export class DiaryService implements IWakeMeUp {
    private diaryEntryToEdit : DiaryEntry;
    private syncInProgress = false;
    public updates$ = new Subject<void>()

    public constructor(
      public toastCtrl: ToastController,
      public alertCtrl: AlertController,
      private _http: Http,
      private _authService: AuthService,
      private _storage: Storage,
      private _network: NetworkService) {
        this._network.registerWakeUpCall(this)
    }

    public wakeMeUp() : void{
      console.log("Pain Diary sync Woken up from network")
      this.wakeUpSync()
    }

    public hasDiaryEntryToEdit(): any{
      return this.diaryEntryToEdit;
    }

    public setDiaryEntryToEdit(entry){
      this.diaryEntryToEdit = entry;
    }

    public refreshAllEntries(): Observable<DiaryEntryList> {
        const headers: Headers = new Headers();
        headers.append('Authorization', 'Bearer ' + this._authService.loggedInUser().authToken);

        var params = new URLSearchParams();
        params.set('offset', '0');
        params.set('count', '10000');

        return this._http
            .get(DIARY_API_URL, {
                headers,
                search: params,
            })
            .map(res => res.json())
            .do(entries => {
              console.log("Hello following entries: ", entries)

              this._storage.ready().then(()=>{
                const dates = entries.results.map(r => r.date)
                console.log("Mapped dates", dates);

                this._storage.set(DIARY_STORAGE_LIST, dates)

                entries.results.forEach(entry => this._storage.set(DIARY_STORAGE_PREFIX + entry.date, entry))

              })

            })
            .catch(this.handleError);
    }

    public listEntries(query: DiaryQuery): Observable<DiaryEntryList>{

      let totalCount = 0

      const promise = this._storage.ready()
        .then(() => this._storage.get(DIARY_STORAGE_LIST))
        .then((list: any) => {
          // list is an array of date strings
          let dateList = <string[]>list || [];
          console.log("Retrieved list:", dateList);
          const count = query.count || 21
          const offset = query.offset || 0
          totalCount = list ? (<string[]>list).length : 0
          dateList = dateList.slice(offset, Math.min(dateList.length, offset + count))

          // obtain a list of promise for each date entry
          const all = dateList.map(date => this._storage.get(DIARY_STORAGE_PREFIX + date))
          return Promise.all(all)

      })

      // promise is a Promise<DiaryEntry[]>

      return Observable.fromPromise(promise)
        .map(l => <DiaryEntryList>({
          totalCount, results: l
        }) )
    }


    public viewEntry(date: string): Observable<boolean> {
      let promise = this._storage.ready()
        .then(_ => this._storage.get(DIARY_STORAGE_LIST))
        .then((dates: any) => {
          if(dates.indexOf(date) === -1){
            console.log("Entry does not exist")
            return Promise.resolve(false)
          }
          console.log("Entry already exists")
          return Promise.resolve(true)

        })

      return Observable.fromPromise(promise)
        //.map(_ => true)
    }

    public getEntry(date: string): Promise<DiaryEntry> {
      let promise = this._storage.ready()
        .then(_ => this._storage.get(DIARY_STORAGE_PREFIX + date))
        .then((entry:DiaryEntry) => {return entry})

      return promise
    }

    public getEntryFromServer(date: string): Observable<boolean>{
      const headers: Headers = new Headers();
      headers.append('Authorization', 'Bearer ' + this._authService.loggedInUser().authToken);
      return this._http
            .get(DIARY_API_URL + '/' + encodeURI(date), {
                headers,
            })
            .map(res => res ? res.json() : null)
            .do(entry => this._storage.set(DIARY_STORAGE_PREFIX + entry.date, entry)
              .then(_ => this.updates$.next()))
            .catch(this.handleError);
    }

    public addEntry(entry: DiaryEntry): Observable<boolean> {
        console.log("AddEntry called")
        let promise = this.saveEntry(entry)
          .toPromise()
          .then(_ => this._storage.ready())
          .then(_ => this._storage.get(DIARY_STORAGE_LIST))
          .then((dates: any) => {
            if(dates.indexOf(entry.date) === -1){
              dates.push(entry.date)
              dates.sort()
              dates.reverse()
              console.log("Adding entry to storage list")
              return this._storage.set(DIARY_STORAGE_LIST, dates)
            }

            return Promise.resolve(true)

          })

        return Observable.fromPromise(promise)
          .map(_ => true)


    }

    public saveEntryToServer(entry: DiaryEntry): Observable<boolean> {
        const body: string = JSON.stringify(entry)
        const headers: Headers = new Headers()
        headers.append('Content-Type', 'application/json')
        headers.append('Authorization', 'Bearer ' + this._authService.loggedInUser().authToken);
        const url = DIARY_API_URL + '/' + encodeURI(entry.date);
        const errorHandler = this.handleUpdateError(entry)
        return this._http
            .put(url, body, {
                headers,
            })
            .map(res => true)
            .catch(errorHandler)
    }

    public saveEntry(entry: DiaryEntry): Observable<boolean> {
      console.log("SaveEntry called")
      entry.lastModified = new Date().getTime()

      let promise = this._storage.ready()
        .then(() => {
          let p1 = this._storage.set(DIARY_STORAGE_PREFIX + entry.date, entry)

          let p2 = this._storage.get(DIARY_STORAGE_PENDING_UPDATES)
            .then((list:any) => {
              list = list || []
              list.push(entry.date)
              return this._storage.set(DIARY_STORAGE_PENDING_UPDATES, list)
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
        const updates = this._storage.get(DIARY_STORAGE_PENDING_UPDATES).then((dates:any) => {

          const all = dates.map(date => this._storage.get(DIARY_STORAGE_PREFIX + date))

          return Promise.all(all)
            .then((entries: DiaryEntry[]) => {
              const saveObservables = entries.map(entry =>{
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
              console.log("This is the result of the updates", updatedList)
              console.log("Attention: setting to empty list, but should remove single entries instead");
              return this._storage.set(DIARY_STORAGE_PENDING_UPDATES, [])
          })
          .then(_ => {
            console.log("Pending updates DONE")
            this.syncInProgress = false
          })
          .catch(err => {
              console.log("#### Error in wakeUpSync: Updates threw error", err)
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
            .then(_ => this._storage.get(DIARY_STORAGE_LIST))
            .then((dates: any) => {
              const removed = dates.filter(date => date !== entry.date)
              console.log("Now its really deleted")
              return this._storage.set(DIARY_STORAGE_LIST, removed)
            })
        })

        return Observable.fromPromise(promise)
          .map(_ => true)

    }

    public deleteEntryOnServer(entry: DiaryEntry): Observable<boolean> {
        const headers: Headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Bearer ' + this._authService.loggedInUser().authToken);

        const url = DIARY_API_URL + '/' + encodeURI(entry.date);
        return this._http
            .delete(url, {
                headers,
            })
            .map(res => true)
            .catch(this.handleError);
    }

    public handleConflict(entry: DiaryEntry): Observable<boolean>{
      let obs = new Subject<boolean>()

      let alert = this.alertCtrl.create({
      title: "Conflict",
      message: `There was a conflict for entry on date: ${entry.date}`,
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
      return obs
    }

    private handleUpdateError(entry: DiaryEntry): (error: Response) => Observable<boolean> {
       return (error) => {
          if (error.status === 409) {
            console.log("We have a conflict", error, entry)
            return this.handleConflict(entry)
          }

          return this.handleError(error)
       }
    }

    private handleError(error: Response) {
        // in a real world app, we may send the error to some remote logging infrastructure
        // instead of just logging it to the console

        if (error.status === 404)
            return Observable.throw('Eintrag nicht gefunden.');
        if (error.status === 403)
            return Observable.throw('Sie sind derzeit nicht angemeldet oder Sie haben keine Berechtigung, diese Seite aufzurufen.');
        if (error.status === 401)
            return Observable.throw('Permission denied.');
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
