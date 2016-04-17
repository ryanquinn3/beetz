import { Component, Input, OnChanges } from "angular2/core";
import {ScPlayer} from "../soundcloud/soundcloud";
import SoundcloudConnect from "../soundcloud/soundcloud.service";
import {Song} from "../soundcloud/Song";

const template = require("./player.html");
import "./player.scss";

@Component({
    template,
    selector: "player"
})
export default class Player implements OnChanges {

    @Input() pausible: boolean;
    @Input() song: Song;

    private player: ScPlayer;
    constructor (private sc: SoundcloudConnect) {

    }

    ngOnChanges(changes) {
        console.log(changes);
        this.sc.load(this.song).then(player => {
            this.player = player;
            this.player.play();
        });
    }

    play() {
        this.player.play();
    }

    stop() {
        this.player.pause();
    }
}