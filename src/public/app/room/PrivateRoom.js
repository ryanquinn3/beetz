"use strict";
var PrivateQueue_1 = require('./PrivateQueue');
var PrivateRoom = (function () {
    function PrivateRoom() {
        this.queue = new PrivateQueue_1.PrivateQueue();
        this.name = 'Private';
    }
    PrivateRoom.prototype.getQueue = function () {
        return this.queue;
    };
    PrivateRoom.prototype.getName = function () {
        return this.name;
    };
    PrivateRoom.prototype.getRoommates = function () {
        return []; // or just you?
    };
    return PrivateRoom;
}());
exports.PrivateRoom = PrivateRoom;
//# sourceMappingURL=PrivateRoom.js.map