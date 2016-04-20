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
var queue_component_1 = require('../queue.component');
var player_component_1 = require('../../player/player.component');
var room_service_1 = require('../room.service');
var template = require('./room.html');
var RoomComponent = (function () {
    function RoomComponent(rs) {
        this.rs = rs;
        this.queue = rs.getCurrentRoom().getQueue();
        this.song = this.queue.nextSong();
    }
    RoomComponent.prototype.nextSong = function (song) {
        if (song && !this.song) {
            this.song = this.queue.nextSong();
        }
    };
    RoomComponent.prototype.songFinished = function () {
        console.log('snagged a boy');
        this.song = this.queue.nextSong();
    };
    RoomComponent = __decorate([
        core_1.Component({
            template: template,
            selector: 'room',
            directives: [queue_component_1.default, player_component_1.default],
        }), 
        __metadata('design:paramtypes', [room_service_1.default])
    ], RoomComponent);
    return RoomComponent;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = RoomComponent;
//# sourceMappingURL=index.js.map