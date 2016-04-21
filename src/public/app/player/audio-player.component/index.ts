import { Component, ElementRef, OnInit } from 'angular2/core';

import { Song } from '../../core/types';
const template: string = `
    <audio id="audio-player" 
        controls
        style="display: none;"
        [src]="source">
    </audio>
`;

interface AudioElement extends Element {
    currentTime: number;
    play(): void;
    pause(): void;
}

@Component({
    template,
    selector: 'audio-player',
})
class AudioPlayer implements OnInit {

    public audioElement: AudioElement;
    private source: string = '';

    constructor(private el: ElementRef) {}

    public ngOnInit(): void {
        this.audioElement = this.el.nativeElement.getElementsByTagName('audio')[0];
    }


    public play(): void {
        setTimeout(() => { this.audioElement.play(); }, 100);
    }

    public setSong(song: Song): void {
        this.source = `${song.stream_url}?client_id=a3c9ce6d3b22526ecd90399cb052be8e`;
    }

    public pause(): void {
        this.audioElement.pause();
    }

    public on(event: string, cb: () => void): void {
        this.audioElement.addEventListener(event, cb);
    }



}
export default AudioPlayer;
