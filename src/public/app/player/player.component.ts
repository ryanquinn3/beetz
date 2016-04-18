import { Component, Input, OnChanges, SimpleChange } from 'angular2/core';
import {ScPlayer} from '../soundcloud/soundcloud';
import SoundcloudConnect from '../soundcloud/soundcloud.service';
import {Song} from '../soundcloud/Song';

const template: string = `
<div class="row">
    <div class="col s6">
        {{song.title  || "None selected"}}
    </div>
    <div class="col s6">
         <i
            (click)="stop()"
            class="small material-icons pointer">stop</i>

        <i
        (click)="play()"
        class="small material-icons pointer">play_arrow</i>

    </div>
</div>
`;

@Component({
    template,
    selector: 'player',
})
export class Player implements OnChanges {

    @Input() private song: Song;

    private player: ScPlayer;
    constructor (private sc: SoundcloudConnect) {

    }

    public ngOnChanges(changes: {[propName: string]: SimpleChange}): void {
        console.log(changes);
        this.sc.load(this.song).then((player: ScPlayer) => {
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
