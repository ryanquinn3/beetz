"use strict";
var library_service_1 = require('../library/library.service');
var room_service_1 = require('../room/room.service');
var soundcloud_service_1 = require('../soundcloud/soundcloud.service');
var soundcloud_1 = require('../soundcloud/soundcloud');
var globalServices = [
    library_service_1.default,
    room_service_1.default,
    soundcloud_service_1.default,
    soundcloud_1.default,
];
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = globalServices;
//# sourceMappingURL=global-providers.js.map