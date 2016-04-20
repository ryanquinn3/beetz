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
var Observable_1 = require('rxjs/Observable');
var soundcloud_1 = require('./soundcloud');
var SoundcloudConnectMode;
(function (SoundcloudConnectMode) {
    SoundcloudConnectMode[SoundcloudConnectMode["Ready"] = 0] = "Ready";
    SoundcloudConnectMode[SoundcloudConnectMode["Loaded"] = 1] = "Loaded";
})(SoundcloudConnectMode || (SoundcloudConnectMode = {}));
var SoundcloudConnect = (function () {
    function SoundcloudConnect(sc) {
        var _this = this;
        this.sc = sc;
        this.mode = SoundcloudConnectMode.Ready;
        this.playerRef = null;
        this.nowPlaying = Observable_1.Observable.create(function (observer) {
            _this.nowPlayingObserver = observer;
        }).share();
    }
    SoundcloudConnect.prototype.load = function (song) {
        var _this = this;
        return this.sc.stream("/tracks/" + song.id).then(function (player) {
            _this.playerRef = player;
            _this.mode = SoundcloudConnectMode.Loaded;
            // this.nowPlayingObserver.next(song);
            return player;
        });
    };
    SoundcloudConnect.prototype.clear = function () {
        this.playerRef = null;
        this.mode = SoundcloudConnectMode.Ready;
    };
    SoundcloudConnect.prototype.pause = function () {
        if (this.mode === SoundcloudConnectMode.Loaded) {
            this.playerRef.pause();
        }
    };
    SoundcloudConnect = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [soundcloud_1.default])
    ], SoundcloudConnect);
    return SoundcloudConnect;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SoundcloudConnect;
//# sourceMappingURL=soundcloud.service.js.map