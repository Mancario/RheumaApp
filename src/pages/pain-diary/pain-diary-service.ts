import {Injectable} from '@angular/core';
import {Http, Response, URLSearchParams, Headers} from '@angular/http';
import {Observable}     from 'rxjs/Observable';
import {API_URL} from '../../environments/environment';
import { AuthService } from "../../security/auth.service";

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

@Injectable()
export class DiaryService {
    public constructor(private _http: Http,
                       private _authService: AuthService) {
    }

    public listEntries(query: DiaryQuery): Observable<DiaryEntryList> {
        const headers: Headers = new Headers();
        headers.append('Authorization', 'Bearer ' + this._authService.loggedInUser().authToken);

        var params = new URLSearchParams();
        params.set('offset', '' + (query.offset || 0));
        params.set('count', '' + query.count);

        return this._http
            .get(DIARY_API_URL, {
                headers,
                search: params,
            })
            .map(res => res.json())
            .catch(this.handleError);
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
