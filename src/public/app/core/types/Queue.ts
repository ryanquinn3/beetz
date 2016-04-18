import { User } from './User';
import { Song } from './Song';

export interface QueuedUpSong {
    song: Song;
    dj: User;
}

export interface Queue {
    addSong(QueuedUpSong) : void;
    removeSongAtIndex(index: number);
    nextSong() : QueuedUpSong;
    getAllSongs() : QueuedUpSong[];
}
