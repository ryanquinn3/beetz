import { Queue } from './Queue';
import { User } from './User';


export interface Room {
    getQueue(): Queue;
    getName(): string;
    getRoommates(): User[];
}
