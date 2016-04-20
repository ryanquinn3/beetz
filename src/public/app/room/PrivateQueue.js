"use strict";
var Observable_1 = require('rxjs/Observable');
var PrivateQueue = (function () {
    function PrivateQueue() {
        var _this = this;
        this.songs = [];
        this.songsObservable = Observable_1.Observable.create(function (observer) {
            _this.songsObserver = observer;
        });
    }
    PrivateQueue.prototype.addSong = function (song) {
        this.songs.push(song);
        this.songsObserver.next(this.songs);
    };
    PrivateQueue.prototype.nextSong = function () {
        if (!this.songs.length) {
            return null;
        }
        var nextSong = this.songs.shift();
        this.songsObserver.next(this.songs);
        return nextSong;
    };
    PrivateQueue.prototype.removeSongAtIndex = function (index) {
        this.songs = this.songs.filter(function (song, i) {
            return i !== index;
        });
        this.songsObserver.next(this.songs);
    };
    PrivateQueue.prototype.getAllSongs = function () {
        return this.songs;
    };
    PrivateQueue.prototype.getUpdateObservable = function () {
        return this.songsObservable;
    };
    return PrivateQueue;
}());
exports.PrivateQueue = PrivateQueue;
//# sourceMappingURL=PrivateQueue.js.map