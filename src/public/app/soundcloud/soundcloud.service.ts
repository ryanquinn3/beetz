import { Injectable } from 'angular2/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Song, ScPlayer } from '../core/types';
import SC from './soundcloud';

enum SoundcloudConnectMode {
    Ready,
    Loaded
}


@Injectable()
class SoundcloudConnect {
    public mode: SoundcloudConnectMode = SoundcloudConnectMode.Ready;
    public playerRef: ScPlayer = null;

    public nowPlaying: Observable<any>;
    private nowPlayingObserver: Observer<Song>;

    constructor(private sc: SC) {
        this.nowPlaying = Observable.create((observer: Observer<Song>) => {
            this.nowPlayingObserver = observer;
        }).share();
    }

    public load(song: Song): Promise<ScPlayer> {
        return this.sc.stream(`/tracks/${song.id}`).then((player: ScPlayer) => {
            this.playerRef = player;
            this.mode = SoundcloudConnectMode.Loaded;
           // this.nowPlayingObserver.next(song);
            return player;
        });
    }

    public clear(): void {
        this.playerRef = null;
        this.mode = SoundcloudConnectMode.Ready;
    }

    public pause(): void {
        if (this.mode === SoundcloudConnectMode.Loaded) {
            this.playerRef.pause();
        }
    }
}
export default SoundcloudConnect;
