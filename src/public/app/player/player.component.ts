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
import { ScPlayer, QueuedUpSong } from '../core/types';

const template: string = `
<div class="player-container">
    <div class="row">
        <div class="col s11">
            {{ queuedSong ? queuedSong.song.title : "No song selected" }}
        </div>
        <div class="col s1">
            {{ seekTime || '--' }}
        </div>
    </div>
    <div class="row">
        <div class="col s12">
            <a (click)="play()" class="btn-floating  waves-effect waves-light teal accent-2">
                <i class="material-icons">play_arrow</i>
            </a>
             <a (click)="stop()" class="btn-floating  waves-effect waves-light teal accent-2">
                <i class="material-icons">stop</i>
             </a>
              <a (click)="next()" class="btn-floating  waves-effect waves-light teal accent-2">
                <i class="material-icons">skip_next</i>
               </a>
        </div>
        
    </div>
</div>
`;

@Component({
    template,
    selector: 'player',
    styles: [`
        .player-container {
            margin: 10px;
        }
    `, ] ,
})
class Player implements OnChanges {

    @Input() public queuedSong: QueuedUpSong;
    @Output() public songFinished: EventEmitter<String> = new EventEmitter<String>();
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
        this.player.pause();
        this.songFinished.emit('event');
    }

    private millisToTimeString(millis: number): string {
        let minutes: number = Math.floor(millis / 60000);
        let seconds: number = Number(((millis % 60000) / 1000).toFixed(0));
        return `${minutes}:${(seconds < 10 ? '0' : '')}${seconds}`;
    }

    private attachPlayerHandlers(player: ScPlayer): void {
        player.on('finish', () => {
            console.log('song finished');
            this.songFinished.emit('event');
        });
        player.on('time', () => {
            this.seekTime = this.millisToTimeString(player.currentTime());
            this.cd.detectChanges();
        });

        player.on('audio_error', () => {
           console.error('Audio error occurred');
        });

        player.on('no_connection', () => {
           console.error('No connection error');
        });

        player.on('no_streams', () => {
           console.error('No streams error');
        });

        player.on('no_protocol', () => {
           console.error('No protocol error');
        });

    }

}
export default Player;
