import {
    Component,
    Input,
    OnChanges,
    SimpleChange,
    Output,
    EventEmitter,
} from 'angular2/core';
import { Queue, QueuedUpSong } from '../core/types';


let template: string = `

<div class="queue--container">
    <ul class="collection">
        <li class="collection-item avatar" *ngFor="#queuedSong of queuedSongs; #i = index">
          <img [src]="queuedSong.song.artwork_url" alt="" class="circle">
          <span class="title">{{queuedSong.song.title}}  </span>
          <a class="secondary-content"
             (click)="remove(i)">
             <i class="material-icons">not_interested</i>
          </a>
        </li>
    </ul>
</div>

`;

@Component({
    template,
    selector: 'queue-component',
})
class QueueComponent implements OnChanges {

    @Input() public queue: Queue;
    @Output() public nextUp: EventEmitter<QueuedUpSong> = new EventEmitter<QueuedUpSong>();

    private queuedSongs: QueuedUpSong[];
    constructor() {}

    public ngOnChanges(changes: {[propName: string]: SimpleChange}): void {
        if (this.queue) {
            this.queuedSongs = this.queue.getAllSongs();
            this.queue.getUpdateObservable().subscribe( (newSongs: QueuedUpSong[]) => {
                this.queuedSongs = this.queue.getAllSongs();
                if (newSongs.length) {
                    this.nextUp.emit(newSongs[0]);
                } else {
                    this.nextUp.emit(null);
                }
            });
        }
    }

    public remove(index: number): void {
        console.log('boy');
        this.queue.removeSongAtIndex(index);
    }
}
export default QueueComponent;

