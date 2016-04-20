import { Component } from 'angular2/core';
import queue from '../queue.component';
import player from '../../player/player.component';
import roomService from '../room.service';
import { Queue, QueuedUpSong } from '../../core/types';

let template: string = require('./room.html');

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

    }

    public nextSong(song: QueuedUpSong): void {
        if (song && !this.song) {
            this.song = this.queue.nextSong();
        }
    }

    public songFinished(): void {
        console.log('snagged a boy');
        this.song = this.queue.nextSong();
    }
}
export default RoomComponent;
