import { Component, ChangeDetectorRef } from 'angular2/core';
import roomService from '../../room/room.service';
import library from '../library.service';
import { commaizePipe, orderByPipe } from '../../pipes';
import { Song } from '../../core/types';

let template: string = require('./library.html');
let libStyles: string = require('./library.scss');
console.log(libStyles);
@Component({
    template,
    selector: 'library',
    pipes: [ commaizePipe, orderByPipe ],
    styles: [ libStyles ],
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
