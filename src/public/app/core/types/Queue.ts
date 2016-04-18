import { User } from './User';
import { Song } from './Song';

export interface QueuedUpSong {
    song: Song;
    dj: User;
}

export interface Queue {
    addSong(song: QueuedUpSong): void;
    removeSongAtIndex(index: number): void;
    nextSong(): QueuedUpSong;
    getAllSongs(): QueuedUpSong[];
}
