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
var http_1 = require('angular2/http');
var core_1 = require('angular2/core');
require('rxjs/add/operator/map');
var LibraryService = (function () {
    function LibraryService(http) {
        this.http = http;
    }
    LibraryService.prototype.getLibrary = function () {
        // noinspection TypeScriptUnresolvedFunction
        return this.http.get('/api/').map(function (songs) { return songs.json(); });
    };
    LibraryService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], LibraryService);
    return LibraryService;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = LibraryService;
//# sourceMappingURL=library.service.js.map