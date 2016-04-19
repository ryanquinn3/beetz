import { Http, Response } from 'angular2/http';
import { Injectable } from 'angular2/core';
import { Observable } from 'rxjs/Observable';
import { Song } from '../core/types';
import 'rxjs/add/operator/map';

@Injectable()
class LibraryService {
    constructor(public http: Http) {}

    public getLibrary(): Observable<Song[]> {
    // noinspection TypeScriptUnresolvedFunction
        return this.http.get('/api/').map((songs: Response ) => songs.json());
    }
}
export default LibraryService;
