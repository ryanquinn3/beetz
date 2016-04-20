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
var soundcloud_service_1 = require('../soundcloud/soundcloud.service');
var types_1 = require('../core/types');
var styles = require('./player.scss');
var template = require('./player.html');
var Player = (function () {
    function Player(sc, cd) {
        this.sc = sc;
        this.cd = cd;
        this.songFinished = new core_1.EventEmitter();
    }
    Player.prototype.ngOnChanges = function (changes) {
        var _this = this;
        if (!this.queuedSong) {
            return;
        }
        console.log('fetching player');
        this.sc.load(this.queuedSong.song)
            .then(function (player) {
            _this.attachPlayerHandlers(player);
            _this.player = player;
            _this.player.play();
        })
            .catch(function (err) {
            console.error(err);
        });
    };
    Player.prototype.play = function () {
        this.player.play();
    };
    Player.prototype.stop = function () {
        this.player.pause();
    };
    Player.prototype.next = function () {
        this.player = null;
        this.songFinished.emit('event');
    };
    Player.prototype.millisToTimeString = function (millis) {
        var minutes = Math.floor(millis / 60000);
        var seconds = Number(((millis % 60000) / 1000).toFixed(0));
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    };
    Player.prototype.attachPlayerHandlers = function (player) {
        var _this = this;
        player.on(types_1.ScPlayerEvent.finished, function () {
            console.log('song finished');
            _this.songFinished.emit('event');
        });
        player.on(types_1.ScPlayerEvent.time, function () {
            _this.seekTime = _this.millisToTimeString(player.currentTime());
            _this.cd.detectChanges();
        });
        player.on(types_1.ScPlayerEvent.audioError, function () {
            console.error('Audio error occurred');
        });
        player.on(types_1.ScPlayerEvent.noConnection, function () {
            console.error('No connection error');
        });
        player.on(types_1.ScPlayerEvent.noStreams, function () {
            console.error('No streams error');
        });
        player.on(types_1.ScPlayerEvent.noProtocol, function () {
            console.error('No protocol error');
        });
        player.on(types_1.ScPlayerEvent.geoBlocked, function () {
            console.error('Geo Blocked');
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Player.prototype, "queuedSong", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Player.prototype, "songFinished", void 0);
    Player = __decorate([
        core_1.Component({
            template: template,
            selector: 'player',
            styles: [
                styles,
            ],
        }), 
        __metadata('design:paramtypes', [soundcloud_service_1.default, core_1.ChangeDetectorRef])
    ], Player);
    return Player;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Player;
//# sourceMappingURL=player.component.js.map