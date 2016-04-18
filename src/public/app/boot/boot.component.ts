import { Component, ChangeDetectorRef } from 'angular2/core';
import likes from '../likes.service';
import scConnect from '../soundcloud/soundcloud.service';
import {Song} from '../soundcloud/Song';
import { Player } from '../player/Player';

 let template: string = `
    <ul class="collection">
        <li class="collection-item"  style="height: 45px;" *ngFor="#like of likedSongs; #i = index">
            <div class="row">
                <div class="col s6" (click)="play(like)">{{i + 1}}. {{like.title}}</div>
                <div class="col s2">Plays: {{like.playback_count | commaize }}</div>
                <div class="col s2">Favs: {{like.favoritings_count | commaize }}</div>
                <div class="col s2">
                            
                </div>
            </div>
        </li>
    </ul>
`;

@Component({
    template,
    selector: 'boot',
})
export default class Boot {
    public boy: string  = 'Frank';
    public likedSongs: any[] = [];
    constructor(private api: likes, private cd: ChangeDetectorRef, private sc: scConnect) {
        api.getLikes()
            .subscribe((res: any) => {
                this.likedSongs = res.json();
                cd.detectChanges();
            });
    }


    public play(song: Song): void {
        console.log(song.title);
        this.sc.clear();
        this.sc.load(song).then((player: Player) => {
            console.log('playing');
            player.play();
        });
    }
}


