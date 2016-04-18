import {Queue, QueuedUpSong } from './Queue';
import {User} from './User';


export interface Room {
    queue: Queue;
    getName(): string;
    getRoommates(): User[]
}
