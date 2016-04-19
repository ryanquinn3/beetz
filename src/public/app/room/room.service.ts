import { Injectable } from 'angular2/core';
import { Http } from 'angular2/http';
import { PrivateRoom } from './PrivateRoom';
import {
    Room,
    Song,
    QueuedUpSong,
} from '../core/types';


@Injectable()
class RoomService {

    private currentRoom: Room = null;
    private allAvailableRooms: Room[];

    constructor(private http: Http) {
        // want to ping server for rooms, just testing with private room now
        this.allAvailableRooms = [new PrivateRoom()];
        this.currentRoom = this.allAvailableRooms[0];
    }


    public allRooms(): Room[] {
        // rpc
        return this.allAvailableRooms;
    }

    public getCurrentRoom(): Room {
        return this.currentRoom;
    }

    public queueUpSong(song: Song): void {
        /*
            Probably want to pull from user service to get current user
            then add user_id with song to add to queue
        */
        let queuedSong: QueuedUpSong = {
            song,
            dj: {},
        };
        this.currentRoom.getQueue().addSong(queuedSong);
    }

    public setRoom(newRoom: Room): void {
        // Want to figure out a check to make sure its a valid room
        this.currentRoom = newRoom;
    }
}
export default RoomService;
