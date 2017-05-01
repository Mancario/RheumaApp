import {Injectable} from '@angular/core';
import {Http, Response, URLSearchParams, Headers} from '@angular/http';
import {Observable}     from 'rxjs/Observable';
import {API_URL} from '../../environments/environment';
import { AuthService } from "../../security/auth.service";
import { Storage } from '@ionic/storage';

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

@Injectable()
export class DiaryService {
    private diaryEntryToEdit : DiaryEntry;
    private offline = true;


    public constructor(private _http: Http,
                       private _authService: AuthService,
                       private _storage: Storage) {
    }

    public hasDiaryEntryToEdit(): any{
      return this.diaryEntryToEdit;
    }

    public setDiaryEntryToEdit(entry){
      this.diaryEntryToEdit = entry;
    }

    public retrieveAllEntries(): Observable<DiaryEntryList> {
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
          totalCount = list.length;
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

    public forceUpdate(): Observable<boolean>{
      let result = true;

      console.log("Force Update")

      return this.retrieveAllEntries().map(list => true)
    }

    public viewEntry(date: string): Observable<DiaryEntry> {
        const headers: Headers = new Headers();
        headers.append('Authorization', 'Bearer ' + this._authService.loggedInUser().authToken);

        return this._http
            .get(DIARY_API_URL + '/' + encodeURI(date), {
                headers,
            })
            .map(res => res ? res.json() : null)
            .catch(this.handleError);
    }

    public saveEntry(entry: DiaryEntry): Observable<boolean> {
        const body: string = JSON.stringify(entry);
        const headers: Headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Bearer ' + this._authService.loggedInUser().authToken);
        const url = DIARY_API_URL + '/' + encodeURI(entry.date);
        return this._http
            .put(url, body, {
                headers,
            })
            .map(res => true)
            .catch(this.handleError);
    }

    public deleteEntry(entry: DiaryEntry): Observable<boolean> {
        console.log("Called deleteEntry with date: " + entry.date);

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

    private handleError(error: Response) {
        // in a real world app, we may send the error to some remote logging infrastructure
        // instead of just logging it to the console
        if (error.status === 404) return Observable.throw('Eintrag nicht gefunden.');
        if (error.status === 403)
            return Observable.throw('Sie sind derzeit nicht angemeldet oder Sie haben keine Berechtigung, diese Seite aufzurufen.');
        if (error.status === 401) return Observable.throw('Permission denied.');
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
