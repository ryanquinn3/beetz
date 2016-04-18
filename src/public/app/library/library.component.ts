import { Component, ChangeDetectorRef } from 'angular2/core';
import roomService from '../room/room.service';
import library from './library.service'
import commaizePipe from '../pipes/commaize'
import library from './library.service';
import commaizePipe from '../pipes/commaize';
import { Song } from '../soundcloud/Song';


let template: string = ` 
 <div style="height:100%; overflow-y: scroll;">
    <ul class="collection">
        <li class="collection-item"  style="height: 45px;" *ngFor="#like of songs; #i = index">
            <div class="row">
                <div class="col s6" (click)="queue(like)">{{i + 1}}. {{like.title}}</div>
                <div class="col s2">Plays: {{like.playback_count | commaize }}</div>
                <div class="col s2">Favs: {{like.favoritings_count | commaize }}</div>
                <div class="col s2"></div>
            </div>
        </li>
    </ul>
</div>
`;

@Component({
    template,
    selector: 'library',
    pipes: [commaizePipe],
})
export default class LibraryComponent {
    public songs: Song[];
    constructor(private lib: library, private cd: ChangeDetectorRef, private rs: roomService){
        this.lib.getLibrary().subscribe((songs: Song[]) => {
            this.songs = songs;
            this.cd.detectChanges();
        });
    }

    public queue(song: Song): void {
        this.rs.queueUpSong(song);
    }
}
