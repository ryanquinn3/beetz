import { Injectable } from 'angular2/core';
import { Http } from 'angular2/http';
import { Room } from '../room';


@Injectable()
export default class RoomService {
    
    private currentRoom: Room = null;
    private allRooms: Room[];

    constructor(private http: Http){
    }


    public allRooms(): Room[]{
        //rpc
        return [];
    }

    public getCurrentRoom(): Room {
        return this.currentRoom;
    }

    public queueUpSong(song){
        /*
            Probably want to pull from user service to get current user
            then add user_id with song to add to queue
        */

        this.currentRoom.queue.songs.push(song)
    }


}