import {
    Component,
    Input,
    OnChanges,
    SimpleChange,
    Output,
    EventEmitter,
    ChangeDetectorRef,
} from 'angular2/core';
import SoundcloudConnect from '../soundcloud/soundcloud.service';
import { ScPlayer, QueuedUpSong, ScPlayerEvent } from '../core/types';

const styles: string = require('./player.scss');
const template: string = require('./player.html');

@Component({
    template,
    selector: 'player',
    styles: [
        styles,
    ] ,
})
class Player implements OnChanges {

    @Input() public queuedSong: QueuedUpSong;
    @Output() public songFinished: EventEmitter<string> = new EventEmitter<string>();
    private player: ScPlayer;
    private seekTime: string;
    constructor (private sc: SoundcloudConnect, private cd: ChangeDetectorRef) {}

    public ngOnChanges(changes: {[propName: string]: SimpleChange}): void {
        if (!this.queuedSong) {
            return;
        }
        console.log('fetching player');
        this.sc.load(this.queuedSong.song)
            .then( (player: ScPlayer) => {
                this.attachPlayerHandlers(player);
                this.player = player;
                this.player.play();
            })
            .catch( (err: Error) => {
               console.error(err);
            });
    }

    public play(): void {
        this.player.play();
    }

    public stop(): void {
        this.player.pause();
    }

    public next(): void {
        this.player = null;
        this.songFinished.emit('event');
    }

    private millisToTimeString(millis: number): string {
        let minutes: number = Math.floor(millis / 60000);
        let seconds: number = Number(((millis % 60000) / 1000).toFixed(0));
        return `${minutes}:${(seconds < 10 ? '0' : '')}${seconds}`;
    }

    private attachPlayerHandlers(player: ScPlayer): void {
        player.on(ScPlayerEvent.finished, () => {
            console.log('song finished');
            this.songFinished.emit('event');
        });
        player.on(ScPlayerEvent.time, () => {
            this.seekTime = this.millisToTimeString(player.currentTime());
            this.cd.detectChanges();
        });

        player.on(ScPlayerEvent.audioError, () => {
            console.error('Audio error occurred');
        });

        player.on(ScPlayerEvent.noConnection, () => {
            console.error('No connection error');
        });

        player.on(ScPlayerEvent.noStreams, () => {
            console.error('No streams error');
        });

        player.on(ScPlayerEvent.noProtocol, () => {
            console.error('No protocol error');
        });

        player.on(ScPlayerEvent.geoBlocked, () => {
            console.error('Geo Blocked');
        });

    }

}
export default Player;
