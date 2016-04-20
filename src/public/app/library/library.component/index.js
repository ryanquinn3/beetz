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
var room_service_1 = require('../../room/room.service');
var library_service_1 = require('../library.service');
var pipes_1 = require('../../pipes');
var template = require('./library.html');
var libStyles = require('./library.scss');
console.log(libStyles);
var LibraryComponent = (function () {
    function LibraryComponent(lib, cd, rs) {
        var _this = this;
        this.lib = lib;
        this.cd = cd;
        this.rs = rs;
        this.lib.getLibrary().subscribe(function (songs) {
            _this.songs = songs;
            _this.cd.detectChanges();
        });
        this.orderField = 'title';
    }
    LibraryComponent.prototype.queue = function (song) {
        this.rs.queueUpSong(song);
    };
    LibraryComponent.prototype.orderBy = function (value) {
        if (value === this.orderField) {
            if (value.charAt(0) === '!') {
                this.orderField = value.substring(1);
            }
            else {
                this.orderField = "!" + value;
            }
        }
        else {
            this.orderField = value;
        }
    };
    LibraryComponent = __decorate([
        core_1.Component({
            template: template,
            selector: 'library',
            pipes: [pipes_1.commaizePipe, pipes_1.orderByPipe],
            styles: [libStyles],
        }), 
        __metadata('design:paramtypes', [library_service_1.default, core_1.ChangeDetectorRef, room_service_1.default])
    ], LibraryComponent);
    return LibraryComponent;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = LibraryComponent;
//# sourceMappingURL=index.js.map