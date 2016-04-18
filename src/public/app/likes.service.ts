import { Injectable } from 'angular2/core';
import { Http } from 'angular2/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export default class SoundcloudFetcher {
    constructor(public http: Http) {}

    public getLikes(): Observable<any> {
        return this.http.get('/api/');
    }
}
