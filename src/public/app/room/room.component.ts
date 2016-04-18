import {Component, OnChanges, SimpleChange} from 'angular2/core';
import queue from './queue.component';
import player from '../player/player.component';
import roomService from './room.service';
import { Queue, QueuedUpSong } from '../core/types';


let template: string = `
    <player [queuedSong]="song"
            (songFinished)="songFinished()"></player>
    <queue-component [queue]="queue"></queue-component>
`;

@Component({
    template,
    selector: 'room',
    directives: [queue, player],
})
class RoomComponent {
    private queue: Queue;
    private song: QueuedUpSong;
    constructor(private rs: roomService) {
        this.queue = rs.getCurrentRoom().getQueue();
        this.song = this.queue.nextSong();
     /*   this.queue.getUpdateObservable().subscribe( (songs: QueuedUpSong[]) => {
            
        });*/
    }

    public songFinished(): void {
        // get next song from queue, load into this.song
    }
}
export default RoomComponent;
