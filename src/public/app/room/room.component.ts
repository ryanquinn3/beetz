import { Component } from 'angular2/core';
import {Observable} from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import queue from './queue.component';
import player from '../player/player.component';

let template = `
    <player [song]="song"></player>
    <queue-component [queue]="queue"></queue-component>
`

@Component({
    template,
    selector: 'room',
    directives: [queue, player]
})
export default class RoomComponent {
    private queue: any[];
    private nowPlaying: Observable<Object>;
    private nowPlayingObserver: Observer;
    private song: Object;
    constructor() {
        this.queue = [{title: 'whatever'}];

        this.song = this.queue[0];

        this.nowPlaying = Observable.create( observer => {
            this.nowPlayingObserver = observer;
        });
    }

    
}