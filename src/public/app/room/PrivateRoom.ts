import { Room, Queue, User } from '../core/types';
import { PrivateQueue } from './PrivateQueue';

class PrivateRoom implements Room {

    public queue: PrivateQueue = new PrivateQueue();
    private name: string = 'Private';
    constructor() {
    }

    public getQueue(): Queue {
        return this.queue;
    }

    public getName(): string {
        return this.name;
    }

    public getRoommates(): User[] {
        return []; // or just you?
    }

}

export { PrivateRoom }
