 import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Queue, QueuedUpSong } from '../core/types';


class PrivateQueue implements Queue {

    private songs: QueuedUpSong[] = [];

    private songsObservable: Observable<QueuedUpSong[]>;
    private songsObserver: Observer<QueuedUpSong[]>;

    constructor() {
        this.songsObservable = Observable.create( (observer: Observer<QueuedUpSong[]>) => {
           this.songsObserver = observer;
        });
    }

    public addSong(song: QueuedUpSong): void {
        this.songs.push(song);
        this.songsObserver.next(this.songs);
    }

    public nextSong(): QueuedUpSong {
        if (!this.songs.length) {
            return null;
        }
        let nextSong: QueuedUpSong = this.songs.shift();
        this.songsObserver.next(this.songs);
        return nextSong;
    }

    public removeSongAtIndex(index: number): void {
        this.songs = this.songs.filter( (song: QueuedUpSong, i: number) => {
           return i !== index;
        });
        this.songsObserver.next(this.songs);
    }

    public getAllSongs(): QueuedUpSong[] {
        return this.songs;
    }

    public getUpdateObservable(): Observable<QueuedUpSong[]> {
        return this.songsObservable;
    }

}

export { PrivateQueue }
