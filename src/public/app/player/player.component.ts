import { Component, Input, OnChanges } from 'angular2/core';
import {IScPlayer} from '../soundcloud/soundcloud'
import SoundcloudConnect from "../soundcloud/soundcloud.service";

import './player.scss';
const template = require('./player.html');

@Component({
    template,
    selector: 'player'
})
export default class player implements OnChanges {

    @Input() pausible: boolean;
    @Input() song: Object;

    private player: IScPlayer;
    constructor (private sc: SoundcloudConnect){

    }

    ngOnChanges(changes){
        console.log(changes);
        this.sc.load(this.song).then(player => {
            this.player = player;
            this.player.play();
        });
    }

    play(){
        this.player.play();
    }

    stop(){
        this.player.pause();
    }
}