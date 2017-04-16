'use-strict';
import {
    Component,
    Input,
    OnChanges,
    SimpleChange,
    Output,
    EventEmitter,
    ChangeDetectorRef,
    ViewChild,
} from 'angular2/core';
import SoundcloudConnect from '../soundcloud/soundcloud.service';
import { QueuedUpSong } from '../core/types';
import { millisToTimeString } from '../core/utils';

import AudioPlayer from './audio-player.component';

const styles: string = require('./player.scss');
const template: string = require('./player.html');

@Component({
    template,
    selector: 'player',
    directives: [AudioPlayer],
    styles: [
        styles,
    ] ,
})
class Player implements OnChanges {

    @Input() public queuedSong: QueuedUpSong;
    @Output() public songFinished: EventEmitter<string> = new EventEmitter<string>();

    @ViewChild(AudioPlayer) private audioPlayer: AudioPlayer;
    private seekTime: string;
    private duration: string;
    constructor (private sc: SoundcloudConnect, private cd: ChangeDetectorRef) {}

    public ngOnChanges(changes: {[propName: string]: SimpleChange}): void {
        if (!this.queuedSong) {
            return;
        }

        this.audioPlayer.setSong(this.queuedSong.song);
        this.duration = millisToTimeString(this.queuedSong.song.duration);
        this.attachPlayerHandlers();
        this.audioPlayer.play();
    }

    public play(): void {
        this.audioPlayer.play();
    }

    public stop(): void {
        this.audioPlayer.pause();
    }

    public next(): void {
        this.queuedSong = null;
        this.songFinished.emit('event');
    }

    private attachPlayerHandlers(): void {
        this.audioPlayer.on('timeupdate', () => {
            this.seekTime = millisToTimeString(this.audioPlayer.audioElement.currentTime * 1000);
            this.cd.detectChanges();
        });

        this.audioPlayer.on('ended', this.next.bind(this));
    }

}



export default Player;


