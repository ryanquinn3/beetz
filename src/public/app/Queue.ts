import { User } from './User';
import { Song } from './Song'

export interface QueuedUpSong {
    song: Song;
    dj: User;
}

export interface Queue {
    songs: QueuedUpSong[]
}