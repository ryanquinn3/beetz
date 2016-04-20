"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('angular2/core');
var http_1 = require('angular2/http');
var PrivateRoom_1 = require('./PrivateRoom');
var RoomService = (function () {
    function RoomService(http) {
        this.http = http;
        this.currentRoom = null;
        // want to ping server for rooms, just testing with private room now
        this.allAvailableRooms = [new PrivateRoom_1.PrivateRoom()];
        this.currentRoom = this.allAvailableRooms[0];
    }
    RoomService.prototype.allRooms = function () {
        // rpc
        return this.allAvailableRooms;
    };
    RoomService.prototype.getCurrentRoom = function () {
        return this.currentRoom;
    };
    RoomService.prototype.queueUpSong = function (song) {
        /*
            Probably want to pull from user service to get current user
            then add user_id with song to add to queue
        */
        var queuedSong = {
            song: song,
            dj: {},
        };
        this.currentRoom.getQueue().addSong(queuedSong);
    };
    RoomService.prototype.setRoom = function (newRoom) {
        // Want to figure out a check to make sure its a valid room
        this.currentRoom = newRoom;
    };
    RoomService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], RoomService);
    return RoomService;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = RoomService;
//# sourceMappingURL=room.service.js.map