import { Injectable } from 'angular2/core';
import { Http } from 'angular2/http';
import { PrivateRoom } from './PrivateRoom';
import {
    Room,
    Song,
    QueuedUpSong
} from '../core/types';


@Injectable()
export default class RoomService {

    private currentRoom: Room = null;
    private allRooms: Room[] = [];

    constructor(private http: Http){
        //want to ping server for rooms, just testing with private room now
        this.allRooms.push(new PrivateRoom());
        this.currentRoom = this.allRooms[0];
    }


    public allRooms(): Room[]{
        //rpc
        return this.allRooms;
    }

    public getCurrentRoom(): Room {
        return this.currentRoom;
    }

    public queueUpSong(song: Song){
        /*
            Probably want to pull from user service to get current user
            then add user_id with song to add to queue
        */
        let queuedSong: QueuedUpSong = {
            song,
            dj: {}
        };
        this.currentRoom.getQueue().addSong(queuedSong);
    }
    
    public setRoom(newRoom: Room): void {
        //Want to figure out a check to make sure its a valid room
        this.currentRoom = newRoom;
    }
}
