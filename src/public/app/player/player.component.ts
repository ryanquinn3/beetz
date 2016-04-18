import { Component, Input, OnChanges, SimpleChange } from 'angular2/core';
import { ScPlayer } from '../soundcloud/soundcloud';
import SoundcloudConnect from '../soundcloud/soundcloud.service';
import { QueuedUpSong } from '../core/types';

const template: string = `
<div class="row">
    <div class="col s6">
        {{queuedSong ? queuedSong.song.title : "None selected"}}
    </div>
    <div class="col s6">
         <i (click)="stop()"
            class="small material-icons pointer">stop</i>

        <i (click)="play()"
            class="small material-icons pointer">play_arrow</i>

    </div>
</div>
`;

@Component({
    template,
    selector: 'player',
})
class Player implements OnChanges {

    @Input() private queuedSong: QueuedUpSong;

    private player: ScPlayer;
    constructor (private sc: SoundcloudConnect) {

    }

    public ngOnChanges(changes: {[propName: string]: SimpleChange}): void {
        if(!this.queuedSong) {
            return;
        }
        this.sc.load(this.queuedSong.song).then((player: ScPlayer) => {
            this.player = player;
            this.player.play();
        });
    }

    public play(): void {
        this.player.play();
    }

    public stop(): void {
        this.player.pause();
    }
}
export default Player;
