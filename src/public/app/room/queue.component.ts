import {
    Component,
    Input,
    OnChanges,
    SimpleChange,
} from 'angular2/core';
import { Queue, QueuedUpSong } from '../core/types';


let template: string = `

<div class="queue--container">
    <ul class="collection">
        <li class="collection-item" *ngFor="#queuedSong of queuedSongs; #i = index">
           <div class="row">
                {{queuedSong.song.title}}  
            </div>
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

    private queuedSongs: QueuedUpSong[];
    constructor() {}

    public ngOnChanges(changes: {[propName: string]: SimpleChange}): void {
        if (this.queue) {
            this.queuedSongs = this.queue.getAllSongs();
        }
    }

}
export default QueueComponent;

