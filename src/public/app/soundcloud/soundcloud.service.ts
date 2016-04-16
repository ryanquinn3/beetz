import { Injectable } from 'angular2/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Http } from 'angular2/http';

import SC, {IScPlayer} from './soundcloud';


enum SoundcloudConnectMode {
    Ready,
    Loaded
}


@Injectable()
export default class SoundcloudConnect {
    public mode: SoundcloudConnectMode = SoundcloudConnectMode.Ready;
    public playerRef:IScPlayer = null;

    public nowPlaying: Observable<any>;
    private nowPlayingObserver: Observer<any>;

    constructor(private sc: SC ) {
        this.nowPlaying = Observable.create( observer => {
            this.nowPlayingObserver = observer;
        }).share();
    }

    load(song:any): Promise {
        return this.sc.stream(`/tracks/${song.id}`).then(player => {
            this.playerRef = player;
            this.mode = SoundcloudConnectMode.Loaded;
            this.nowPlayingObserver.next(song);
            return player;
        });
    }
    
    clear(){
        this.playerRef = null;
        this.mode = SoundcloudConnectMode.Ready;
    }

    pause(){
        if(this.mode == SoundcloudConnectMode.Loaded){
            this.playerRef.pause();
        }
    }


}
/*
soundCloud.$inject = ['$http', 'SCApi', '$rootScope'];
function soundCloud($http, SCApi, $rootScope){

    const sc = {
        getLikes,
        stream
    };

    sc.player = null;
    sc.currentSelection = null;


    return sc;

    function getLikes(){
        return $http.get('/api/').then( response => {
            let songs = response.data;
            songs.map( song => {
                song.title = song.title.substring(0, 50);
                return song;
            });
            return songs;
        });
    }

    function stream(song){
        sc.currentSelection = song;
        SCApi.stream(`/tracks/${song.id}`).then( playerRef => {
            sc.player = playerRef;
            $rootScope.$apply();
        });
    }


}

export default soundCloud;
*/