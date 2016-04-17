import { Http } from 'angular2/http';
import { Injectable } from 'angular2/core';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map'
@Injectable()
export default class LibraryService {
      constructor(public http: Http){}

      public getLibrary(): Observable<any>{
        //noinspection TypeScriptUnresolvedFunction
            return this.http.get('/api/').map(songs => songs.json());
      }
}
 