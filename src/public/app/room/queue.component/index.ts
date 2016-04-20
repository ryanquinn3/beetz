import {
    Component,
    Input,
    OnChanges,
    SimpleChange,
    Output,
    EventEmitter,
} from 'angular2/core';
import { Queue, QueuedUpSong } from '../../core/types';

let template: string = require('./queue.html');
let styles: string = require('./queue.scss');

@Component({
    template,
    selector: 'queue-component',
    styles: [ styles ],
})
class QueueComponent implements OnChanges {

    @Input() public queue: Queue;
    @Output() public nextUp: EventEmitter<QueuedUpSong> = new EventEmitter<QueuedUpSong>();

    private queuedSongs: QueuedUpSong[];
    constructor() {
        $(document).ready((): void => {
            $('.collapsible').collapsible({
              accordion : false,
            });
          });
    }

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

