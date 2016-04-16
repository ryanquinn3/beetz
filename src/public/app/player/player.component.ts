import { Component } from 'angular2/core';
import soundcloudConnect from '../soundcloud/soundcloud.service'

const template = require('./player.html');
import './player.scss';

@Component({
    template,
    selector: 'player'
})
export default class controller {
    public nowPlaying: any = {};
    public currentSeekTime: number = 0;
    constructor (private sc: soundcloudConnect){
        this.sc.nowPlaying.subscribe(song => this.nowPlaying = song);
    }

    play(){
        this.sc.playerRef.play();
    }

    stop(){
        this.sc.playerRef.pause();
    }
}