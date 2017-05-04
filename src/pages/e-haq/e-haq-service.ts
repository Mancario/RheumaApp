import { Inject, Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { API_URL } from '../../environments/environment';
import { AuthService } from "../../security/auth.service";
import { HaqSheetForm } from './haq-sheet'
import { Storage } from '@ionic/storage';


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
export class HAQService {
    private diaryEntry : HAQEntry;
    public constructor(
      private _http: Http,
      private authService: AuthService,
      private haqSheetForm: HaqSheetForm,
      private _storage: Storage) { }

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
              console.log("Hello following entries: ", entries)

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


    public viewEntry(date: string): Observable<HAQEntry> {
        return this._http.get(HAQ_API_URL + "/" + encodeURI(date), {
            withCredentials: true,
        }).map(res => res ? res.json() : null)
            .catch(this.handleError);
    }

    public saveEntry(entry: HAQEntry): Observable<boolean> {
        const body: string = JSON.stringify(entry);
        const headers: Headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Bearer ' + this.authService.loggedInUser().authToken);
        const url = HAQ_API_URL + "/" + encodeURI(entry.date);
        return this._http
            .put(url, body, {
                headers,
                withCredentials: true,
            })
            .map(res => true)
            .catch(this.handleError);
    }

    public deleteEntry(entry: HAQEntry): Observable<boolean> {
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
