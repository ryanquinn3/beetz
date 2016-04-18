import { Component } from 'angular2/core';
import queue from './queue.component';
import player from '../player/player.component';

let template: string = `
    <player [song]="song"></player>
    <queue-component [queue]="queue"></queue-component>
`;

@Component({
    template,
    selector: 'room',
    directives: [queue, player],
})
export default class RoomComponent {
    private queue: any[];
    private song: Object;
    constructor() {
        this.queue = [{title: 'whatever'}];

        this.song = this.queue[0];
    }
}
