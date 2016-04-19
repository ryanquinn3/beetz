import { Component, ChangeDetectorRef } from 'angular2/core';
import roomService from '../room/room.service';
import library from './library.service';
import { commaizePipe, orderByPipe } from '../pipes';
import { Song } from '../core/types';


let template: string = ` 
 <div class="lib-table" style="height:100%; overflow-y: scroll;">
    <table class=" highlight">
        <thead>
          <tr>
              <th data-field="id" (click)="orderBy('title')">Track</th>
              <th data-field="id" (click)="orderBy('genre')">Genre</th>
              <th data-field="name" (click)="orderBy('playback_count')">Plays</th>
              <th data-field="price" (click)="orderBy('favoritings_count')">Likes</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="#like of songs | orderBy: orderField" (click)="queue(like)">
            <td>{{ like.title }}</td>
            <td>{{ like.genre }}</td>
            <td>{{ like.playback_count | commaize }}</td>
            <td>{{ like.favoritings_count | commaize }}</td>
          </tr>
        </tbody>
      </table>
</div>
`;

@Component({
    template,
    selector: 'library',
    pipes: [commaizePipe, orderByPipe],
    styles: [`
        .lib-table {
            background: linear-gradient(to left, rgba(85, 189, 151, .8), rgba(0,0,0,.5));
        }
        
        th, td {
            color: white;
            padding: 10px 5px !important;
        }
        
    
    `, ],
})
class LibraryComponent {
    public songs: Song[];
    private orderField: string;
    constructor(private lib: library, private cd: ChangeDetectorRef, private rs: roomService) {
        this.lib.getLibrary().subscribe((songs: Song[]) => {
            this.songs = songs;
            this.cd.detectChanges();
        });
        this.orderField = 'title';
    }

    public queue(song: Song): void {
        this.rs.queueUpSong(song);
    }

    public orderBy(value: string): void {
        if (value === this.orderField) {
            if (value.charAt(0) === '!') {
                this.orderField = value.substring(1);
            } else {
                this.orderField = `!${value}`;
            }
        } else {
            this.orderField = value;
        }
    }
}
export default LibraryComponent;
